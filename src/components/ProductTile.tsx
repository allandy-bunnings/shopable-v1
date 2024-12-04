import React from 'react'
import {cn} from '../utils'
import type {SpotContent} from '../types/shoppable'

interface ProductTileProps extends SpotContent {
  className?: string
  maxWidth?: number
}

export const ProductTile: React.FC<ProductTileProps> = ({
  productName,
  description,
  price,
  imageUrl,
  className,
  maxWidth,
}) => {
  return (
    <div 
      className={cn('flex rounded-md bg-white overflow-hidden', className)}
      style={{ maxWidth: maxWidth ? `${maxWidth}px` : undefined }}
    >
      {imageUrl && (
        <div className="shrink-0 p-4">
          <img
            src={imageUrl}
            alt={productName}
            className="h-16 w-16 object-cover rounded-md"
          />
        </div>
      )}
      <div className="flex-1 min-w-[200px] p-4">
        <span className="productname relative block pr-6 font-bold uppercase truncate after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:transition-transform after:content-['→'] hover:after:translate-x-1">
          {productName}
        </span>
        <span className="short-description mt-2 block text-sm leading-6 line-clamp-2 min-w-[180px]">{description}</span>
        <span className="price mt-4 block text-xl font-bold uppercase">{price}</span>
      </div>
    </div>
  )
}