import {type ResponsiveImage, type Viewport} from '../types/shoppable'
import {cn} from '../utils'

interface ShoppableImageProps {
  images: ResponsiveImage
  currentViewport: Viewport
}

export const ShoppableImage: React.FC<ShoppableImageProps> = ({
  images,
  currentViewport,
}) => {
  const getImageSource = () => {
    switch (currentViewport) {
      case 'mobile':
        return images.mobile
      case 'tablet':
        return images.tablet
      case 'desktop':
        return images.desktop
    }
  }

  return (
    <img
      className="h-full w-full object-cover"
      src={getImageSource()}
      alt={images.alt}
    />
  )
}