import { View, StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { NlpData, Token, ToolTip } from '@/types';
import NLPWord from './NLPWord';
import LangphyText from '../text-components/LangphyText';

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
    const [ nlpTokens, setNlpTokens ] = React.useState<Token[]>([]);
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
                else setNlpTokens([])
                
                setLoading(false);
            }
            catch(err) {
                console.error(err)
                setLoading(false);
            }
        }

        if( phrase ) nlpHandler(phrase);

    }, [phrase]);

    if( loading ) return (
        <View style={styles.loader}>
            <LangphyText style={[styles.loaderContent, {color: colors.text}]}>... ...</LangphyText>
        </View>
    );

    return (
        <View
            style={[styles.container, (textContainerStyle && textContainerStyle)]}>
            {
                nlpTokens?.map( (token: Token, idx: number) => (
                    <NLPWord
                        key={idx?.toString()}
                        idx={idx?.toString()}
                        token={token}
                        onHandler={onHandler}
                        wordRefs={wordRefs}
                        containerRef={containerRef}
                        screenRef={screenRef}
                        textStyle={textStyle}
                    />
                ))
            }
        </View>
    );
}

export default NLPAnalyzedPhase;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        gap: 2
    },
    loader: {marginBottom: 20},
    loaderContent: {fontSize: 20}
});