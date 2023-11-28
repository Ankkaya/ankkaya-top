---
title: 仿 ant-design-table 创建表格加载样式
description: 仿照 ant-design-table 的 a-table，创建表格查询时的加载样式
tags: [Vue, Css, ant-design-vue]
---

## 前言

项目中有一个自定义列表页面，自己想添加一个加载状态，刚好项目中用到的 `a-table` 自带加载样式

于是就是拿来学习一下 😁

## 基础加载样式

首先创建无动画时的加载样式

```html
<template>
  <div class="loading-area">
    <span class="area-dot">
      <i class="dot"></i>
      <i class="dot"></i>
      <i class="dot"></i>
      <i class="dot"></i>
    </span>
  </div>
</template>

<style>
  .loading-area {
    position: absolute;
    width: 100%;
  }
  .area-dot {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: rotate(45deg);
  }
  .dot {
    position: absolute;
    display: block;
    width: 9px;
    height: 9px;
    display: block;
    background-color: #1890ff;
    border-radius: 100%;
    transform: scale(0.75);
  }
  .dot:nth-child(1) {
    top: 0;
    left: 0;
  }
  .dot:nth-child(2) {
    top: 0;
    right: 0;
  }
  .dot:nth-child(3) {
    right: 0;
    bottom: 0;
  }
  .dot:nth-child(4) {
    bottom: 0;
    left: 0;
  }
</style>
```

## 添加加载动画

`area-dot` 类添加旋转动画，因为初始状态旋转了 45°，所以在动画的结束旋转 405°

```html
<style>
  .area-dot {
    animation: antRotate 3s infinite linear;
  }
  @keyframes antRotate {
    100% {
      transform: rotate(405deg);
    }
  }
</style>
```

现在有加载动画了，可以让动画更加生动，为每个 `dot` 添加透明度变化

```html
<style>
  .dot {
    opacity: 0.3;
  }
  .dot:nth-child(2) {
    animation-delay: 0.4s;
  }
  .dot:nth-child(3) {
    animation-delay: 0.8s;
  }
  .dot:nth-child(4) {
    animation-delay: 1.2s;
  }
</style>
```

## 完成代码

[在线预览](https://stackblitz.com/edit/vue-uairbc?file=src%2FApp.vue)

```html
<template>
  <div class="loading-area">
    <span class="area-dot">
      <i class="dot"></i>
      <i class="dot"></i>
      <i class="dot"></i>
      <i class="dot"></i>
    </span>
  </div>
</template>

<script>
  export default {};
</script>

<style>
  .loading-area {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .area-dot {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: rotate(45deg);
    animation: antRotate 5s infinite linear;
  }
  @keyframes antRotate {
    100% {
      transform: rotate(405deg);
    }
  }
  .dot {
    position: absolute;
    display: block;
    width: 9px;
    height: 9px;
    display: block;
    background-color: #1890ff;
    border-radius: 100%;
    transform: scale(0.75);
    opacity: 0.3;
    animation: antSpinMove 1s infinite linear alternate;
  }
  @keyframes antSpinMove {
    100% {
      opacity: 1;
    }
  }
  .dot:nth-child(1) {
    top: 0;
    left: 0;
  }
  .dot:nth-child(2) {
    top: 0;
    right: 0;
    animation-delay: 0.4s;
  }
  .dot:nth-child(3) {
    right: 0;
    bottom: 0;
    animation-delay: 0.8s;
  }
  .dot:nth-child(4) {
    bottom: 0;
    left: 0;
    animation-delay: 1.2s;
  }
</style>
```
