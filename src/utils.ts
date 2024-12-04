import * as React from 'react'

import {clsx, type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const useSSR = () => {
  const [is, set] = React.useState(false)

  React.useEffect(() => {
    set(true)
  }, [])

  return !is
}
