export interface Position {
  top?: string
  bottom?: string
  left: string
}

export interface SpotContent {
  productName: string
  description: string
  price: string
  imageUrl?: string
}

export interface ResponsiveSpot {
  id: string
  mobile: Position
  tablet: Position
  desktop: Position
  content: SpotContent
}

export interface ResponsiveImage {
  mobile: string
  tablet: string
  desktop: string
  alt: string
}

export interface ViewportConfig {
  maxShown: number
  width: string
}

export interface ViewportSettings {
  mobile: ViewportConfig
  tablet: ViewportConfig
  desktop: ViewportConfig
}

export type Viewport = 'mobile' | 'tablet' | 'desktop'