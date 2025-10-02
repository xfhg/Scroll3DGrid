<template>
  <div ref="rootEl">
    <main>
      <div class="frame">
        <a class="frame__back" href="https://tympanus.net/codrops/?p=73075" target="_blank" rel="noreferrer">Back to the article</a>
        <a class="frame__prev" href="http://tympanus.net/Development/GridFlowEffect/" target="_blank" rel="noreferrer">Previous demo</a>
      </div>
      <div class="intro">
        <h1 class="intro__title">
          <span class="intro__title-pre">On-Scroll</span>
          <span class="intro__title-sub">Perspective Grid Animations</span>
        </h1>
        <span class="intro__info">Scroll moderately to fully experience the animations</span>
      </div>
      <section
        v-for="section in sections"
        :key="section.id"
        :class="['content', section.spacing && 'content--spacing']"
      >
        <div :class="['grid', section.gridClass]">
          <div class="grid-wrap">
            <div v-for="image in section.images" :key="image" class="grid__item">
              <div
                class="grid__item-inner"
                :style="{ backgroundImage: `url(/img/${image}.jpg)` }"
              />
            </div>
          </div>
        </div>
        <h3
          v-if="section.title"
          :class="['content__title', section.title.position]"
          v-html="section.title.copy"
        />
      </section>
      <section class="outro">
        <h2 class="outro__title">More you might like</h2>
        <div class="card-wrap">
          <div v-for="card in cards" :key="card.href" class="card">
            <a
              :href="card.href"
              class="card__image"
              :style="{ backgroundImage: `url(${card.image})` }"
              target="_blank"
              rel="noreferrer"
            />
            <h3 class="card__title">
              <a :href="card.href" target="_blank" rel="noreferrer">{{ card.title }}</a>
            </h3>
          </div>
        </div>
      </section>
      <p class="credits">
        Made by <a href="https://twitter.com/codrops" target="_blank" rel="noreferrer">@codrops</a>
      </p>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { preloadImages } from '~/utils/preloadImages'
import { getGrid } from '~/utils/grid'

type LenisConstructor = typeof import('lenis')['default']
type LenisInstance = InstanceType<LenisConstructor>

interface SectionTitle {
  copy: string
  position?: string
}

interface GridSection {
  id: number
  gridClass: string
  spacing?: boolean
  images: number[]
  title?: SectionTitle
}

interface OutroCard {
  href: string
  image: string
  title: string
}

const sections: GridSection[] = [
  {
    id: 1,
    gridClass: 'grid--1',
    images: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
      28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48
    ],
    title: {
      copy: 'Fleeting moments, <br>existence\'s dance.',
      position: 'content__title--right content__title--top'
    }
  },
  {
    id: 2,
    gridClass: 'grid--2',
    images: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
      28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48
    ],
    title: {
      copy: 'Impermanence <br>guides life\'s river.'
    }
  },
  {
    id: 3,
    gridClass: 'grid--3',
    spacing: true,
    images: [
      18, 29, 6, 37, 15, 32, 41, 23, 5, 12, 27, 1, 46, 35, 20, 39, 8, 25, 2, 44, 43, 17, 26, 11, 14, 7,
      33, 30, 10, 21, 16, 31, 24, 36, 42, 3, 38, 9, 4, 40, 28, 22, 34, 13, 19, 47, 45, 48
    ],
    title: {
      copy: 'Embrace now, <br>tomorrow may fade.',
      position: 'content__title--left content__title--bottom'
    }
  },
  {
    id: 4,
    gridClass: 'grid--4',
    spacing: true,
    images: [
      3, 21, 16, 24, 9, 7, 15, 19, 6, 8, 17, 5, 18, 13, 4, 14, 1, 2, 11, 20, 23, 10, 22, 12
    ],
    title: {
      copy: 'Now unfolds <br>eternity\'s grace',
      position: 'content__title--right'
    }
  },
  {
    id: 5,
    gridClass: 'grid--5',
    spacing: true,
    images: [
      18, 29, 6, 37, 15, 32, 41, 23, 5, 12, 27, 1, 46, 35, 20, 39, 8, 25, 2, 44, 43, 17, 26, 11, 14, 7,
      33, 30, 10, 21, 16, 31, 24, 36, 42, 3, 38, 9, 4, 40, 28, 22, 34, 13, 19, 47, 45, 48
    ],
    title: {
      copy: 'An infinite universe<br> of moments unfolding'
    }
  },
  {
    id: 6,
    gridClass: 'grid--6',
    spacing: true,
    images: [18, 5, 8, 43, 34, 21, 39, 6, 13, 47, 10, 45, 27, 31, 28, 30, 36, 14, 23, 35, 19],
    title: {
      copy: 'Seasons shift, <br>moments flow.'
    }
  }
]

