import {useState, useEffect} from 'react'
import {ShoppableContainer} from './components/ShoppableContainer'
import type {Viewport, ViewportSettings, ResponsiveSpot} from './types/shoppable'
import {createDefaultHotspot} from './utils/hotspotHelpers'
import {isPositionOutOfBounds} from './utils/boundaryHelpers'

export const App = () => <PageHome />

const PageHome = () => {
  const [currentViewport, setCurrentViewport] = useState<Viewport>('mobile')
  const [activeSpotId, setActiveSpotId] = useState<string>()
  const [spots, setSpots] = useState<ResponsiveSpot[]>([])
  const [isPlacingHotspot, setIsPlacingHotspot] = useState(false)

  const [images, setImages] = useState({
    mobile:
      'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&auto=format&fit=crop&w=768&q=80',
    tablet:
      'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=80',
    desktop:
      'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&auto=format&fit=crop&w=2574&q=80',
    alt: 'Product',
  })

  const viewportSettings: ViewportSettings = {
    mobile: {
      maxShown: 2,
      width: '375px',
    },
    tablet: {
      maxShown: 4,
      width: '768px',
    },
    desktop: {
      maxShown: 6,
      width: '1280px',
    },
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isPlacingHotspot) {
          setIsPlacingHotspot(false)
        } else if (activeSpotId) {
          setActiveSpotId(undefined)
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isPlacingHotspot, activeSpotId])

  const handleSpotMove = (spotId: string, deltaX: number, deltaY: number) => {
    setSpots((currentSpots) =>
      currentSpots.map((spot) => {
        if (spot.id !== spotId) return spot

        const position = spot[currentViewport]
        const container = document.querySelector('.relative.aspect-\\[4\\/3\\]')
        if (!container) return spot

        const rect = container.getBoundingClientRect()
        const newLeft = `${
          (deltaX / rect.width) * 100 + parseFloat(position.left)
        }%`

        const newPosition = {...position, left: newLeft}
        if (position.top) {
          const newTop = `${
            (deltaY / rect.height) * 100 + parseFloat(position.top)
          }%`
          newPosition.top = newTop
          delete newPosition.bottom
        } else if (position.bottom) {
          const newBottom = `${
            parseFloat(position.bottom) - (deltaY / rect.height) * 100
          }%`
          newPosition.bottom = newBottom
        }

        if (isPositionOutOfBounds(newPosition)) {
          return null
        }

        return {
          ...spot,
          [currentViewport]: newPosition,
        }
      }).filter((spot): spot is ResponsiveSpot => spot !== null),
    )
  }

  const handleAddHotspot = () => {
    const maxSpots = viewportSettings[currentViewport].maxShown
    if (spots.length < maxSpots) {
      setIsPlacingHotspot(true)
    }
  }

  const handleImageClick = (x: number, y: number) => {
    if (!isPlacingHotspot) return

    const newSpot = createDefaultHotspot(spots, `${x}%`, `${y}%`)
    const position = {
      top: `${y}%`,
      left: `${x}%`,
    }

    setSpots((currentSpots) => [
      ...currentSpots,
      {
        ...newSpot,
        [currentViewport]: position,
      },
    ])
    setIsPlacingHotspot(false)
    setActiveSpotId(newSpot.id)
  }

  const handleDeleteSpot = (spotId: string) => {
    setSpots((currentSpots) => currentSpots.filter((spot) => spot.id !== spotId))
    if (activeSpotId === spotId) {
      setActiveSpotId(undefined)
    }
  }

  const handleSpotClick = (spotId: string) => {
    if (!isPlacingHotspot) {
      setActiveSpotId((current) => (current === spotId ? undefined : spotId))
    }
  }

  const handleImageChange = (url: string, viewport: Viewport) => {
    setImages((current) => ({
      ...current,
      [viewport]: url,
    }))
  }

  const handleUpdateSpot = (spotId: string, updates: Partial<ResponsiveSpot>) => {
    setSpots((currentSpots) =>
      currentSpots.map((spot) =>
        spot.id === spotId ? {...spot, ...updates} : spot
      )
    )
  }

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="pb-[300px] pt-2">
        <ShoppableContainer
          spots={spots}
          currentViewport={currentViewport}
          viewportSettings={viewportSettings}
          images={images}
          onSpotMove={handleSpotMove}
          onAddHotspot={handleAddHotspot}
          onViewportChange={setCurrentViewport}
          activeSpotId={activeSpotId}
          onSpotClick={handleSpotClick}
          onImageChange={handleImageChange}
          onUpdateSpot={handleUpdateSpot}
          isPlacingHotspot={isPlacingHotspot}
          onImageClick={handleImageClick}
          onDeleteSpot={handleDeleteSpot}
        />
      </div>
    </div>
  )
}