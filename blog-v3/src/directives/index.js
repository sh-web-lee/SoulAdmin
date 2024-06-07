// 指令
import copy from "./copy";
import image from "./imageLoading";

export function setupDirectives(app) {
  app.directive('image', image)
  app.directive('copy', copy)
}