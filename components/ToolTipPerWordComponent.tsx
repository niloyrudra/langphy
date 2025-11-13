import { findNodeHandle, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ToolTip, UnitIndividualCategory, UnitIndividualCategoryItem, WordRole } from '@/types'
import { color_legend, db, speechHandler, stripPunctuationHandler } from '@/utils'
import { useTheme } from '@/theme/ThemeContext'
// import { useLocalSearchParams } from 'expo-router'

interface ToolTipPerWordProps {
    item: UnitIndividualCategoryItem,
    onHandler: (value: ToolTip | ((prev: ToolTip) => ToolTip)) => void,
    wordRefs: React.RefObject<Map<string, any>>,
    containerRef: React.RefObject<View | null>,
}

const ToolTipPerWordComponent: React.FC<ToolTipPerWordProps> = ({item, onHandler, wordRefs, containerRef}) => {
    const { colors } = useTheme();

    // floating tooltip info
    // const [tooltip, setTooltip] = React.useState<ToolTip>({ visible: false, x: 0, y: 0, translation: '', color: colors.textDark });

    // const wordRefs = React.useRef<Map<string, any>>(new Map());
    // const containerRef = React.useRef<View | null>(null);

    return (
        <>
            {item?.phrase.split('/').map((content: string, idx: number) => {
                const wordArr = content?.trim()?.split(" ")
                const roleArr = item?.analysis?.roles
                return (
                    <View key={idx} style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }}>

                        {wordArr.map((word: string, wIdx: number) => {
                            const key = word.trim();
                            const cleanKey = stripPunctuationHandler(key).toLocaleLowerCase(); // Stripping Punctuation from the Splitted words before comparing
                            let role: string | undefined = ''
                            let translation: string | undefined = ''
                            if( roleArr?.length ) {
                                const roles = roleArr?.find((keyItem: WordRole) => stripPunctuationHandler(keyItem?.word).toLocaleLowerCase() === cleanKey );
                                role = roles?.role;
                                translation = roles?.translation;
                            }
                            else translation = item?.name || item?.meaning


                            const colorForWord = role && color_legend[role as keyof typeof color_legend] ? color_legend[role as keyof typeof color_legend] : colors.textDark;

                            return (
                                <TouchableOpacity
                                    key={wIdx}
                                    ref={(r) => {
                                        const mapKey = `${idx}-${wIdx}`;
                                        if (r) {
                                            wordRefs?.current.set(mapKey, r);
                                        } else {
                                            wordRefs?.current.delete(mapKey);
                                        }
                                    }}
                                    style={{
                                        marginRight: 6,
                                        borderBottomWidth: 1,
                                        borderStyle: "dashed",
                                        borderBottomColor: '#1B7CF5',
                                        marginBottom: 10,
                                    }}

                                    onPress={() => {
                                        speechHandler(key, "de-DE");

                                        const mapKey = `${idx}-${wIdx}`;
                                        const node = wordRefs?.current.get(mapKey);
                                        if (!node) return;

                                        // helper to call measureInWindow on a node ref (prefers instance method)
                                        const measureInWindowSafe = (refNode: any, cb: (x:number,y:number,w:number,h:number)=>void) => {
                                        if (!refNode) return;
                                        if (typeof refNode.measureInWindow === 'function') {
                                            // instance method (preferred, not deprecated in usage)
                                            (refNode as any).measureInWindow(cb);
                                            return;
                                        }
                                        // fallback for older RN versions: use findNodeHandle + UIManager.measureInWindow (may be deprecated in types)
                                        const handle = findNodeHandle(refNode);
                                        if (!handle) return;
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-ignore - using UIManager.measureInWindow fallback
                                        UIManager.measureInWindow(handle, cb);
                                        };

                                        // Measure the pressed word
                                        measureInWindowSafe(node, (wordX, wordY, wordW, wordH) => {
                                        // Measure the container to convert window coords -> container local coords
                                        const containerNode = containerRef.current;
                                        if (!containerNode) {
                                            // If container not available, fallback to using window coords directly
                                            onHandler({
                                                visible: true,
                                                x: wordX,
                                                y: wordY + wordH + 4,
                                                translation: translation || "",
                                                color: colorForWord,
                                            });
                                            return;
                                        }

                                        measureInWindowSafe(containerNode, (contX, contY, contW, contH) => {
                                            const gap = 6;
                                            const relativeTop = wordY - contY + wordH + gap;
                                            // Optionally shift left if tooltip would overflow later (not shown here)
                                            onHandler({
                                                visible: true,
                                                x: Math.max(6, wordX - contX), // keep at least 6px left padding in container
                                                y: relativeTop,
                                                translation: translation || "",
                                                color: colorForWord,
                                            });
                                        });
                                        });
                                    }}
                                >
                                    <Text style={[styles.mainText, { color: colorForWord }]}>{key}</Text>
                                </TouchableOpacity>
                            );
                        })}

                    </View>

                )}
            )}
        </>
    )
}

export default ToolTipPerWordComponent;

const styles = StyleSheet.create({
    mainText: {
        fontSize: 20,
        fontWeight: "700",
    },
})