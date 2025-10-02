import { defineNuxtPlugin } from '#app'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
  if (process.client && !gsap.core.globals().ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger)
  }

  return {
    provide: {
      gsap
    }
  }
})
