import { findNodeHandle, LayoutChangeEvent, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo } from 'react'
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
const TOKEN_SPACE = 5;

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

    // ✅ memoized styles
    const textColor = token.color ?? colors.text;

    const textStyles = useMemo(
        () => [
            styles.mainText,
            { color: textColor },
            textStyle,
        ],
        [textColor, textStyle]
    );

    const wrapperStyle = useMemo(
        () => [
            styles.wordWrapper,
            { borderColor: textColor },
            token.pos !== "PUNCT" && { marginRight: TOKEN_SPACE },
        ],
        [textColor, token.pos]
    );

    const refHandler = useCallback((r: View | null) => {
        const mapKey = idx;
        if( r ) {
            const handle = findNodeHandle(r);
            wordRefs.current.set( mapKey, handle );
        }
        else wordRefs.current.delete( mapKey );
    }, [findNodeHandle]);

    const handleLayout = useCallback((e: LayoutChangeEvent) => {
        const { x, y, width, height } = e.nativeEvent.layout
        wordLayouts.current.set(idx, { x, y, width, height });
    }, []);

    const actionHandler = useCallback((e: any) => {
        e.stopPropagation?.();
        speechHandler(token.text, "de-DE");

        const layoutData = wordLayouts.current.get(idx);
        if (!layoutData || !containerRef?.current) return;

        measureNlpContainer((nlpX, nlpY) => {
            containerRef.current!.measureInWindow((contX, contY, contW) => {
                // How far NLPAnalyzedPhase is from containerRef left edge
                const nlpOffsetX = nlpX - contX;

                // Word's x within NLPAnalyzedPhase
                const rawLeft = nlpOffsetX + layoutData.x;

                // Clamp so tooltip never goes beyond container right edge
                const relativeLeft = Math.min( rawLeft, contW - TOOLTIP_WIDTH );

                // Keep it from going off left edge too
                const clampedLeft = Math.max(0, relativeLeft) - 20;
                const relativeTop = ( nlpY - contY ) + layoutData.y + layoutData.height + TOOLTIP_GAP;

                onHandler({
                    visible: true,
                    x: clampedLeft, // relativeLeft,
                    y: relativeTop,
                    token,
                });
            });
        });
    }, [token, measureNlpContainer, onHandler]);

    // ✅ punctuation fast path
    if(token.pos === "PUNCT") return (
        <Text
            style={[
                styles.mainText,
                {
                    color: textColor,
                    marginLeft: ( token.text === `'` || token.text === `"` ? 0 : -TOKEN_SPACE),
                    marginRight: ([",", ":", ".", "!", "?"].includes(token.text) ? TOKEN_SPACE : 0),
                    marginBottom: MARGIN_BOTTOM,
                },
                textStyle
            ]}
        >
            {token.text}
        </Text>
    );

    return (
        <TouchableOpacity
            key={idx}
            ref={refHandler}
            onLayout={handleLayout}
            onPress={actionHandler}
            style={wrapperStyle}
        >
            <Text style={textStyles}>{token.text}</Text>
        </TouchableOpacity>
    )
}

// export default NLPWord;
// ✅ prevent unnecessary re-renders
export default React.memo(NLPWord, (prev, next) => {
  return (
    prev.idx === next.idx &&
    prev.token.text === next.token.text &&
    prev.token.color === next.token.color &&
    prev.token.pos === next.token.pos &&
    prev.wordRefs === next.wordRefs &&
    prev.containerRef === next.containerRef
  );
});

const styles = StyleSheet.create({
    mainText: {
        fontSize: 18, // 20,
        fontWeight: "800",
    },
    wordWrapper: {
        position: "relative",
        borderBottomWidth: 1.5,
        borderStyle: "solid",
        marginBottom: MARGIN_BOTTOM,
    },
});