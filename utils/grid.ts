import { gsap } from 'gsap'

type Alternating = 'odd' | 'even' | undefined

export interface GridCollection extends Array<HTMLElement> {
  refresh: () => void
  columns: (alternating?: Alternating, merge?: boolean) => HTMLElement[][] | HTMLElement[]
  rows: (alternating?: Alternating, merge?: boolean) => HTMLElement[][] | HTMLElement[]
}

export const getGrid = (selector: Element[] | NodeListOf<Element>): GridCollection => {
  const elements = gsap.utils.toArray(selector) as GridCollection
  let bounds: DOMRect[] = []

  const getSubset = (
    axis: 'left' | 'top',
    dimension: 'width' | 'height',
    alternating: Alternating,
    merge?: boolean
  ): HTMLElement[][] | HTMLElement[] => {
    const subsets: Record<number, HTMLElement[]> = {}
    const onlyEven = alternating === 'even'

    bounds.forEach((rect, index) => {
      const position = Math.round(rect[axis] + rect[dimension] / 2)
      const subset = subsets[position] || (subsets[position] = [])
      subset.push(elements[index])
    })

    let grouped = Object.values(subsets)

    if (alternating) {
      grouped = grouped.filter((_, index) => (!(index % 2)) === onlyEven)
    }

    if (merge) {
      return grouped.flat()
    }

    return grouped
  }

  elements.refresh = () => {
    bounds = elements.map((element) => element.getBoundingClientRect())
  }

  elements.columns = (alternating?: Alternating, merge?: boolean) =>
    getSubset('left', 'width', alternating, merge)

  elements.rows = (alternating?: Alternating, merge?: boolean) =>
    getSubset('top', 'height', alternating, merge)

  elements.refresh()

  return elements
}
