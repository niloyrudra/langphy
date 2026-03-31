import { StyleProp, StyleSheet, TextStyle, View } from 'react-native'
import React from 'react'
import LangphyText from '../text-components/LangphyText'
import { Link } from 'expo-router'
import { useTheme } from '@/theme/ThemeContext'
import { FontWeight } from '@/types'
import { Ionicons } from '@expo/vector-icons'

interface ContactDetailProps {
    weight?: FontWeight;
    style?: StyleProp<TextStyle>;
}

const ContactDetail = ({weight="regular", style}: ContactDetailProps) => {
    const {colors} = useTheme();
    return (
        <View style={styles.container}>
            <LangphyText weight={weight} style={[styles.text, {color: colors.text}, (style && style)]}>
                <Ionicons name="code" size={24} color={colors.primary} />
                <LangphyText weight="bold" style={styles.dev}>
                    {' '}
                    Niloy Rudra
                </LangphyText>
            </LangphyText>
            <LangphyText weight={weight} style={[styles.text, {color: colors.text}, (style && style)]}>
                <Ionicons name="mail" size={24} color={colors.primary} />
                {' '}
                privacy@langphy.com
            </LangphyText>
            <LangphyText weight={weight} style={[styles.text, {color: colors.text}, (style && style)]}>
                <Ionicons name="globe" size={24} color={colors.primary} />
                {' '}
                <Link style={[styles.link, {textDecorationColor: colors.text}]} href={'https://langphy.com'}>https://langphy.com</Link>
            </LangphyText>
        </View>
    );
}

export default ContactDetail;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 2
    },
    dev: {
        fontSize: 20,
        fontWeight: "800",
        lineHeight: 28,
        marginTop: 0,
    },
    text: {
        fontSize: 15,
        lineHeight: 22,
        marginTop: 0,
        alignSelf: "flex-start",
        justifyContent: "center",
        textAlignVertical: "center",
    },
    link: {
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
    }
})