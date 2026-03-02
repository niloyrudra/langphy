import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'

import STYLES from '@/constants/styles';
import sizes from '@/constants/size'
import { useTheme } from '@/theme/ThemeContext'
import LangphyText from '@/components/text-components/LangphyText';

interface SocialButtonProps {
    iconComponent: ReactNode,
    socialMediaName: string,
    onTap: () => void
}

const SocialButton = ({iconComponent, socialMediaName, onTap}: SocialButtonProps) => {
    const {colors} = useTheme();
    return (
        <TouchableOpacity
            style={[
                STYLES.contentCentered,
                styles.container,
                {
                    borderColor: colors.socialButtonBorderColor,
                    backgroundColor: colors.socialButtonBackgroundColor
                }
            ]}
            onPress={onTap}
        >
            {iconComponent}
            <LangphyText weight="extrabold" style={{color: colors.text, fontWeight:"800"}}>{socialMediaName}</LangphyText>
        </TouchableOpacity>
    );
}

export default SocialButton

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 8,
        height: sizes.buttonHeight,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1
    }
})