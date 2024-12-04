import {DndContext, type DragEndEvent} from '@dnd-kit/core'
import {
  type ResponsiveSpot,
  type ResponsiveImage,
  type Viewport,
  type ViewportSettings,
} from '../types/shoppable'
import {cn} from '../utils'
import {ShoppableImage} from './ShoppableImage'
import {ShoppableSpot} from './ShoppableSpot'
import {getSpotPosition} from '../utils/spotHelpers'

interface ShoppableWrapperProps {
  images: ResponsiveImage
  spots: ResponsiveSpot[]
  currentViewport: Viewport
  viewportSettings: ViewportSettings
  onSpotMove: (spotId: string, deltaX: number, deltaY: number) => void
  activeSpotId?: string
  onSpotClick?: (spotId: string) => void
  isPlacingHotspot?: boolean
  onImageClick?: (x: number, y: number) => void
}

export const ShoppableWrapper: React.FC<ShoppableWrapperProps> = ({
  images,
  spots,
  currentViewport,
  viewportSettings,
  onSpotMove,
  activeSpotId,
  onSpotClick,
  isPlacingHotspot,
  onImageClick,
}) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const {active, delta} = event
    if (onSpotMove) {
      onSpotMove(active.id as string, delta.x, delta.y)
    }
    if (onSpotClick) {
      onSpotClick(active.id as string)
    }
  }

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPlacingHotspot || !onImageClick) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    onImageClick(x, y)
  }

  const containerWidth = viewportSettings[currentViewport].width

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        className="mx-auto overflow-hidden"
        style={{maxWidth: containerWidth, width: '100%'}}
      >
        <div 
          className={cn(
            "relative aspect-[4/3]",
            isPlacingHotspot && "cursor-crosshair"
          )}
          onClick={handleImageClick}
        >
          <ShoppableImage images={images} currentViewport={currentViewport} />
          {spots.map((spot) => (
            <ShoppableSpot
              key={spot.id}
              id={spot.id}
              position={getSpotPosition(spot, currentViewport)}
              isActive={spot.id === activeSpotId}
              isDraggable={!isPlacingHotspot}
              onClick={() => onSpotClick?.(spot.id)}
              currentViewport={currentViewport}
              viewportSettings={viewportSettings}
              {...spot.content}
            />
          ))}
        </div>
      </div>
    </DndContext>
  )
}