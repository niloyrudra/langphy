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
import { CONTENT_WIDTH, isTablet } from '@/utils/responsive';
import { StyleSheet, View } from 'react-native';
import SIZES from '@/constants/size';

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
  if( !isTablet ) {
    // ── Phone — original behaviour, zero overhead ──────────────────────
    return (
      <SafeAreaView
        edges={edges}
        style={[STYLES.defaultContainer, { backgroundColor: colors.background }]}
      >
        {children}
      </SafeAreaView>
    );
  }

  // ── Tablet — phone island layout ───────────────────────────────────────
  // SafeAreaView still handles insets for the full screen (status bar,
  // navigation bar). Inside it, content is centred at CONTENT_WIDTH.
  // The gutter areas on each side get a slightly differentiated background
  // so they read as intentional margins, not empty space.
  return (
    <SafeAreaView
      edges={edges}
      style={[
        STYLES.defaultContainer,
        styles.tabletOuter,
        {
          // Gutter color — falls back to background if tabletGutter
          // is not defined in your theme. Either looks fine.
          backgroundColor: (colors as any).tabletGutter ?? colors.background,
        },
      ]}
    >
      {/* Left gutter separator */}
      <View
        style={[
          styles.gutter,
          { borderRightColor: (colors as any).cardBorderColor ?? 'transparent' },
        ]}
      />

      {/* Content island */}
      <View
        style={[
          styles.island,
          {
            width: CONTENT_WIDTH,
            backgroundColor: colors.background,
          },
        ]}
      >
        {children}
      </View>

      {/* Right gutter separator */}
      <View
        style={[
          styles.gutter,
          { borderLeftColor: (colors as any).cardBorderColor ?? 'transparent' },
        ]}
      />
    </SafeAreaView>
  );

};

export default SafeAreaLayout;

const styles = StyleSheet.create({
  // Tablet outer — horizontal flex so island sits between two gutters
  tabletOuter: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  // Each gutter takes equal flex — together they centre the island
  gutter: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'transparent',
  },
  // Island — fixed width, content scrolls/renders inside as normal
  island: {
    overflow: 'hidden',
    // Subtle elevation to separate island from gutters in light mode
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 8,

    paddingHorizontal: SIZES.bodyPaddingHorizontal,
    paddingBottom: SIZES.bodyPaddingVertical,
  },
});



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
