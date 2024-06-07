import type { DirectiveBinding } from 'vue';

const image = {
  beforeMount(el: Element, binding: DirectiveBinding) {
    if (!binding.value) return;
    const img = new Image();
    img.src = binding.value;
    // 创建一个loading的img标签
    const cup = document.createElement('div');
    cup.classList.add('coffee_cup');
    el.appendChild(cup); // 插入dom

    img.onload = () => {
      el.removeChild(cup); // 加载成功移除loading
    };

    img.onerror = () => {
      el.removeChild(cup); // 加载失败移除loading 展示el自定义的错误
    };
  }
};
export default image;
