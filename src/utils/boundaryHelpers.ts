import type {Position} from '../types/shoppable'

export const isPositionOutOfBounds = (position: Position): boolean => {
  const left = parseFloat(position.left)
  
  // If we have a top position
  if (position.top) {
    const top = parseFloat(position.top)
    return left < 0 || left > 100 || top < 0 || top > 100
  }
  
  // If we have a bottom position
  if (position.bottom) {
    const bottom = parseFloat(position.bottom)
    return left < 0 || left > 100 || bottom < 0 || bottom > 100
  }

  // If we only have left position (shouldn't happen, but just in case)
  return left < 0 || left > 100
}