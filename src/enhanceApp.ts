import { Route } from 'vue-router'
import smoothscroll from 'smoothscroll-polyfill'
import '../styles/index.styl'

export default ({ Vue, router }) => {
  smoothscroll.polyfill()

  router.options.scrollBehavior = (to: Route, from: Route, savedPosition: { x: number, y: number} | null) => {
    if (savedPosition) {
      return window.scrollTo({
        top: savedPosition.y,
        behavior: 'smooth',
      })
    } else if (to.hash) {
      if (Vue.$vuepress.$get('disableScrollBehavior')) {
        return false
      }

      const targetElement = document.querySelector(to.hash)

      if (targetElement) {
        return window.scrollTo({
          top: getElementPosition(targetElement).y,
          behavior: 'smooth',
        })
      }

      return false
    } else {
      return window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }
}

// fork from vue-router@3.0.2
// src/util/scroll.js
function getElementPosition (el: Element) {
  const docEl = document.documentElement
  const docRect = docEl.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()
  return {
    x: elRect.left - docRect.left,
    y: elRect.top - docRect.top,
  }
}
