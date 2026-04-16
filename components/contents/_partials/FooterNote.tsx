import { StyleSheet } from 'react-native';

import LangphyText from '@/components/text-components/LangphyText'
import { ReactNode } from 'react'
import { useTheme } from '@/theme/ThemeContext';

const FooterNote = ({children}: {children: ReactNode}) => {
    const {colors} = useTheme();
    return (
        <LangphyText style={[styles.text, styles.note, {color: colors.text}]}>
            {children}
        </LangphyText>
    );
}

export default FooterNote

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        lineHeight: 22,
    },
    note: {
        textTransform: "uppercase",
        marginVertical: 30,
        textAlign: "center"
    }
})