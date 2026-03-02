import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { Link } from 'expo-router';

import { LinkProps } from '@/types';
import { StyleSheet, View } from 'react-native';
import LangphyText from '@/components/text-components/LangphyText';

const PlainTextLink = ({text, linkText, route}: LinkProps) => {
    const { colors } = useTheme();
    return (
      <View style={styles.container}>
        <LangphyText style={{color: colors.primary}}>{text}</LangphyText>
        <Link
          href={route}
          style={[styles.link, {color: colors.text}]}
        >
          {linkText}
        </Link>
      </View>
    );
}
export default PlainTextLink;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems:"center",
    flexDirection: "row",
    gap: 4
  },
  link: {fontWeight: "800"}
});

