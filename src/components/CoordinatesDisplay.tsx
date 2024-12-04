import React from 'react'
import type {ResponsiveSpot, Viewport} from '../types/shoppable'
import {getSpotPosition} from '../utils/spotHelpers'
import {formatPercentage} from '../utils/formatHelpers'

interface CoordinatesDisplayProps {
  activeSpot?: ResponsiveSpot
  currentViewport: Viewport
}

export const CoordinatesDisplay: React.FC<CoordinatesDisplayProps> = ({
  activeSpot,
  currentViewport,
}) => {
  if (!activeSpot) return null

  const position = getSpotPosition(activeSpot, currentViewport)
  const left = formatPercentage(position.left)
  const verticalPosition = position.top
    ? `top: ${formatPercentage(position.top)}`
    : `bottom: ${formatPercentage(position.bottom!)}`

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4">
      <h3 className="font-semibold mb-2">Hotspot Coordinates</h3>
      <div className="flex gap-4 text-sm">
        <span>left: {left}</span>
        <span>{verticalPosition}</span>
      </div>
    </div>
  )
}