/** 屏幕滚动特效 文字浮现、消失 */
export const handleScroll = function () {
  const scrollElements = document.querySelectorAll('.scroll-animation')

  // 进入当前屏幕
  const elementInView = (el) => {
    const elementTop = el.getBoundingClientRect().top
    return (
      elementTop < window.innerHeight * 0.8
    )
  }
  // 退出当前屏幕
  const elementOutView = (el) => {
    const elementTop = el.getBoundingClientRect().top
    return (
      elementTop > window.innerHeight * 0.66
    )
  }

  const displayScrollElement = (element) => {
    element.classList.add('onScroll')
  }

  const hideScrollElement = (element) => {
    element.classList.remove('onScroll')
  }

  scrollElements.forEach(el => {
    if (elementInView(el)) {
      displayScrollElement(el)
    } else if (elementOutView(el)) {
      hideScrollElement(el)
    }
  })
}
