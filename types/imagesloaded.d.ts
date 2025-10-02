declare module 'imagesloaded' {
  interface ImagesLoadedOptions {
    background?: boolean | string
  }

  interface ImagesLoaded {
    on(event: 'done', callback: () => void): void
  }

  function imagesLoaded(
    elements: Element | Element[] | NodeListOf<Element>,
    options: ImagesLoadedOptions,
    callback: () => void
  ): ImagesLoaded

  export default imagesLoaded
}
