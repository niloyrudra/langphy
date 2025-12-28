import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native'
import React from 'react'
// import type { Component } from 'react'
import { useTheme } from '@/theme/ThemeContext';
// import { speechHandler } from '@/utils';
import { NlpData, Token, ToolTip } from '@/types';
import NLPWord from './NLPWord';

interface ToolTipProps {
    phrase: string;
    onHandler: (value: ToolTip | ((prev: ToolTip) => ToolTip)) => void;
    wordRefs: React.RefObject<Map<string, any>>;
    containerRef: React.RefObject<View | null>;
    screenRef: React.RefObject<View | null>;
    textContainerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const NLPAnalyzedPhase: React.FC<ToolTipProps> = ({phrase, onHandler, wordRefs, containerRef, screenRef, textStyle, textContainerStyle}) => {
    const { colors } = useTheme();
    const [ nlpTokens, setNlpTokens ] = React.useState<Token[] | null>([]);
    const [ loading, setLoading ] = React.useState<boolean>(false);
    
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
                    nlpTokens?.length && nlpTokens.map( (token: Token, idx: number) => (
                        <NLPWord
                            key={idx?.toString()}
                            token={token}
                            onHandler={onHandler}
                            wordRefs={wordRefs}
                            containerRef={containerRef}
                            screenRef={screenRef}
                        />
                    ))
                }
            </View>
        </>
    )
}

export default NLPAnalyzedPhase;

