<template>
  <Scroll3DGridDemo />
</template>

<script setup lang="ts">
import Scroll3DGridDemo from '~/components/Scroll3DGridDemo.vue'

useHead({
  title: 'On-Scroll 3D Grid Animations',
  meta: [
    {
      name: 'description',
      content: 'Nuxt demo replicating Codrops\' on-scroll perspective grid animations using GSAP, ScrollTrigger, and Lenis.'
    },
    {
      name: 'keywords',
      content: 'Nuxt, GSAP, ScrollTrigger, Lenis, on scroll animation, 3D grid'
    },
    {
      property: 'og:title',
      content: 'On-Scroll 3D Grid Animations in Nuxt'
    },
    {
      property: 'og:description',
      content: 'Drop-in Nuxt component for Codrops\' on-scroll 3D grid animation demo.'
    }
  ],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://use.typekit.net/hky5sxh.css'
    }
  ]
})
</script>
