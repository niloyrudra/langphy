import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { Token } from '@/types';
import Translation from './_partials/Translation';
import WordAnalyzer from './_partials/WordAnalyzer';
import TooltipContentLabel from './_partials/TooltipContentLabel';
import TooltipPointer from './_partials/TooltipPointer';

interface TooltipProps {
    top: number;
    left: number;
    token: Token;
    // translation: string;
    // color: ColorValue | null;
}

const ToolTipComponent: React.FC<TooltipProps> = ({top, left, token}) => {
    const { colors } = useTheme();
    const translationEn = token?.meaning_en ? token?.meaning_en?.replace(/^,\s*/, "") : "";
    const article = token?.default_article ?? "";
    const display = token?.display ?? "";
    const gender = token?.gender ?? "";
    const number = token?.number ?? "";
    const ca = token?.case ?? "";
    const color = token.color ?? colors.textDark;

    return (
        <View
            pointerEvents='none'
            style={[
                styles.toolTip,
                {top: top, left: left},
                {
                    backgroundColor: colors.background,
                    borderColor: color ?? colors.textDark
                }
            ]}
        >
            <View style={{ position: "relative" }}>
                {/* Pointer */}
                <TooltipPointer color={color} />
                
                {/* Translations */}
                <TooltipContentLabel label="Meaning" />
                <Translation translation={translationEn} color={color} />
                {/* Case */}
                { ca && (<WordAnalyzer topic={ca} label="Case" />) }
                {/* Gender */}
                { gender && (<WordAnalyzer topic={gender} label="Gender" />) }
                {/* Number */}
                { number && (<WordAnalyzer topic={number} label="Number" />) }
                {/* Article */}
                { article && (<WordAnalyzer topic={article} label="Article" />) }
                {/* Display */}
                { display && (<WordAnalyzer topic={display} label="Usage" />) }
            </View>
        </View>
    )
}

export default ToolTipComponent;

const styles = StyleSheet.create({
    toolTip: {
        position: "absolute",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        maxWidth: 250,
        zIndex: 10000, // 9999,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 50, // 5,

        borderTopWidth: 4,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
    }
})