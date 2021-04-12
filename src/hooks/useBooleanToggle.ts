import { useState, useCallback } from 'react'

export function useBooleanToggle(): [boolean, () => void] {
  const [isOn, setOn] = useState(false)

  const toggle = useCallback(() => {
    return setOn(!isOn)
  }, [isOn, setOn])

  return [isOn, toggle]
}
