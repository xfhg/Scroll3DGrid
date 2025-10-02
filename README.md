# On-Scroll 3D Grid Animations (Nuxt)

A Nuxt 4-ready recreation of the Codrops "On-Scroll 3D Grid Animations" demo using Vue single-file components, GSAP, ScrollTrigger, and Lenis. The repository ships a drop-in component plus a showcase page wired into Nuxt so you can `npm install` and start the demo immediately.

![On-Scroll 3D Grid Animations](https://tympanus.net/codrops/wp-content/uploads/2023/08/onscroll3dgrid.jpg)

## Getting started

```bash
npm install
npm run dev
```

- Visit `http://localhost:3000` to explore the demo.
- Run `npm run build` to generate a production build.
- Run `npm run preview` to preview the production build locally.

## Project structure

- `components/Scroll3DGridDemo.vue` – Vue component that renders the grids and wires up GSAP, ScrollTrigger, Lenis, and the original animation flows.
- `pages/index.vue` – Nuxt page using the component with meta tags and external font loading.
- `plugins/gsap.client.ts` – Registers the ScrollTrigger plugin on the client.
- `utils/` – Shared helpers for preloading images and working with grid subsets.
- `assets/css/base.css` – Original Codrops styling imported globally via Nuxt.
- `public/img` – Static images used in the grids.

## Credits

Original demo by [Codrops](https://tympanus.net/codrops/). Images were generated with [Midjourney](https://midjourney.com).

## License

[MIT](LICENSE)
