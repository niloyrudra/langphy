import { findNodeHandle, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { measureInWindowSafe, speechHandler } from '@/utils'
import { Token, ToolTip, WordLayout } from '@/types';
import { useTheme } from '@/theme/ThemeContext';
// import LangphyText from '../text-components/LangphyText';

// interface WordProps {
//     idx: string,
//     token: Token,
//     onHandler: (value: ToolTip | ((prev: ToolTip) => ToolTip)) => void;
//     wordRefs: React.RefObject<Map<string, any>>;
//     containerRef?: React.RefObject<View | null>;
//     screenRef?: React.RefObject<View | null>;
//     textStyle?: StyleProp<TextStyle>
// }

interface WordProps {
    idx: string;
    token: Token;
    onHandler: (value: ToolTip | ((prev: ToolTip) => ToolTip)) => void;
    wordRefs: React.RefObject<Map<string, any>>;
    containerRef?: React.RefObject<View | null>;
    // nlpContainerRef?: React.RefObject<View | null>; // ← add, remove screenRef
    measureNlpContainer: (callback: (x: number, y: number) => void) => void; // ✅
    textStyle?: StyleProp<TextStyle>;
}

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
        if (!layoutData) return;
        if (!containerRef?.current) return;

        const gap = 10;

        measureNlpContainer((nlpX, nlpY) => {
            containerRef.current!.measureInWindow((contX, contY, contW) => {
                // const relativeLeft = (nlpX - contX) + layoutData.x;
                // const relativeTop  = (nlpY - contY) + layoutData.y + layoutData.height + gap;

                // How far NLPAnalyzedPhase is from containerRef left edge
                const nlpOffsetX = nlpX - contX;

                // Word's x within NLPAnalyzedPhase
                const rawLeft = nlpOffsetX + layoutData.x;

                // Get tooltip width (approximate — adjust if you know the real value)
                const TOOLTIP_WIDTH = 80;

                // Clamp so tooltip never goes beyond container right edge
                const relativeLeft = Math.min(
                    rawLeft,
                    contW - TOOLTIP_WIDTH
                );

                // Keep it from going off left edge too
                const clampedLeft = Math.max(0, relativeLeft);

                const relativeTop = (nlpY - contY) + layoutData.y + layoutData.height + gap;


                console.log("📍 position:", { clampedLeft, relativeTop, nlpX, nlpY, contX, contY, layoutData });

                onHandler({
                    visible: true,
                    x: clampedLeft, // relativeLeft,
                    y: relativeTop,
                    token,
                });
            });
        });
    };

    // const actionHandler = (e: any) => {
    //     e.stopPropagation?.();
    //     speechHandler(token.text, "de-DE");

    //     const layoutData = wordLayouts.current.get(idx);
    //     if (!layoutData) return;
    //     if (!containerRef?.current) return;
    //     if (!nlpContainerRef?.current) return;

    //     const gap = 10;

    //     // Measure where NLPAnalyzedPhase sits relative to containerRef
    //     nlpContainerRef.current.measureInWindow((nlpX, nlpY) => {
    //         containerRef.current!.measureInWindow((contX, contY) => {
    //             // nlpX - contX = how far NLPAnalyzedPhase is from containerRef's left edge
    //             // layoutData.x = word's x within NLPAnalyzedPhase
    //             const relativeLeft = (nlpX - contX) + layoutData.x;

    //             // nlpY - contY = how far NLPAnalyzedPhase is from containerRef's top
    //             // layoutData.y = word's y within NLPAnalyzedPhase (for wrapped lines!)
    //             // layoutData.height = word height
    //             const relativeTop = (nlpY - contY) + layoutData.y + layoutData.height + gap;

    //             onHandler({
    //                 visible: true,
    //                 x: relativeLeft,
    //                 y: relativeTop,
    //                 token,
    //             });
    //         });
    //     });
    // };

    // const actionHandler = (e: any) => {
    //     e.stopPropagation?.();
    //     speechHandler(token.text, "de-DE");

    //     const node = wordRefs.current.get(idx);
    //     if (!node) return;

    //     const layoutData = wordLayouts.current.get(idx);
    //     if (!layoutData) return;

    //     if (!containerRef?.current) return;

    //     const gap = 10;

    //     // Use measureInWindow only for Y (not affected by horizontal scroll)
    //     measureInWindowSafe(node, (wordX, wordY, wordW, wordH) => {
    //         containerRef.current!.measureInWindow((contX, contY) => {

    //             console.log("layoutData:", layoutData);
    //             console.log("containerRef measured:", { contX, contY });
    //             console.log("word measureInWindow:", { wordX, wordY });
    //             // What's the difference?
    //             console.log("X via measureInWindow:", wordX - contX);
    //             console.log("X via layoutData:", layoutData?.x);

    //             // ✅ X: use onLayout's x (relative to NLPAnalyzedPhase container)
    //             //    This is NOT affected by FlatList horizontal scroll offset
    //             const relativeLeft = layoutData.x;

    //             // ✅ Y: measureInWindow is fine for vertical
    //             const relativeTop = wordY - contY + wordH + gap;

    //             console.log("📍 Fixed position:", { relativeLeft, relativeTop });

    //             onHandler({
    //                 visible: true,
    //                 x: relativeLeft,
    //                 y: relativeTop,
    //                 token,
    //             });
    //         });
    //     });
    // };

    // const actionHandler = (e: any) => {
    //     e.stopPropagation?.();
    //     speechHandler(token.text, "de-DE");

    //     const node = wordRefs.current.get(idx);
        
    //     // --- DIAGNOSTICS ---
    //     console.log("=== TOOLTIP DEBUG ===");
    //     console.log("node (word handle):", node);
    //     console.log("containerRef.current:", containerRef?.current);
    //     console.log("screenRef.current:", screenRef?.current);
    //     // --------------------

    //     if (!node) { console.log("❌ No node found for idx:", idx); return; }

    //     measureInWindowSafe(node, (wordX, wordY, wordW, wordH) => {
    //         console.log("✅ Word measured:", { wordX, wordY, wordW, wordH });

    //         // Try containerRef directly
    //         if (containerRef?.current) {
    //             containerRef.current.measureInWindow((contX, contY, contW, contH) => {
    //                 console.log("✅ containerRef measured:", { contX, contY, contW, contH });
    //                 const relativeLeft = wordX - contX;
    //                 const relativeTop  = wordY - contY + wordH + 10;
    //                 console.log("📍 Tooltip position:", { relativeLeft, relativeTop });
    //                 onHandler({ visible: true, x: relativeLeft, y: relativeTop, token });
    //             });
    //         } else {
    //             console.log("❌ containerRef.current is null");
    //         }

    //         // Also try screenRef so we can compare
    //         if (screenRef?.current) {
    //             screenRef.current.measureInWindow((sX, sY) => {
    //                 console.log("📐 screenRef measured:", { sX, sY });
    //                 console.log("📐 screenRef-based position:", { x: wordX - sX, y: wordY - sY + wordH + 10 });
    //             });
    //         } else {
    //             console.log("❌ screenRef.current is null");
    //         }
    //     });
    // };

    // const actionHandler = (e: any) => {
    //     e.stopPropagation?.();
    //     speechHandler(token.text, "de-DE");

    //     const node = wordRefs.current.get(idx);
    //     if (!node) return;

    //     // Use containerRef (the tooltip's parent) as the coordinate origin
    //     // const containerNode = findNodeHandle(containerRef?.current ?? null);
    //     // if (!containerNode) return;

    //     measureInWindowSafe(node, (wordX, wordY, wordW, wordH) => {
    //         if (!containerRef?.current) return;
    //         // Measure containerRef directly — NOT via findNodeHandle
    //         containerRef.current.measureInWindow((contX, contY) => {
    //             const gap = 10;
    //             const relativeLeft = wordX - contX;
    //             const relativeTop  = wordY - contY + wordH + gap;

    //             onHandler({
    //                 visible: true,
    //                 x: relativeLeft,
    //                 y: relativeTop,
    //                 token: token,
    //             });
    //         });
    //         // const containerNode = findNodeHandle(screenRef.current);
    //         // const gap = 30;

    //         // if (!containerNode) return;

    //         // measureInWindowSafe(containerNode, (contX, contY) => {
    //         //     // const data = wordLayouts.current.get(idx)
    //         //     // const relativeLeft = data?.x ?? wordX - contX; // Math.max(6, wordX - contX),
    //         //     // const relativeTop = data?.y ? wordY - contY + wordH + gap + data?.y : wordY - contY + wordH + gap;
    //         //     const gap = 10;
    //         //     const relativeLeft = wordX - contX;
    //         //     const relativeTop = wordY - contY + wordH + gap;
    //         //     onHandler({
    //         //         visible: true,
    //         //         x: relativeLeft,
    //         //         y: relativeTop,
    //         //         token: token
    //         //     });
    //         // });
    //     });
    // }

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
                        marginLeft: (token.pos === "PUNCT" ? -6 : 0)
                    },
                    (textStyle && textStyle)
                ]}
            >
                {token.text}
            </Text>
            {/* <LangphyText
                weight="extrabold"
                style={[
                    styles.mainText,
                    {
                        color: token.color ?? colors.text,
                        marginLeft: (token.pos === "PUNCT" ? -6 : 0)
                    },
                    (textStyle && textStyle)
                ]}
            >
                {token.text}
            </LangphyText> */}

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