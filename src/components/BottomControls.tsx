import React from 'react'
import type {Viewport, ViewportSettings, ResponsiveImage, ResponsiveSpot} from '../types/shoppable'
import {ViewportControls} from './ViewportControls'
import {HotspotControls} from './HotspotControls'
import {ImageSelector} from './ImageSelector'
import {HotspotTable} from './HotspotTable'

interface BottomControlsProps {
  currentViewport: Viewport
  viewportSettings: ViewportSettings
  images: ResponsiveImage
  onViewportChange: (viewport: Viewport) => void
  onAddHotspot: () => void
  spotsCount: number
  onImageChange: (url: string, viewport: Viewport) => void
  spots: ResponsiveSpot[]
  activeSpotId?: string
  onSpotClick?: (spotId: string) => void
  onUpdateSpot?: (spotId: string, updates: Partial<ResponsiveSpot>) => void
  onDeleteSpot?: (spotId: string) => void
  isPlacingHotspot?: boolean
}

export const BottomControls: React.FC<BottomControlsProps> = ({
  currentViewport,
  viewportSettings,
  images,
  onViewportChange,
  onAddHotspot,
  spotsCount,
  onImageChange,
  spots,
  activeSpotId,
  onSpotClick,
  onUpdateSpot,
  onDeleteSpot,
  isPlacingHotspot,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto p-4 flex flex-col items-center gap-4">
        <HotspotControls
          onAddHotspot={onAddHotspot}
          spotsCount={spotsCount}
          currentViewport={currentViewport}
          viewportSettings={viewportSettings}
          isPlacingHotspot={isPlacingHotspot}
        />
        <div className="flex flex-col md:flex-row gap-4 w-full items-center">
          <ViewportControls
            currentViewport={currentViewport}
            onViewportChange={onViewportChange}
          />
          <ImageSelector
            images={images}
            currentViewport={currentViewport}
            onImageChange={onImageChange}
          />
        </div>
        <HotspotTable 
          spots={spots} 
          currentViewport={currentViewport} 
          activeSpotId={activeSpotId}
          onSpotClick={onSpotClick}
          onUpdateSpot={onUpdateSpot}
          onDeleteSpot={onDeleteSpot}
        />
      </div>
    </div>
  )
}