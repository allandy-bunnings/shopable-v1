import {type Viewport} from '../types/shoppable'

interface ViewportControlsProps {
  currentViewport: Viewport
  onViewportChange: (viewport: Viewport) => void
}

export const ViewportControls: React.FC<ViewportControlsProps> = ({
  currentViewport,
  onViewportChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-2 flex gap-2">
      <button
        onClick={() => onViewportChange('mobile')}
        className={`px-4 py-2 rounded-md transition-colors ${
          currentViewport === 'mobile'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        Mobile
      </button>
      <button
        onClick={() => onViewportChange('tablet')}
        className={`px-4 py-2 rounded-md transition-colors ${
          currentViewport === 'tablet'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        Tablet
      </button>
      <button
        onClick={() => onViewportChange('desktop')}
        className={`px-4 py-2 rounded-md transition-colors ${
          currentViewport === 'desktop'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        Desktop
      </button>
    </div>
  )
}