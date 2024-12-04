import React, {useState, useRef, useEffect} from 'react'
import {cn} from '../utils'

interface EditableCellProps {
  value: string
  onSave: (value: string) => void
  isActive?: boolean
}

export const EditableCell: React.FC<EditableCellProps> = ({
  value,
  onSave,
  isActive,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
    if (editValue.trim() !== value) {
      onSave(editValue.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleBlur()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setEditValue(value)
    }
  }

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-2 border-0 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
        onClick={(e) => e.stopPropagation()}
      />
    )
  }

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={cn(
        'px-4 py-2 cursor-text',
        isActive ? 'text-blue-900' : 'text-gray-900'
      )}
    >
      {value}
    </div>
  )
}