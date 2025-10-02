import imagesLoaded from 'imagesloaded'

export const preloadImages = (elements: Element[] | NodeListOf<Element>) => {
  const nodes = Array.from(elements)

  if (!nodes.length) {
    return Promise.resolve()
  }

  return new Promise<void>((resolve) => {
    imagesLoaded(nodes, { background: true }, () => resolve())
  })
}
