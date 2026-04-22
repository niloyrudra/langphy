/**
 * responsive.ts — Langphy responsive scaling utility
 *
 * TABLET SUPPORT
 * ──────────────
 * On tablets (screen width > 600dp) all layout is constrained to
 * MAX_CONTENT_WIDTH (480dp) and centred — the "phone island" pattern.
 * This means every rs() / ms() call automatically produces phone-scale
 * values on tablet, so no per-screen changes are needed anywhere.
 *
 * CONTENT_WIDTH  — usable layout width (capped on tablet, full on phone)
 * contentOffset  — left margin to centre the island on tablet (0 on phone)
 * isTablet       — boolean flag for the rare cases that need a branch
 *
 * Scale functions:
 *   rs(size)          — horizontal scale from CONTENT_WIDTH base
 *   vs(size)          — vertical scale from screen height (intentionally full)
 *   ms(size, factor)  — moderate scale for font sizes (default factor 0.5)
 *   nf(size)          — pixel-density normalised font size
 */

import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const BASE_WIDTH  = 390;  // iPhone 14 / Pixel 7
const BASE_HEIGHT = 844;

// Any screen wider than this is treated as a tablet
const TABLET_BREAKPOINT = 600;

// Phone-equivalent content width used on tablet
export const MAX_CONTENT_WIDTH = 480;

export const isTablet = SCREEN_WIDTH > TABLET_BREAKPOINT;

/**
 * The width available for content.
 * Phone  → full SCREEN_WIDTH (no change from old behaviour)
 * Tablet → capped at MAX_CONTENT_WIDTH
 */
export const CONTENT_WIDTH = isTablet
    ? Math.min(SCREEN_WIDTH, MAX_CONTENT_WIDTH)
    : SCREEN_WIDTH;

/**
 * Left offset to centre the island on tablet.
 * Phone  → 0 (no offset)
 * Tablet → (SCREEN_WIDTH - MAX_CONTENT_WIDTH) / 2
 */
export const contentOffset = isTablet
    ? Math.round((SCREEN_WIDTH - CONTENT_WIDTH) / 2)
    : 0;

/** Horizontal scale — uses CONTENT_WIDTH so tablet scales from phone base */
export const rs = (size: number): number =>
    Math.round((CONTENT_WIDTH / BASE_WIDTH) * size);

/** Vertical scale — uses full screen height (tablets are taller, intentional) */
export const vs = (size: number): number =>
    Math.round((SCREEN_HEIGHT / BASE_HEIGHT) * size);

/**
 * Moderate scale — partial horizontal scaling.
 * factor=0.5: halfway between no-scale and full rs() scale.
 * Best for font sizes to avoid over-scaling on large phones.
 */
export const ms = (size: number, factor: number = 0.5): number =>
    Math.round(size + (rs(size) - size) * factor);

/** Pixel-density normalised font size */
export const nf = (size: number): number =>
    Math.round(PixelRatio.roundToNearestPixel(ms(size)));