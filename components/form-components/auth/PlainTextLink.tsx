import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { Link } from 'expo-router';

import { LinkProps } from '@/types';
import { View, Text } from 'react-native';

const PlainTextLink = ({text, linkText, route}: LinkProps) => {
    const { colors } = useTheme();
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems:"center",
          flexDirection: "row",
          gap: 4
        }}
      >
        <Text style={{color: colors.primary}}>{text}</Text>
        <Link
          href={route}
          style={{color: colors.text, fontWeight: "800"}}
        >
          {linkText}
        </Link>
      </View>
    );
}
export default PlainTextLink;

