/**
 * SafeAreaLayout.tsx
 *
 * The root SafeAreaProvider lives in Expo Router's ExpoRoot — we never
 * create our own provider. This component uses SafeAreaView directly,
 * reading insets from that single root provider.
 *
 * EDGES PROP — critical for avoiding double insets
 * ─────────────────────────────────────────────────
 * Expo Router's Stack navigator already accounts for the top safe-area
 * inset on screens where a header is SHOWN (it pushes content below
 * the header, which sits below the status bar). If SafeAreaView also
 * applies the top inset on those screens, the result is extra whitespace
 * below the header — which is exactly the "additional padding in the
 * header area" bug.
 *
 * Rule:
 *   - headerShown: false  → edges={['top','bottom','left','right']} (default)
 *     SafeAreaView must guard the top because nobody else does.
 *   - headerShown: true   → edges={['bottom','left','right']}
 *     Stack header already guards the top — don't double-apply.
 *
 * Usage:
 *   // Session screens (no header):
 *   <SafeAreaLayout>...</SafeAreaLayout>
 *
 *   // Screens with a Stack header (UnitSessions index, HomeScreen, CategoryScreen):
 *   <SafeAreaLayout edges={['bottom','left','right']}>...</SafeAreaLayout>
 */

import React, { ReactNode } from 'react';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import STYLES from '@/constants/styles';
import { useTheme } from '@/theme/ThemeContext';

interface SafeAreaLayoutProps {
  children: ReactNode;
  /**
   * Which edges to apply safe-area insets to.
   * Default: all four edges (correct for headerShown:false screens).
   * Pass ['bottom','left','right'] for screens where the Stack header
   * already manages the top inset.
   */
  edges?: Edge[];
}

const SafeAreaLayout = ({
  children,
  edges = ['top', 'bottom', 'left', 'right'],
}: SafeAreaLayoutProps) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      edges={edges}
      style={[STYLES.defaultContainer, { backgroundColor: colors.background }]}
    >
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaLayout;

// /**
//  * SafeAreaLayout.tsx
//  *
//  * CRITICAL FIX: SafeAreaProvider removed from this component.
//  *
//  * The old version wrapped every screen (including every session screen) in
//  * its own <SafeAreaProvider>. This caused two production bugs:
//  *
//  * 1. THEME CHANGE KILLS SPEECH IN LISTENING/WRITING
//  *    When the user tapped the theme toggle while in a session, ThemeProvider
//  *    re-rendered, which re-rendered SafeAreaLayout, which unmounted and
//  *    remounted SafeAreaProvider. On Android, mounting a new SafeAreaProvider
//  *    triggers a native audio session reconfiguration that interrupts the
//  *    active TTS engine — speech died silently and isSpeaking got stuck true.
//  *
//  * 2. DOUBLE SafeAreaProvider WARNING
//  *    Expo Router already mounts a SafeAreaProvider at the root. Nesting
//  *    another one inside each screen produces React warnings and can cause
//  *    inset values to be doubled on some Android versions.
//  *
//  * Fix: SafeAreaProvider lives ONLY in _layout.tsx (root), provided by
//  * Expo Router. This component now uses SafeAreaView directly — it reads
//  * insets from the existing root provider without creating a new one.
//  */

// import React, { ReactNode } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context';
// import STYLES from '@/constants/styles';
// import { useTheme } from '@/theme/ThemeContext';

// const SafeAreaLayout = ({children}: {children: ReactNode}) => {
//     const {colors} = useTheme();
//     return (
//       // <SafeAreaProvider>
//         <SafeAreaView style={[STYLES.defaultContainer, {backgroundColor: colors.background}]}>
//           {children && children}
//         </SafeAreaView>
//       // </SafeAreaProvider>
//     )
// }

// export default SafeAreaLayout;
