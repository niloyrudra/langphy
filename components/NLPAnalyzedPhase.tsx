import { StyleSheet, View, Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle, findNodeHandle, UIManager } from 'react-native'
import React from 'react'
// import type { Component } from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { speechHandler } from '@/utils';
import { MeasureCallback, NlpData, Token, ToolTip } from '@/types';

interface ToolTipProps {
    phrase: string;
    onHandler: (value: ToolTip | ((prev: ToolTip) => ToolTip)) => void;
    wordRefs: React.RefObject<Map<string, any>>;
    containerRef: React.RefObject<View | null>;
    screenRef: React.RefObject<View | null>;
    textContainerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

type WordLayout = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const NLPAnalyzedPhase: React.FC<ToolTipProps> = ({phrase, onHandler, wordRefs, containerRef, screenRef, textStyle, textContainerStyle}) => {
    const { colors } = useTheme();
    const [ nlpTokens, setNlpTokens ] = React.useState<Token[] | null>([]);
    const [ loading, setLoading ] = React.useState<boolean>(false);

    const wordLayouts = React.useRef<Map<string, WordLayout>>(new Map());


    const measureInWindowSafe = (
        ref: unknown,
        callback: MeasureCallback
    ) => {
        if (!ref) return;

        // If it's already a native handle (number)
        if (typeof ref === "number") {
            UIManager.measureInWindow(ref, callback);
            return;
        }

        // If it's a ref object with a native node
        const handle = findNodeHandle(ref as any);
        if (handle) {
            UIManager.measureInWindow(handle, callback);
        }
    };

    // const measureInWindowSafe = (
    //     refNode: any, //Component | number | null,
    //     cb: MeasureCallback
    // ) => {
    //     if (!refNode) return;

    //     if (typeof refNode.measureInWindow === "function") {
    //         refNode.measureInWindow(cb);
    //         return;
    //     }

    //     const handle = findNodeHandle(refNode);
    //     if (!handle) return;

    //     UIManager.measureInWindow(handle, cb);
    // };

    React.useEffect(() => {
        const nlpHandler = async ( phrase: string ) => {
            const data: NlpData = { text: phrase ?? "" };
            setLoading(true);
            try {
                const res = await fetch(
                    `${process.env.EXPO_PUBLIC_API_BASE}/nlp/analyze/lesson`,
                    {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    }
                );
                
                if (!res.ok) {
                    const errText = await res.text();
                    console.error("NLP request failed:", errText);
                    return;
                }
                
                const nlpPhrase = await res.json();

                if( nlpPhrase?.tokens.length ) setNlpTokens( prv => prv = nlpPhrase.tokens )
                else setNlpTokens(null)
                
                setLoading(false);
            }
            catch(err) {
                console.error(err)
                setLoading(false);
            }
        }

        if( phrase ) nlpHandler(phrase);

    }, [phrase]);

    if( loading ) return (<View style={{marginBottom: 20}}><Text style={{color: colors.text, fontSize: 20}} >... ...</Text></View>);

    return (
        <>
            <View
                style={[
                    {
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "flex-end",
                        justifyContent: "flex-start",
                        gap: 2
                    },
                    (textContainerStyle && textContainerStyle)
                ]}
            >
                {
                    nlpTokens?.length && nlpTokens.map( (token: Token, idx: number) => {
                        let translationEn = token?.meaning_en ? token?.meaning_en?.replace(/^,\s*/, "") : "";
                        // const tapHandler = (e: any) => {
                        //     e.stopPropagation?.();
                            
                        //     speechHandler( token.text, "de-DE" );
                        //     const mapKey = `${idx}`;
                        //     const node = wordRefs.current.get(mapKey);
                        //     if (!node) return;
                        //     // Safer measure method
                        //     const measureInWindowSafe = (
                        //         refNode: any,
                        //         cb: (
                        //             x: number,
                        //             y: number,
                        //             w: number,
                        //             h: number
                        //         ) => void
                        //     ) => {
                        //         if( !refNode ) return;

                        //         if( typeof refNode.measureInWindow === "function" ) {
                        //             refNode.measureInWindow( cb );
                        //             return;
                        //         }

                        //         const handle = findNodeHandle( refNode );
                        //         if( !handle ) return;

                        //         UIManager.measureInWindow(handle, cb);
                        //     };

                        //     // Measure word
                        //     measureInWindowSafe( node, ( wordX, wordY, wordW, wordH ) => {
                        //         const containerNode = containerRef.current;

                        //         // Fallback: Position in window
                        //         if( !containerNode ) {
                        //             onHandler({
                        //                 visible: true,
                        //                 x: wordX,
                        //                 y: wordY + wordH + 4,
                        //                 translation: token.meaning_en || "",
                        //                 color: token.color ?? colors.text
                        //             });
                        //             return;
                        //         }

                        //         // Measure container to get relative coords
                        //         measureInWindowSafe(
                        //             containerNode,
                        //             (contX, contY) => {
                        //                 const gap = 6;
                        //                 const relativeTop = wordY - contY + wordH + gap;

                        //                 onHandler({
                        //                     visible: true,
                        //                     x: Math.max( 6, wordX - contX ),
                        //                     y: relativeTop,
                        //                     translation: token.meaning_en || "",
                        //                     color: token.color ?? colors.text
                        //                 });
                        //             }
                        //         );
                        //     });
                        // }

                        const actionHandler = (e: any) => {
                            e.stopPropagation?.();

                            speechHandler(token.text, "de-DE");

                            const node = wordRefs.current.get(`${idx}`);
                            if (!node) return;
                            const gap = 30;
                            measureInWindowSafe(node, (wordX, wordY, wordW, wordH) => {
                                // const containerNode = findNodeHandle(containerRef.current);
                                const containerNode = findNodeHandle(screenRef.current);

                                if (!containerNode) {
                                    onHandler({
                                        visible: true,
                                        x: wordX,
                                        y: wordY + wordH + gap,
                                        translation: token.meaning_en || "",
                                        color: token.color ?? colors.textDark,
                                    });
                                    return;
                                }

                                measureInWindowSafe(containerNode, (contX, contY) => {
                                    
                                    onHandler({
                                        visible: true,
                                        x: Math.max(6, wordX - contX),
                                        y: wordY - contY + wordH + gap,
                                        translation: translationEn || "... ... ...",
                                        color: token.color ?? colors.textDark,
                                    });
                                });
                            });
                        }

                        return (
                            <TouchableOpacity
                                key={idx.toString()}
                                ref={(r) => {
                                    const mapKey = idx.toString();
                                    if( r ) {
                                        const handle = findNodeHandle(r);
                                        wordRefs.current.set( mapKey, handle );
                                    }
                                    else wordRefs.current.delete( mapKey );
                                }}
                                onLayout={(e) => {
                                    const { x, y, width, height } = e.nativeEvent.layout
                                    wordLayouts.current.set(idx.toString(), { x, y, width, height });

                                }}
                                onPress={(e) => {
                                    // console.log(wordLayouts.current.forEach(item => item))
                                    // console.log(wordLayouts.current)
                                    actionHandler(e)
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
                    )})
                }
            </View>
        </>
    )
}

export default NLPAnalyzedPhase;

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