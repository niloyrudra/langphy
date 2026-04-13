/**
 * responsive.ts — Langphy responsive scaling utility
 *
 * WHY THIS EXISTS
 * ───────────────
 * React Native's "dp" unit is density-independent but NOT screen-size-independent.
 * A fontSize:24 looks correct on a 390pt iPhone but enormous on a 320pt budget Android.
 *
 * This module provides three scale functions:
 *
 *   rs(size)   — "responsive scale" — scales relative to screen WIDTH
 *                Use for: fontSize, borderRadius, icon sizes, gaps
 *
 *   vs(size)   — "vertical scale" — scales relative to screen HEIGHT
 *                Use for: marginTop, paddingVertical, component heights
 *
 *   ms(size, factor?) — "moderate scale" — partial scale (default factor=0.5)
 *                Use for: font sizes where you want gentle scaling, not full
 *
 * DESIGN BASE
 * ───────────
 * Base design width: 390 (iPhone 14 / Pixel 7 — the most common design target)
 * Base design height: 844
 *
 * USAGE
 * ─────
 *   import { rs, vs, ms } from '@/utils/responsive';
 *
 *   const styles = StyleSheet.create({
 *     title: { fontSize: ms(24) },        // gentle font scaling
 *     button: { height: vs(52) },         // vertical component
 *     icon:   { width: rs(32), height: rs(32) },  // proportional icon
 *   });
 */

import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Design base dimensions (iPhone 14 / Pixel 7 — standard design canvas)
const BASE_WIDTH  = 390;
const BASE_HEIGHT = 844;

/** Scale by screen WIDTH — good for font sizes, horizontal spacing */
export const rs = (size: number): number => {
    return Math.round((SCREEN_WIDTH / BASE_WIDTH) * size);
};

/** Scale by screen HEIGHT — good for vertical margins, heights */
export const vs = (size: number): number => {
    return Math.round((SCREEN_HEIGHT / BASE_HEIGHT) * size);
};

/**
 * Moderate scale — partially scales to avoid extremes.
 * factor=0.5 means: scale halfway between no-scale and full-scale.
 * Good for: font sizes, border radius, padding.
 */
export const ms = (size: number, factor: number = 0.5): number => {
    return Math.round(size + (rs(size) - size) * factor);
};

/**
 * Normalize font size across different pixel densities.
 * Useful when you want consistent visual weight regardless of density.
 */
export const nf = (size: number): number => {
    return Math.round(PixelRatio.roundToNearestPixel(ms(size)));
};
