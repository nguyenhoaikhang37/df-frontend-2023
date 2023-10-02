'use client'

import { useEffect, useState } from 'react'
import { getInitialColorMode } from '../../utils/functions'

export type ThemeMode = 'light' | 'dark'

const DarkModeToggle = () => {
  const [colorMode, rawSetColorMode] = useState<ThemeMode>(getInitialColorMode)

  const updateColorMode = (newValue: ThemeMode) => {
    if (newValue === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  const setColorMode = (newValue: ThemeMode) => {
    // 1. Update React color-mode state
    rawSetColorMode(newValue)
    // 2. Update localStorage
    localStorage.setItem('color-mode', newValue)
    // 3. Update each color
    updateColorMode(newValue)
  }

  useEffect(() => {
    updateColorMode(colorMode)
  }, [colorMode])

  return (
    <label className="switch-container" htmlFor="dark-mode-toggle">
      <input
        type="checkbox"
        id="dark-mode-toggle"
        checked={colorMode === 'dark'}
        onChange={(ev) => {
          setColorMode(ev.target.checked ? 'dark' : 'light')
        }}
      />
      <span className="slider" />
    </label>
  )
}

export default DarkModeToggle
