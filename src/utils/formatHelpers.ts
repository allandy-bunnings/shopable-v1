export const formatPercentage = (value: string): string => {
  const numericValue = parseFloat(value)
  return `${Math.round(numericValue)}%`
}