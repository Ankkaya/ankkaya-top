---
title: 用 javascript 实现 win10 日历的悬浮效果
description:
tags: [html, javascript, css]
---

## 前言

当我们鼠标在 win10 日历移动时，会有探照灯的显示效果，那么用前端如何实现呢？本文主要是对[国外大神](https://dev.to/jashgopani){:target="\_blank"}实现方式的理解与展示

## 日历基础视图

首先我们创建日历的基础视图

```html
<h1>Windows 10 Calendar hover effect</h1>
<div class="win-grid">
  <p class="week" id="1">Mo</p>
  <p class="week" id="2">Tu</p>
  <p class="week" id="3">We</p>
  <p class="week" id="4">Th</p>
  <p class="week" id="5">Fr</p>
  <p class="week" id="6">Sa</p>
  <p class="week" id="7">Su</p>
  <div class="win-btn win-btn-inactive" id="40">29</div>
  <div class="win-btn win-btn-inactive" id="41">30</div>
  <div class="win-btn win-btn-inactive" id="42">31</div>
  <div class="win-btn" id="1">1</div>
  <div class="win-btn" id="2">2</div>
  <div class="win-btn" id="3">3</div>
  <div class="win-btn" id="4">4</div>
  <div class="win-btn" id="5">5</div>
  <div class="win-btn" id="6">6</div>
  <div class="win-btn" id="7">7</div>
  <div class="win-btn" id="8">8</div>
  <div class="win-btn" id="9">9</div>
  <div class="win-btn" id="10">10</div>
  <div class="win-btn" id="11">11</div>
  <div class="win-btn" id="12">12</div>
  <div class="win-btn" id="13">13</div>
  <div class="win-btn" id="14">14</div>
  <div class="win-btn" id="15">15</div>
  <div class="win-btn" id="16">16</div>
  <div class="win-btn win-btn-active" id="17">17</div>
  <div class="win-btn" id="18">18</div>
  <div class="win-btn" id="19">19</div>
  <div class="win-btn" id="20">20</div>
  <div class="win-btn" id="21">21</div>
  <div class="win-btn" id="22">22</div>
  <div class="win-btn" id="23">23</div>
  <div class="win-btn" id="24">24</div>
  <div class="win-btn" id="25">25</div>
  <div class="win-btn" id="26">26</div>
  <div class="win-btn" id="27">27</div>
  <div class="win-btn" id="28">28</div>
  <div class="win-btn" id="29">29</div>
  <div class="win-btn" id="30">30</div>
  <div class="win-btn win-btn-inactive" id="31">1</div>
  <div class="win-btn win-btn-inactive" id="32">2</div>
  <div class="win-btn win-btn-inactive" id="33">3</div>
  <div class="win-btn win-btn-inactive" id="34">4</div>
  <div class="win-btn win-btn-inactive" id="35">5</div>
  <div class="win-btn win-btn-inactive" id="36">6</div>
  <div class="win-btn win-btn-inactive" id="37">7</div>
  <div class="win-btn win-btn-inactive" id="38">8</div>
  <div class="win-btn win-btn-inactive" id="39">9</div>
</div>
```

接着调整视图的基本样式，使用 `grid` 布局排列日期

```css
* {
  color: white;
  text-transform: capitalize;
  letter-spacing: 2px;
}

body {
  background-color: black;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}

.win-grid {
  border: 1px solid white;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 0.2rem;
  align-items: stretch;
  text-align: center;
  padding: 2rem;
  cursor: default;
}

.win-btn {
  padding: 1rem;
  text-align: center;
  border-radius: 0px;
  border: 3px solid transparent;
  background: black;
}

.win-btn-inactive {
  color: #ffffff5f;
}
```

观察 win10 日期可以发现，如果当天日期被选中，日期背景会有一部分中空，日期的边框和其他部分是激活的颜色，这个如何实现呢

我们可以先设置边框的颜色，再使用[background-origin](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-origin){:target="\_blank"}设置元素背景相对区域

当天日期被选中时`background-origin:content-box`, 选中其他日期时`background-origin:border-box`

```css
.win-btn-active {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.2rem;
  border: 3px solid red;
  background: center linear-gradient(red, red) no-repeat;
  background-origin: content-box;
}

.win-btn-active-unselected {
  background-origin: border-box;
}
```

设置被选中元素的边框样式，以及鼠标悬浮在当前日期和被选择日期时的样式

```css
.win-btn-selected {
  border: 3px solid red;
}

.win-btn-active:hover {
  border: 3px solid hsl(0, 90%, 75%);
}

.win-btn-selected:hover {
  border: 3px solid hsl(0, 70%, 50%) !important;
}
```

## 探照灯效果实现

### 日期选择状态切换

首先需要保存选择日期对象，监听日期点击事件，保存最后一个选择的日期对象，其次要根据选中状态，动态切换当前日期样式

```javascript
let activeBtn = document.querySelector(".win-btn-active");
let lastClicked = null;
document.querySelectorAll(".win-btn").forEach((btn) => {
  btn.onclick = (e) => {
    if (lastClicked) {
      lastClicked.classList.remove("win-btn-selected");
    }
    lastClicked = e.currentTarget;

    activeBtn.classList.toggle(
      "win-btn-active-unselected",
      e.currentTarget.id !== activeBtn.id
    );

    e.currentTarget.classList.add("win-btn-selected");
  };
});
```

### 悬浮日期边框高亮

要实现控制元素边框显示效果，需要用到`border-image`属性，我们需要为每个日期添加鼠标移动事件，计算鼠标相对日期元素的坐标，然后为元素添加`border-image`

```javascript
const body = document.querySelector(".win-grid");

body.addEventListener("mousemove", (e) => {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  e.target.style.borderImage = `radial-gradient(25% 75% at ${x}px ${y}px, rgba(245,7,181,0.7),rgba(245,7,181,0.1)) 1 / 2px / 0px stretch`;
});
```

### 临近日期边框高亮

如何让鼠标附近的日期元素也高亮现实呢？我们可以以当前位置为原点，画一个圆形，在圆形上标记出几个点，检测点所在的位置，如果所在位置存在日期元素，就高亮该元素边框，这里需要用到[elementFromPoint](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/elementFromPoint){:target="\_blank"}方法

取圆上的 8 个点

::InfoBox{type="info"}
8 个点是比较平均的选择，覆盖平面的 8 各方面，当然也可以挑选更多的点
::

:img-cont{src="/assets/img/articles/window-10-calendar-hover-effect-in-js/nearby-point.png"}

计算各个点的坐标需要用到三角函数

:img-cont{src="/assets/img/articles/window-10-calendar-hover-effect-in-js/calculate-coordinates.jfif"}

```javascript
// 设置圆的半径
const offset = 69;
const angles = [];
for (let i = 0; i <= 360; i += 45) {
  angles.push((i * Math.PI) / 180);
}
let nearBy = [];

body.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  nearBy = angles.reduce((acc, rad, index, arr) => {
    const cx = Math.floor(x + Math.cos(rad) * offset);
    const cy = Math.floor(y + Math.sin(rad) * offset);
    const element = document.elementFromPoint(cx, cy);
    if (
      element &&
      element.classList.contains("win-btn") &&
      !element.classList.contains("win-btn-active") &&
      !element.classList.contains("win-btn-selected") &&
      acc.findIndex((ae) => ae.id === element.id) < 0
    ) {
      const brect = element.getBoundingClientRect();
      const bx = x - brect.left; //x position within the element.
      const by = y - brect.top; //y position within the element.
      if (!element.style.borderImage)
        element.style.borderImage = `radial-gradient(${offset}px ${offset}px at ${bx}px ${by}px ,rgba(245,7,181,0.7),rgba(245,7,181,0.1),transparent ) 1 / 3px / 0px stretch `;
      return [...acc, element];
    }
    return acc;
  }, []);
});
```

上面代码实现了鼠标周边日期元素边框高亮，但存在一个问题，如果鼠标移动到日期元素上面，当前日期元素边框没有正常高亮，为什么有这个问题呢

这跟设置的圆的半径有关，辐射范围过大，导致没有点（设置的 8 个点）在当前元素上面，我们可以在每个点和原点连线线上面，再取一个靠中心的点，获取当前元素

:img-cont{src="/assets/img/articles/window-10-calendar-hover-effect-in-js/x-center-pointer.png"}

```javascript
body.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  nearBy = angles.reduce((acc, rad, index, arr) => {
    const offsets = [offset * 0.35, offset];
    const elements = offsets.reduce((elementAccumulator, o, i, offsetArray) => {
      const cx = Math.floor(x + Math.cos(rad) * o);
      const cy = Math.floor(y + Math.sin(rad) * o);
      const element = document.elementFromPoint(cx, cy);
      if (
        element &&
        element.classList.contains("win-btn") &&
        !element.classList.contains("win-btn-active") &&
        !element.classList.contains("win-btn-selected") &&
        elementAccumulator.findIndex((ae) => ae.id === element.id) < 0
      ) {
        const brect = element.getBoundingClientRect();
        const bx = x - brect.left; //x position within the element.
        const by = y - brect.top; //y position within the element.
        if (!element.style.borderImage)
          element.style.borderImage = `radial-gradient(${offset}px ${offset}px at ${bx}px ${by}px ,rgba(245,7,181,0.7),rgba(245,7,181,0.1),transparent ) 1 / ${borderWidth}px / 0px stretch `;
        return [...elementAccumulator, element];
      }
      return elementAccumulator;
    }, []);
    return acc.concat(elements);
  }, []);
});
```

每次鼠标移动都要重新计算，因此要清除 `nearBy` 中的数据

```javascript
function clearNearBy() {
  nearBy.splice(0).forEach((e) => (e.style.borderImage = null));
}

body.addEventListener("mousemove", (e) => {
  clearNearBy();
});

body.onmouseleave = (e) => {
  clearNearBy();
};
```

## 总结

要实现探照灯效果，首先需要弄明白[border-image](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-image){:target="\_blank"}的使用，其次是如何获得以鼠标为中心，周边附近元素的位置信息，这里用到的关键方法是[elementFromPoint](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/elementFromPoint){:target="\_blank"}

## 源码

::ProseA{href="https://stackblitz.com/edit/js-u5yin8?file=style.css,index.js"}
windows 10 calendar hover effect
::

## 参考

::ProseA{href="https://dev.to/jashgopani/windows-10-calendar-hover-effect-using-html-css-and-vanilla-js-57pb"}
Windows 10 calendar hover effect using HTML, CSS, and vanilla JS
::
