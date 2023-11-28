import path from "path";
import fs from "fs";
import request from "request";
import readingTime from "reading-time";
import simpleGit from "simple-git";
import { useAsyncData } from "nuxt/app";

const api = "https://bing.jiandyb9834.xyz/getBingImage";

const formatDate = (date: string | number | Date) => {
  // format the date to be displayed in a readable format
  return new Date(date).toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const git = simpleGit({
  baseDir: process.cwd(),
  binary: "git",
});

const getDates = async (filePath: string) => {
  try {
    const stats = await fs.promises.stat(filePath);
    const log = await git.log({
      file: filePath,
    });
    const fileUpdatedAt = stats.mtime;
    const fileCreatedAt = stats.birthtime;
    const gitUpdatedAt = log.latest?.date;
    const gitCreatedAt = log.all[log.all.length - 1]?.date;

    return {
      fileUpdatedAt,
      fileCreatedAt,
      gitUpdatedAt,
      gitCreatedAt,
    };
  } catch (error) {
    return {
      fileUpdatedAt: null,
      fileCreatedAt: null,
      gitUpdatedAt: null,
      gitCreatedAt: null,
    };
  }
};

let generationInProgress = false;

const waitForGenerationToFinish = async () => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (!generationInProgress) {
        clearInterval(interval);
        resolve(true);
      }
    }, 1000);
  });
};

const getCover = async (options: any) => {
  const { title, description, updatedAt, slug } = options;
  console.log("🥶🥶", options);

  const res = await fetch(api);
  const url = await res.text();

  console.log("🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶", url);
  return {
    url: url,
  };
};

const createCover = async ({
  filePath,
  url,
}: {
  filePath: string;
  url: string;
}) => {
  return new Promise((resolve, reject) => {
    const imageFile = fs.createWriteStream(filePath);

    const coverFile = request(url)
      .pipe(imageFile)
      .on("close", () => {
        console.log("👁️👁️", { coverFile });
        resolve(coverFile);
      })
      .on("error", (error) => {
        console.log("😭😭", { error });
        reject(error);
      });
  });
};

const generateCovers = async (file: {
  updatedAt: any;
  _path: any;
  coverPath: string;
  title: any;
  description: any;
  coverUrl: any;
}) => {
  try {
    console.log("🏁🏁🏁", { env: process.env.NODE_ENV });

    // throw error if in production environment
    if (
      process.env.NODE_ENV === "production" ||
      process.env.NODE_ENV === "prerender"
    ) {
      throw new Error("Cannot generate covers in production environment");
    }

    const slug = file._path;
    const filePath = path.join(
      process.cwd(),
      `public/assets/img${slug}/cover.webp`
    );
    const fileExists = fs.existsSync(filePath);

    if (!fileExists) {
      const dirPath = path.join(process.cwd(), `public/assets/img${slug}`);
      const dir = await fs.promises.mkdir(dirPath, { recursive: true });

      console.log({ dirPath, dir });

      const coverData = {
        slug,
        title: file.title,
        description: file.description,
        updatedAt: file.updatedAt,
      };

      console.log({ file, coverData });

      console.time("generate cover");
      await waitForGenerationToFinish();
      console.timeEnd("generate cover");

      generationInProgress = true;
      const cover = await getCover(coverData);
      generationInProgress = false;

      const coverFile = await createCover({
        filePath,
        url: cover.url,
      });

      console.log("cover file", { coverFile });

      const coverUrl = cover.url;
      const coverPath = `/assets/img${slug}/cover.png`;

      return {
        coverUrl,
        coverPath,
      };
    }

    return {
      coverUrl: null,
      coverPath: `/assets/img${slug}/cover.png`,
    };
  } catch (error) {
    console.log("🐛🐛🐛", { error });
    return {
      coverUrl: null,
      coverPath: null,
    };
  }
};

export default defineNitroPlugin((nitroApp) => {
  const readingTimeStats: {
    key?: string;
    stats?: { text: string; minutes: number; time: number; words: number };
  }[] = [];

  nitroApp.hooks.hook("content:file:beforeParse", async (file) => {
    console.log(file, "📄📄📄");
    if (file._id.endsWith(".md")) {
      const fileID = file._id;

      const stats = readingTime(file.body);
      file.readingTime = stats;

      readingTimeStats.push({
        key: fileID,
        stats,
      });

      console.log("⏱⏱", { readingTimeStats });
    }
  });

  nitroApp.hooks.hook("content:file:afterParse", async (file) => {
    if (file._id.endsWith(".md") && file._file.includes("articles")) {
      const readingTimeStat = readingTimeStats.find(
        (stat) => stat.key === file._id
      );

      file.readingTime = readingTimeStat?.stats;

      const filePath = `./content/${file._file}`;

      const fileDates = await getDates(filePath);

      !file.createdAt &&
        (file.createdAt = fileDates.gitCreatedAt || fileDates.fileCreatedAt);
      !file.updatedAt &&
        (file.updatedAt = fileDates.gitUpdatedAt || fileDates.fileUpdatedAt);

      file.formattedCreatedAt = formatDate(file.createdAt);
      file.formattedUpdatedAt = formatDate(file.updatedAt);

      file.gitCreatedAt = fileDates.gitCreatedAt;
      file.gitUpdatedAt = fileDates.gitUpdatedAt;
      file.formattedGitCreatedAt = formatDate(file.gitCreatedAt);
      file.formattedGitUpdatedAt = formatDate(file.gitUpdatedAt);

      file.fileCreatedAt = fileDates.fileCreatedAt;
      file.fileUpdatedAt = fileDates.fileUpdatedAt;
      file.formattedFileCreatedAt = formatDate(file.fileCreatedAt);
      file.formattedFileUpdatedAt = formatDate(file.fileUpdatedAt);

      console.log("💾💾💾", { file });

      const coverData = await generateCovers(file);

      file.coverUrl = coverData.coverUrl;
      file.coverPath = coverData.coverPath;
    }
  });
});