const cards: OutroCard[] = [
  {
    href: 'http://tympanus.net/Development/ScrollBasedLayoutAnimations/',
    image: 'https://tympanus.net/codrops/wp-content/uploads/2023/07/scrollbased.jpg',
    title: 'Scroll-Based Layout Animations'
  },
  {
    href: 'http://tympanus.net/Development/OnScrollFilter/',
    image: 'https://tympanus.net/codrops/wp-content/uploads/2023/07/onscrollfilter_feat-2.jpg',
    title: 'On-Scroll SVG Filter Effect'
  },
  {
    href: 'http://tympanus.net/Tutorials/OnScrollPathAnimations/',
    image: 'https://tympanus.net/codrops/wp-content/uploads/2022/06/OnScrollShapeAnimation_feat.jpg',
    title: 'How to Animate SVG Shapes on Scroll'
  }
]

const rootEl = ref<HTMLElement | null>(null)
let lenis: LenisInstance | null = null
let rafId = 0
let ctx: gsap.Context | null = null

const initSmoothScrolling = async () => {
  const { default: Lenis } = (await import('lenis')) as { default: LenisConstructor }
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true })

  lenis.on('scroll', () => ScrollTrigger.update())

  const raf = (time: number) => {
    lenis?.raf(time)
    rafId = requestAnimationFrame(raf)
  }

  rafId = requestAnimationFrame(raf)
}

