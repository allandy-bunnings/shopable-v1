import React from 'react'
import type {ResponsiveSpot, Viewport} from '../types/shoppable'
import {getSpotPosition} from '../utils/spotHelpers'
import {formatPercentage} from '../utils/formatHelpers'
import {cn} from '../utils'
import {EditableCell} from './EditableCell'

interface HotspotTableProps {
  spots: ResponsiveSpot[]
  currentViewport: Viewport
  activeSpotId?: string
  onSpotClick?: (spotId: string) => void
  onUpdateSpot?: (spotId: string, updates: Partial<ResponsiveSpot>) => void
  onDeleteSpot?: (spotId: string) => void
}

export const HotspotTable: React.FC<HotspotTableProps> = ({
  spots,
  currentViewport,
  activeSpotId,
  onSpotClick,
  onUpdateSpot,
  onDeleteSpot,
}) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-gray-700 font-medium">
              Product (double-click to edit)
            </th>
            <th className="px-4 py-2 text-left text-gray-700 font-medium">X Position</th>
            <th className="px-4 py-2 text-left text-gray-700 font-medium">Y Position</th>
            <th className="px-4 py-2 text-right text-gray-700 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {spots.map((spot) => {
            const position = getSpotPosition(spot, currentViewport)
            const yPosition = position.top ?? position.bottom
            const isActive = spot.id === activeSpotId
            return (
              <tr 
                key={spot.id} 
                className={cn(
                  'border-t border-gray-100 transition-colors duration-200 cursor-pointer hover:bg-gray-50',
                  isActive && 'bg-blue-100 hover:bg-blue-200'
                )}
                onClick={() => onSpotClick?.(spot.id)}
              >
                <td>
                  <EditableCell
                    value={spot.content.productName}
                    isActive={isActive}
                    onSave={(newName) => 
                      onUpdateSpot?.(spot.id, {
                        content: {...spot.content, productName: newName}
                      })
                    }
                  />
                </td>
                <td className={cn(
                  'px-4 py-2',
                  isActive ? 'text-blue-900' : 'text-gray-900'
                )}>{formatPercentage(position.left)}</td>
                <td className={cn(
                  'px-4 py-2',
                  isActive ? 'text-blue-900' : 'text-gray-900'
                )}>
                  {position.top 
                    ? `top: ${formatPercentage(yPosition)}`
                    : `bottom: ${formatPercentage(yPosition)}`}
                </td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteSpot?.(spot.id)
                    }}
                    className="text-red-600 hover:text-red-800 transition-colors duration-200 px-2 py-1 rounded hover:bg-red-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}