/**
 * modalDimensions.ts
 *
 * Shared dimension constants for full-screen modals.
 *
 * WHY THIS EXISTS
 * ───────────────
 * React Native's <Modal> renders at the root of the view hierarchy, outside
 * the SafeAreaLayout island. On tablet it therefore spans the FULL screen
 * width (e.g. 1200dp on a 10" tablet), not the 480dp island. Using raw
 * Dimensions.get('window').width/height for modal sizing is correct for
 * phones but produces a stretched, uncentred modal on tablet.
 *
 * This file provides MODAL_WIDTH and MODAL_OFFSET so all three celebration
 * modals (DailyStreaksModal, SessionCompletionModal, MilestonesAchievementModal)
 * render over the island on tablet and full-screen on phone — with one import.
 *
 * USAGE
 * ─────
 * Replace:
 *   import { Dimensions } from 'react-native';
 *   const { width: W, height: H } = Dimensions.get('window');
 *
 * With:
 *   import { MODAL_WIDTH, MODAL_HEIGHT, MODAL_OFFSET } from '@/utils/modalDimensions';
 *
 * Then in StyleSheet.create:
 *   container: {
 *       width:       MODAL_WIDTH,
 *       height:      MODAL_HEIGHT,
 *       marginLeft:  MODAL_OFFSET,   // ← centres over island on tablet, 0 on phone
 *       borderStartStartRadius: 0,
 *       borderEndStartRadius:   0,
 *       borderTopWidth:   0,
 *       borderLeftWidth:  0,
 *       borderRightWidth: 0,
 *   },
 *   modalContainer: {
 *       height:           MODAL_HEIGHT,
 *       paddingVertical:  vs(30),
 *       paddingHorizontal: rs(20),
 *       justifyContent:   'space-between',
 *   },
 */

import { Dimensions } from 'react-native';
import { CONTENT_WIDTH, contentOffset } from '@/utils/responsive';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

/** Modal width — matches the island on tablet, full screen on phone */
export const MODAL_WIDTH  = CONTENT_WIDTH;

/** Modal height — always full screen height (safe area insets handle the rest) */
export const MODAL_HEIGHT = SCREEN_HEIGHT;

/**
 * Left margin to position the modal over the island on tablet.
 * Phone  → 0
 * Tablet → (SCREEN_WIDTH - CONTENT_WIDTH) / 2
 */
export const MODAL_OFFSET = contentOffset;