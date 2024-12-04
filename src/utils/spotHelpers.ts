import type {ResponsiveSpot, Viewport, Position} from '../types/shoppable'

export const getSpotPosition = (
  spot: ResponsiveSpot,
  viewport: Viewport,
): Position => {
  switch (viewport) {
    case 'mobile':
      return spot.mobile
    case 'tablet':
      return spot.tablet
    case 'desktop':
      return spot.desktop
  }
}

export const generateUniqueId = (existingSpots: ResponsiveSpot[]): string => {
  const existingIds = new Set(existingSpots.map((spot) => spot.id))
  let id = 1

  while (existingIds.has(`spot-${id}`)) {
    id++
  }

  return `spot-${id}`
}

export const createDefaultHotspot = (
  existingSpots: ResponsiveSpot[],x:string,y:string
): ResponsiveSpot => ({
  id: generateUniqueId(existingSpots),
  mobile: {top: x, left: y},
  tablet: {top: x, left: y},
  desktop: {top: x, left: y},
  content: {
    productName: 'New Product',
    description: 'Product Description',
    price: '$0.00',
  },
})