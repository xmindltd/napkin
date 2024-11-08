import * as d3 from "d3";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("d3", d3); // 提供 d3 到全局上下文
});
