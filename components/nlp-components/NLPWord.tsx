import { findNodeHandle, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { speechHandler } from '@/utils'
import { Token, ToolTip, WordLayout } from '@/types';
import { useTheme } from '@/theme/ThemeContext';

interface WordProps {
    idx: string;
    token: Token;
    onHandler: (value: ToolTip | ((prev: ToolTip) => ToolTip)) => void;
    wordRefs: React.RefObject<Map<string, any>>;
    containerRef?: React.RefObject<View | null>;
    measureNlpContainer: (callback: (x: number, y: number) => void) => void; // ✅
    textStyle?: StyleProp<TextStyle>;
}

const TOOLTIP_WIDTH = 80;
const TOOLTIP_GAP   = 8; // 10;
const MARGIN_BOTTOM = 8;

const NLPWord: React.FC<WordProps> = ({
    idx,
    token,
    onHandler,
    wordRefs,
    containerRef,
    measureNlpContainer,
    textStyle
}) => {
    const {colors} = useTheme();
    const wordLayouts = React.useRef<Map<string, WordLayout>>(new Map());

    const actionHandler = (e: any) => {
        e.stopPropagation?.();
        speechHandler(token.text, "de-DE");

        const layoutData = wordLayouts.current.get(idx);
        if (!layoutData || !containerRef?.current) return;

        // const gap = 10;

        measureNlpContainer((nlpX, nlpY) => {
            containerRef.current!.measureInWindow((contX, contY, contW) => {
                // How far NLPAnalyzedPhase is from containerRef left edge
                const nlpOffsetX = nlpX - contX;

                // Word's x within NLPAnalyzedPhase
                const rawLeft = nlpOffsetX + layoutData.x;

                // Get tooltip width (approximate — adjust if you know the real value)
                // const TOOLTIP_WIDTH = 80;

                // Clamp so tooltip never goes beyond container right edge
                const relativeLeft = Math.min(
                    rawLeft,
                    contW - TOOLTIP_WIDTH
                );

                // Keep it from going off left edge too
                const clampedLeft = Math.max(0, relativeLeft);

                const relativeTop = (nlpY - contY) + layoutData.y + layoutData.height + TOOLTIP_GAP;


                // console.log("📍 position:", { clampedLeft, relativeTop, nlpX, nlpY, contX, contY, layoutData });

                onHandler({
                    visible: true,
                    x: clampedLeft, // relativeLeft,
                    y: relativeTop,
                    token,
                });
            });
        });
    };

    if(token.pos === "PUNCT") return (
        <Text
            style={[
                styles.mainText,
                {
                    color: token.color ?? colors.text,
                    marginLeft: -3,
                    marginBottom: MARGIN_BOTTOM,
                },
                (textStyle && textStyle)
            ]}
        >
            {token.text}
        </Text>
    );

    return (

        <TouchableOpacity
            key={idx}
            ref={(r) => {
                const mapKey = idx;
                if( r ) {
                    const handle = findNodeHandle(r);
                    wordRefs.current.set( mapKey, handle );
                }
                else wordRefs.current.delete( mapKey );
            }}
            onLayout={(e) => {
                const { x, y, width, height } = e.nativeEvent.layout
                wordLayouts.current.set(idx, { x, y, width, height });
            }}
            onPress={actionHandler}
            style={[styles.wordWrapper, {borderColor: token.color ?? colors.text}]}
        >
            <Text
                style={[
                    styles.mainText,
                    {color: token.color ?? colors.text},
                    (textStyle && textStyle)
                ]}
            >
                {token.text}
            </Text>
        </TouchableOpacity>
    )
}

export default NLPWord;

const styles = StyleSheet.create({
    mainText: {
        fontSize: 18, // 20,
        fontWeight: "800",
    },
    wordWrapper: {
        position: "relative",
        marginRight: 6,
        borderBottomWidth: 1.5,
        borderStyle: "solid",
        // borderStyle: "dashed",
        // borderBottomColor: "#1B7CF5",
        marginBottom: MARGIN_BOTTOM,
    },
});