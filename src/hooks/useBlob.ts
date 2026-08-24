import { useMemo, useState } from 'react'

// ---------- Types ----------
export interface BlobShape {
  radii: [number, number, number, number, number, number, number, number]
  rotation: number
  gradientAngle: number
}

export interface DisplaySettings {
  scale: number
  detailLevel: number
  morphIntensity: number
  lightIntensity: number
  opacity: number
}

export type ColorMode = 'solid' | 'gradient'

export interface ColorSettings {
  mode: ColorMode
  solidColor: string
  gradientColors: [string, string, string]
  gradientMixes: [number, number, number]
}

export interface BlobStyle {
  borderRadius: string
  transform: string
  background: string
  opacity: number
}

// ---------- Defaults ----------
export const defaultDisplaySettings: DisplaySettings = {
  scale: 1,
  detailLevel: 26,
  morphIntensity: 1,
  lightIntensity: 1,
  opacity: 1,
}

export const defaultColorSettings: ColorSettings = {
  mode: 'gradient',
  solidColor: '#8b5cf6',
  gradientColors: ['#8b5cf6', '#d946ef', '#f59e0b'],
  gradientMixes: [0.8, 0.6, 0.3],
}

// ---------- Helper ----------
const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min

export function generateRandomShape(): BlobShape {
  const radii = Array.from({ length: 8 }, () =>
    Math.round(randomBetween(30, 70))
  ) as BlobShape['radii']

  return {
    radii,
    rotation: Math.round(randomBetween(-10, 10)),
    gradientAngle: Math.round(randomBetween(0, 360)),
  }
}

export function generateBlob(
  shape: BlobShape,
  settings: DisplaySettings,
  colorSettings: ColorSettings
): BlobStyle {
  const { radii, rotation, gradientAngle } = shape
  const { scale, morphIntensity, lightIntensity, opacity } = settings
  const { mode, solidColor, gradientColors, gradientMixes } = colorSettings

  // Apply morph intensity
  const adjustedRadii = radii.map((r) => {
    const newVal = 50 + (r - 50) * morphIntensity
    return Math.max(0, Math.min(100, newVal))
  })

  const [r1, r2, r3, r4, r5, r6, r7, r8] = adjustedRadii
  const borderRadius = `${r1}% ${100 - r1}% ${r2}% ${100 - r2}% / ${r3}% ${r4}% ${r5}% ${r6}%`
  const transform = `scale(${scale}) rotate(${rotation}deg)`

  // Apply light intensity (brightness) to a hex color
  const applyLightIntensity = (color: string): string => {
    const hex = color.replace('#', '')
    const num = parseInt(hex, 16)
    let r = (num >> 16) & 255
    let g = (num >> 8) & 255
    let b = num & 255

    r = Math.round(r * lightIntensity)
    g = Math.round(g * lightIntensity)
    b = Math.round(b * lightIntensity)

    return `rgb(${r}, ${g}, ${b})`
  }

  let background: string

  if (mode === 'solid') {
    background = applyLightIntensity(solidColor)
  } else {
    const c1 = applyLightIntensity(gradientColors[0])
    const c2 = applyLightIntensity(gradientColors[1])
    const c3 = applyLightIntensity(gradientColors[2])
    const m1 = gradientMixes[0]
    const m2 = gradientMixes[1]
    const m3 = gradientMixes[2]

    background = `linear-gradient(${gradientAngle}deg, rgba(${c1}, ${m1}), rgba(${c2}, ${m2}), rgba(${c3}, ${m3}))`
  }

  return {
    borderRadius,
    transform,
    background,
    opacity,
  }
}

export function useBlob() {
  const [shape, setShape] = useState<BlobShape>(generateRandomShape)
  const [displaySettings, setDisplaySettings] = useState<DisplaySettings>(
    defaultDisplaySettings
  )
  const [colorSettings, setColorSettings] = useState<ColorSettings>(
    defaultColorSettings
  )

  const blobStyle = useMemo(
    () => generateBlob(shape, displaySettings, colorSettings),
    [shape, displaySettings, colorSettings]
  )

  const randomize = () => {
    setShape(generateRandomShape())
  }

  const reset = () => {
    setShape(generateRandomShape())
    setDisplaySettings(defaultDisplaySettings)
    setColorSettings(defaultColorSettings)
  }

  return {
    blobStyle,
    displaySettings,
    setDisplaySettings,
    colorSettings,
    setColorSettings,
    randomize,
    reset,
  }
}
