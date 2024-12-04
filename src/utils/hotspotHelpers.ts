import type {ResponsiveSpot} from '../types/shoppable'

const generateUniqueId = (existingSpots: ResponsiveSpot[]): string => {
  const existingIds = new Set(existingSpots.map(spot => spot.id))
  let id = 1
  
  while (existingIds.has(`spot-${id}`)) {
    id++
  }
  
  return `spot-${id}`
}

export const createDefaultHotspot = (
  existingSpots: ResponsiveSpot[],
  x: string,
  y: string,
): ResponsiveSpot => ({
  id: generateUniqueId(existingSpots),
  mobile: {top: y, left: x},
  tablet: {top: y, left: x},
  desktop: {top: y, left: x},
  content: {
    productName: 'New Product',
    description: 'Product Description',
    price: '$0.00',
    imageUrl: 'https://placehold.co/64x64/png',
  },
})