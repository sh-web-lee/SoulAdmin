export function handleScroll() {
  const scrollElements = document.querySelectorAll('.scroll-animation');

  // 进入当前屏幕
  function elementInView(el: Element) {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop < window.innerHeight * 0.8;
  }

  // 退出当前屏幕
  function elementOutView(el: Element) {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop > window.innerHeight * 0.66;
  }

  function displayScrollElement(el: Element) {
    el.classList.add('on-scroll');
  }

  function hideScrollElement(el: Element) {
    el.classList.remove('on-scroll');
  }

  scrollElements.forEach(el => {
    if (elementInView(el)) {
      displayScrollElement(el);
    } else if (elementOutView(el)) {
      hideScrollElement(el);
    }
  });
}
