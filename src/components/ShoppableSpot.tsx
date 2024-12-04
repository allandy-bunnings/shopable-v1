import {useDraggable} from '@dnd-kit/core'
import {useState, useRef, useEffect} from 'react'
import {type Position, type SpotContent, type ViewportSettings, type Viewport} from '../types/shoppable'
import {cn} from '../utils'
import {ProductTile} from './ProductTile'

interface ShoppableSpotProps extends SpotContent {
  id: string
  position: Position
  className?: string
  isDraggable?: boolean
  isActive?: boolean
  onClick?: () => void
  currentViewport: Viewport
  viewportSettings: ViewportSettings
  imageUrl?: string
}

export const ShoppableSpot: React.FC<ShoppableSpotProps> = ({
  id,
  position,
  productName,
  description,
  price,
  imageUrl = 'https://placehold.co/64x64/png',
  className = '',
  isDraggable = true,
  isActive = false,
  onClick,
  currentViewport,
  viewportSettings,
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [tooltipPosition, setTooltipPosition] = useState({
    horizontal: 'left',
    vertical: 'bottom',
  })

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id,
    disabled: !isDraggable,
  })

  const spotStyle: React.CSSProperties = {
    position: 'absolute',
    left: position.left,
    ...(position.top && {top: position.top}),
    ...(position.bottom && {bottom: position.bottom}),
    transform: transform ? 
      `translate(calc(-50% + ${transform.x}px), calc(${position.top ? '-50%' : '50%'} + ${transform.y}px))` :
      `translate(-50%, ${position.top ? '-50%' : '50%'})`,
    touchAction: 'none',
  }

  // Calculate max width based on viewport
  const getMaxWidth = () => {
    const viewportWidth = parseInt(viewportSettings[currentViewport].width)
    // For mobile, use 90% of viewport width
    if (currentViewport === 'mobile') {
      return Math.min(320, viewportWidth * 0.9)
    }
    // For tablet, use 60% of viewport width
    if (currentViewport === 'tablet') {
      return Math.min(400, viewportWidth * 0.6)
    }
    // For desktop, use fixed width
    return 400
  }

  useEffect(() => {
    if (tooltipRef.current && containerRef.current && (tooltipVisible || isActive)) {
      const tooltip = tooltipRef.current
      const container = containerRef.current
      const tooltipRect = tooltip.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const parentRect = container.parentElement?.getBoundingClientRect()

      if (!parentRect) return

      // Calculate viewport dimensions based on the current viewport setting
      const viewportWidth = parseInt(viewportSettings[currentViewport].width)
      const viewportHeight = parentRect.height

      // Calculate relative position of tooltip within the viewport
      const tooltipLeft = containerRect.left - parentRect.left
      const tooltipRight = tooltipLeft + tooltipRect.width
      const tooltipTop = containerRect.top - parentRect.top
      const tooltipBottom = tooltipTop + tooltipRect.height

      // Check for overflow
      const rightOverflow = tooltipRight > viewportWidth
      const bottomOverflow = tooltipBottom > viewportHeight

      setTooltipPosition({
        horizontal: rightOverflow ? 'right' : 'left',
        vertical: bottomOverflow ? 'top' : 'bottom',
      })
    }
  }, [tooltipVisible, isActive, currentViewport, viewportSettings])

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setTooltipVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setTooltipVisible(!tooltipVisible)
    if (onClick) {
      onClick()
    }
  }

  return (
    <div
      ref={(node) => {
        setNodeRef(node)
        if (node) {
          containerRef.current = node
        }
      }}
      style={spotStyle}
      className={cn(
        'absolute z-10 touch-none',
        isDraggable && 'cursor-move',
        className,
      )}
      onClick={handleClick}
      {...attributes}
      {...listeners}
    >
      <div
        className={cn(
          'dot flex h-12 w-12 items-center justify-center rounded-full bg-black bg-opacity-20 opacity-60 transition-all duration-250 ease-in-out hover:scale-75',
          isActive && 'ring-4 ring-blue-500 ring-opacity-50',
        )}
      >
        <span
          className={cn(
            'h-8 w-8 rounded-full bg-white shadow-md transition-transform duration-250 ease-in-out',
            isActive && 'scale-90 bg-blue-500',
          )}
        ></span>
      </div>
      <div
        ref={tooltipRef}
        className={cn(
          'tooltip absolute shadow-lg transition-all duration-200 ease-in-out',
          tooltipPosition.horizontal === 'right' ? '-right-4' : 'left-0',
          tooltipPosition.vertical === 'top' ? 'bottom-full mb-4' : 'top-full mt-4',
          (tooltipVisible || isActive)
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 pointer-events-none',
        )}
      >
        <ProductTile
          productName={productName}
          description={description}
          price={price}
          imageUrl={imageUrl}
          maxWidth={getMaxWidth()}
        />
      </div>
    </div>
  )
}