import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { Href, Link } from 'expo-router';

interface LinkProps {
    linkText: string,
    route: Href
}

const PlainTextLink = ({linkText, route}: LinkProps) => {
    const { colors } = useTheme();
  return (
    <Link
        href={route}
        style={{color: colors.primary, textDecorationStyle:"solid", textDecorationColor: colors.primary, textDecorationLine: "underline"}}
    >{linkText}</Link>
  )
}

export default PlainTextLink;

