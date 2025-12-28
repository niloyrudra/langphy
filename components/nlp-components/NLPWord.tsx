import { findNodeHandle, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { measureInWindowSafe, speechHandler } from '@/utils'
import { Token, ToolTip, WordLayout } from '@/types';
import { useTheme } from '@/theme/ThemeContext';

interface WordProps {
    idx: string,
    token: Token,
    onHandler: (value: ToolTip | ((prev: ToolTip) => ToolTip)) => void;
    wordRefs: React.RefObject<Map<string, any>>;
    containerRef?: React.RefObject<View | null>;
    screenRef: React.RefObject<View | null>;
    textStyle?: StyleProp<TextStyle>
}

const NLPWord: React.FC<WordProps> = ({
    idx,
    token,
    onHandler,
    wordRefs,
    containerRef,
    screenRef,
    textStyle
}) => {
    const {colors} = useTheme();
    const wordLayouts = React.useRef<Map<string, WordLayout>>(new Map());

    const actionHandler = (e: any) => {
        e.stopPropagation?.();

        speechHandler(token.text, "de-DE");

        const node = wordRefs.current.get(idx);
        if (!node) return;

        measureInWindowSafe(node, (wordX, wordY, wordW, wordH) => {
            const containerNode = findNodeHandle(screenRef.current);
            const gap = 30;

            if (!containerNode) return;

            measureInWindowSafe(containerNode, (contX, contY) => {
                const data = wordLayouts.current.get(idx)
                const relativeLeft = data?.x ?? wordX - contX; // Math.max(6, wordX - contX),
                const relativeTop = data?.y ? wordY - contY + wordH + gap + data?.y : wordY - contY + wordH + gap;
                // const relativeTop = wordY - contY + wordH + gap;

                // console.log( "wordX:", wordX )
                // console.log( "wordY:", wordY )
                // console.log( "wordW:", wordW )
                // console.log( "wordH:", wordH )
                // console.log( "contX:", contX )
                // console.log( "contY:", contY )
                // console.log( "relativeTop:", relativeTop )
                // console.log( "data:", data )

                onHandler({
                    visible: true,
                    x: relativeLeft,
                    y: relativeTop,
                    token: token
                });
            });
        });
    }

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
            onPress={(e) => {
                actionHandler(e);
            }}
            style={styles.wordWrapper}
        >
            <Text
                style={[
                    styles.mainText,
                    {
                        color: token.color ?? colors.text,
                        marginLeft: (token.pos === "PUNCT" ? -2 : 0)
                    },
                    (textStyle && textStyle)
                ]}
            >
                {token.text}
            </Text>

        </TouchableOpacity>
    )
}

export default NLPWord

const styles = StyleSheet.create({
    mainText: {
        fontSize: 20,
        fontWeight: "800",
    },
    wordWrapper: {
        position: "relative",
        marginRight: 6,
        borderBottomWidth: 1,
        borderStyle: "dashed",
        borderBottomColor: "#1B7CF5",
        marginBottom: 10,
    },
});