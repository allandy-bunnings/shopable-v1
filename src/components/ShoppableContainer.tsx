import React from 'react'
import type {
  Viewport,
  ViewportSettings,
  ResponsiveSpot,
  ResponsiveImage,
} from '../types/shoppable'
import {ShoppableWrapper} from './ShoppableWrapper'
import {CoordinatesDisplay} from './CoordinatesDisplay'
import {BottomControls} from './BottomControls'

interface ShoppableContainerProps {
  spots: ResponsiveSpot[]
  currentViewport: Viewport
  viewportSettings: ViewportSettings
  images: ResponsiveImage
  onSpotMove: (spotId: string, deltaX: number, deltaY: number) => void
  onAddHotspot: () => void
  onViewportChange: (viewport: Viewport) => void
  activeSpotId?: string
  onSpotClick: (spotId: string) => void
  onImageChange: (url: string, viewport: Viewport) => void
  onUpdateSpot: (spotId: string, updates: Partial<ResponsiveSpot>) => void
  isPlacingHotspot?: boolean
  onImageClick: (x: number, y: number) => void
  onDeleteSpot: (spotId: string) => void
}

export const ShoppableContainer: React.FC<ShoppableContainerProps> = ({
  spots,
  currentViewport,
  viewportSettings,
  images,
  onSpotMove,
  onAddHotspot,
  onViewportChange,
  activeSpotId,
  onSpotClick,
  onImageChange,
  onUpdateSpot,
  isPlacingHotspot,
  onImageClick,
  onDeleteSpot,
}) => {
  const uniqueSpotIds = new Set<string>()
  const uniqueSpots = spots.filter((spot) => {
    if (uniqueSpotIds.has(spot.id)) {
      return false
    }
    uniqueSpotIds.add(spot.id)
    return true
  })

  const maxSpots = viewportSettings[currentViewport].maxShown
  const visibleSpots = uniqueSpots.slice(0, maxSpots)
  const activeSpot = visibleSpots.find((spot) => spot.id === activeSpotId)

  return (
    <>
      <CoordinatesDisplay
        activeSpot={activeSpot}
        currentViewport={currentViewport}
      />
      <ShoppableWrapper
        images={images}
        spots={visibleSpots}
        currentViewport={currentViewport}
        viewportSettings={viewportSettings}
        onSpotMove={onSpotMove}
        activeSpotId={activeSpotId}
        onSpotClick={onSpotClick}
        isPlacingHotspot={isPlacingHotspot}
        onImageClick={onImageClick}
      />
      <BottomControls
        currentViewport={currentViewport}
        viewportSettings={viewportSettings}
        images={images}
        onViewportChange={onViewportChange}
        onAddHotspot={onAddHotspot}
        spotsCount={uniqueSpots.length}
        onImageChange={onImageChange}
        spots={visibleSpots}
        activeSpotId={activeSpotId}
        onSpotClick={onSpotClick}
        onUpdateSpot={onUpdateSpot}
        onDeleteSpot={onDeleteSpot}
        isPlacingHotspot={isPlacingHotspot}
      />
    </>
  )
}