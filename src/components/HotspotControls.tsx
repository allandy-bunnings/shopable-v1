import React, {useState, useEffect} from 'react'
import type {Viewport, ViewportSettings} from '../types/shoppable'
import {cn} from '../utils'

interface HotspotControlsProps {
  onAddHotspot: () => void
  spotsCount: number
  currentViewport: Viewport
  viewportSettings: ViewportSettings
  isPlacingHotspot?: boolean
}

export const HotspotControls: React.FC<HotspotControlsProps> = ({
  onAddHotspot,
  spotsCount,
  currentViewport,
  viewportSettings,
  isPlacingHotspot,
}) => {
  const [showMaxWarning, setShowMaxWarning] = useState(false)
  const maxSpots = viewportSettings[currentViewport].maxShown
  const visibleSpots = Math.min(spotsCount, maxSpots)
  const canAddMore = visibleSpots < maxSpots

  const handleAddClick = () => {
    if (canAddMore) {
      onAddHotspot()
    } else {
      setShowMaxWarning(true)
      setTimeout(() => setShowMaxWarning(false), 3000)
    }
  }

  useEffect(() => {
    setShowMaxWarning(false)
  }, [currentViewport])

  return (
    <div className="flex flex-col items-center gap-2">
      {showMaxWarning && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded-md text-sm">
          Maximum {maxSpots} hotspots allowed in {currentViewport} view
        </div>
      )}
      <div className="bg-white rounded-lg shadow-lg p-2">
        <button
          onClick={handleAddClick}
          className={cn(
            'px-4 py-2 rounded-md text-white transition-all duration-200',
            canAddMore
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-gray-400 cursor-not-allowed',
            isPlacingHotspot && 'animate-pulse'
          )}
        >
          {isPlacingHotspot ? 'Click image to place hotspot' : `Add Hotspot (${visibleSpots}/${maxSpots})`}
        </button>
      </div>
    </div>
  )
}