import React from 'react'
import type {ResponsiveImage, Viewport} from '../types/shoppable'

interface ImageSelectorProps {
  images: ResponsiveImage
  currentViewport: Viewport
  onImageChange: (url: string, viewport: Viewport) => void
}

export const ImageSelector: React.FC<ImageSelectorProps> = ({
  images,
  currentViewport,
  onImageChange,
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      onImageChange(imageUrl, currentViewport)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-2 flex-1">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">
          Change {currentViewport} image:
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="flex-1 text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
    </div>
  )
}