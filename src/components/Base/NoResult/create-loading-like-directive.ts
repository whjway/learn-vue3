// @ts-nocheck
import { createApp } from "vue";
import { addClass, removeClass } from "./dom";

const relativeClass = "gloable-reative";
/**
 * 1 loading组件
 * 2 自定义loading文字
 * 3 兼容当前dom没有定位的样式布局
 * 4 抽离成公共js
 * @param cmp
 * @returns {{mounted(*=, *=): void, updated(*=, *): void}}
 */
export default function createLoadingLikeDirective(cmp) {
  return {
    mounted(el, binding) {
      const app = createApp(cmp);
      const instance = app.mount(document.createElement("div"));
      const scope = cmp.name;
      if (!el[scope]) {
        el[scope] = {};
      }
      el[scope].instance = instance;

      const title = binding.arg;
      if (title) instance.setTitle(title);
      if (binding.value) {
        append(el);
      }
    },
    updated(el, binding) {
      const title = binding.arg;
      const scope = cmp.name;
      if (title) el[scope].instance.setTitle(title);
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el);
      }
    }
  };
  function append(el) {
    const scope = cmp.name;
    const style = getComputedStyle(el);
    if (["absolute", "fixed", "relative"].indexOf(style.position) === -1) {
      addClass(el, relativeClass);
    }
    el.appendChild(el[scope].instance.$el);
  }
  function remove(el) {
    const scope = cmp.name;
    removeClass(el, relativeClass);
    el.removeChild(el[scope].instance.$el);
  }
}