const applyAnimation = (grid: HTMLElement, animationType: string) => {
  const gridWrap = grid.querySelector('.grid-wrap') as HTMLElement | null
  const gridItems = grid.querySelectorAll<HTMLElement>('.grid__item')
  const gridItemsInner = Array.from(gridItems, (item) => item.querySelector('.grid__item-inner') as HTMLElement)

  if (!gridWrap || !gridItems.length) {
    return
  }

  const timeline = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: gridWrap,
      start: 'top bottom+=5%',
      end: 'bottom top-=5%',
      scrub: true
    }
  })

  switch (animationType) {
    case 'type1':
      grid.style.setProperty('--perspective', '1000px')
      grid.style.setProperty('--grid-inner-scale', '0.5')

      timeline
        .set(gridWrap, {
          rotationY: 25
        })
        .set(gridItems, {
          z: () => gsap.utils.random(-1600, 200)
        })
        .fromTo(
          gridItems,
          {
            xPercent: () => gsap.utils.random(-1000, -500)
          },
          {
            xPercent: () => gsap.utils.random(500, 1000)
          },
          0
        )
        .fromTo(
          gridItemsInner,
          {
            scale: 2
          },
          {
            scale: 0.5
          },
          0
        )
      break

    case 'type2':
      grid.style.setProperty('--grid-width', '160%')
      grid.style.setProperty('--perspective', '2000px')
      grid.style.setProperty('--grid-inner-scale', '0.5')
      grid.style.setProperty('--grid-item-ratio', '0.8')
      grid.style.setProperty('--grid-columns', '6')
      grid.style.setProperty('--grid-gap', '14vw')

      timeline
        .set(gridWrap, {
          rotationX: 20
        })
        .set(gridItems, {
          z: () => gsap.utils.random(-3000, -1000)
        })
        .fromTo(
          gridItems,
          {
            yPercent: () => gsap.utils.random(100, 1000),
            rotationY: -45,
            filter: 'brightness(200%)'
          },
          {
            ease: 'power2',
            yPercent: () => gsap.utils.random(-1000, -100),
            rotationY: 45,
            filter: 'brightness(0%)'
          },
          0
        )
        .fromTo(
          gridWrap,
          {
            rotationZ: -5
          },
          {
            rotationX: -20,
            rotationZ: 10,
            scale: 1.2
          },
          0
        )
        .fromTo(
          gridItemsInner,
          {
            scale: 2
          },
          {
            scale: 0.5
          },
          0
        )
      break

    case 'type3':
      grid.style.setProperty('--grid-width', '105%')
      grid.style.setProperty('--grid-columns', '8')
      grid.style.setProperty('--perspective', '1500px')
      grid.style.setProperty('--grid-inner-scale', '0.5')

      timeline
        .set(gridItems, {
          transformOrigin: '50% 0%',
          z: () => gsap.utils.random(-5000, -2000),
          rotationX: () => gsap.utils.random(-65, -25),
          filter: 'brightness(0%)'
        })
        .to(
          gridItems,
          {
            xPercent: () => gsap.utils.random(-150, 150),
            yPercent: () => gsap.utils.random(-300, 300),
            rotationX: 0,
            filter: 'brightness(200%)'
          },
          0
        )
        .to(
          gridWrap,
          {
            z: 6500
          },
          0
        )
        .fromTo(
          gridItemsInner,
          {
            scale: 2
          },
          {
            scale: 0.5
          },
          0
        )
      break

    case 'type4':
      grid.style.setProperty('--grid-width', '50%')
      grid.style.setProperty('--perspective', '3000px')
      grid.style.setProperty('--grid-item-ratio', '0.8')
      grid.style.setProperty('--grid-columns', '3')
      grid.style.setProperty('--grid-gap', '1vw')

      timeline
        .set(gridWrap, {
          transformOrigin: '0% 50%',
          rotationY: 30,
          xPercent: -75
        })
        .set(gridItems, {
          transformOrigin: '50% 0%'
        })
        .to(
          gridItems,
          {
            duration: 0.5,
            ease: 'power2',
            z: 500,
            stagger: 0.04
          },
          0
        )
        .to(
          gridItems,
          {
            duration: 0.5,
            ease: 'power2.in',
            z: 0,
            stagger: 0.04
          },
          0.5
        )
        .fromTo(
          gridItems,
          {
            rotationX: -70,
            filter: 'brightness(120%)'
          },
          {
            duration: 1,
            rotationX: 70,
            filter: 'brightness(0%)',
            stagger: 0.04
          },
          0
        )
      break

    case 'type5': {
      grid.style.setProperty('--grid-width', '120%')
      grid.style.setProperty('--grid-columns', '8')
      grid.style.setProperty('--grid-gap', '0')

      const gridObj = getGrid(gridItems)

      timeline
        .set(gridWrap, {
          rotationX: 50
        })
        .to(gridWrap, {
          rotationX: 30
        })
        .fromTo(
          gridItems,
          {
            filter: 'brightness(0%)'
          },
          {
            filter: 'brightness(100%)'
          },
          0
        )
        .to(
          gridObj.rows('even'),
          {
            xPercent: -100,
            ease: 'power1'
          },
          0
        )
        .to(
          gridObj.rows('odd'),
          {
            xPercent: 100,
            ease: 'power1'
          },
          0
        )
        .addLabel('rowsEnd', '>-=0.15')
        .to(
          gridItems,
          {
            ease: 'power1',
            yPercent: () => gsap.utils.random(-100, 200)
          },
          'rowsEnd'
        )
      break
    }

    case 'type6':
      grid.style.setProperty('--perspective', '2500px')
      grid.style.setProperty('--grid-width', '100%')
      grid.style.setProperty('--grid-gap', '6')
      grid.style.setProperty('--grid-columns', '3')
      grid.style.setProperty('--grid-item-ratio', '1')

      timeline.fromTo(
        gridItems,
        {
          transformOrigin: '50% 200%',
          rotationX: 0,
          yPercent: 400
        },
        {
          yPercent: 0,
          rotationY: 360,
          opacity: 0.2,
          scale: 0.8,
          stagger: 0.03
        }
      )
      break

    default:
      break
  }
}

const applyAnimations = () => {
  if (!rootEl.value) {
    return
  }

  const grids = Array.from(rootEl.value.querySelectorAll<HTMLElement>('.grid'))

  grids.forEach((grid, index) => {
    const typeIndex = (index % 6) + 1
    applyAnimation(grid, `type${typeIndex}`)
  })

  ScrollTrigger.refresh()
}

onMounted(async () => {
  if (!rootEl.value) {
    return
  }

  document.body.classList.add('loading')

  try {
    await preloadImages(rootEl.value.querySelectorAll('.grid__item-inner'))

    await initSmoothScrolling()

    ctx = gsap.context(() => {
      applyAnimations()
    }, rootEl.value)
  } finally {
    document.body.classList.remove('loading')
  }
})

onBeforeUnmount(() => {
  if (ctx) {
    ctx.revert()
    ctx = null
  }

  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

  if (lenis) {
    lenis.destroy()
    lenis = null
  }

  if (rafId) {
    cancelAnimationFrame(rafId)
  }

  document.body.classList.remove('loading')
})
</script>
