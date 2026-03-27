import { StyleProp, StyleSheet, TextStyle } from 'react-native'
import React from 'react'
import LangphyText from '../text-components/LangphyText'
import { Link } from 'expo-router'
import { useTheme } from '@/theme/ThemeContext'
import { FontWeight } from '@/types'

interface ContactDetailProps {
    weight?: FontWeight;
    style?: StyleProp<TextStyle>;
}

const ContactDetail = ({weight="regular", style}: ContactDetailProps) => {
    const {colors} = useTheme();
    return (
        <LangphyText weight={weight} style={[styles.text, {color: colors.text}, (style && style)]}>
            Developer: Niloy Rudra{"\n"}
            Email: privacy@langphy.com{"\n"}
            Website: <Link href={'https://langphy.com'}>https://langphy.com</Link>
        </LangphyText>
    );
}

export default ContactDetail;

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        lineHeight: 22,
        marginTop: 6
    }
})