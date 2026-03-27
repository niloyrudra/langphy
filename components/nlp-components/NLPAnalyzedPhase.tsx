import { View, StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { NlpData, Token, ToolTip } from '@/types';
import NLPWord from './NLPWord';
import LangphyText from '../text-components/LangphyText';
import NetInfo from "@react-native-community/netinfo";
import { fetchNLPData } from '@/services/nlp.service';
// import WordAnalyzer from '../tooltip-components/_partials/WordAnalyzer';
// import { toast } from '@backpackapp-io/react-native-toast';
import { toastError } from '@/services/toast.service';

interface ToolTipProps {
    phrase: string;
    onHandler: (value: ToolTip | ((prev: ToolTip) => ToolTip)) => void;
    getTokens?: ( tokens: Token[], phrase: string) => void;
    wordRefs: React.RefObject<Map<string, any>>;
    containerRef: React.RefObject<View | null>;
    screenRef?: React.RefObject<View | null>;
    nlpContainerRef?: React.RefObject<View | null>; // ← add this
    textContainerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const NLPAnalyzedPhase: React.FC<ToolTipProps> = ({phrase, onHandler, getTokens, wordRefs, containerRef, textStyle, textContainerStyle}) => {
    const { colors } = useTheme();
    const [ isOnline, setIsOnline ] = React.useState<boolean>(true);
    const [ nlpTokens, setNlpTokens ] = React.useState<Token[]>([]);
    const [ loading, setLoading ] = React.useState<boolean>(false);

    const cacheRef = React.useRef<Map<string, Token[]>>(new Map());

    // ✅ owned here — guaranteed to attach
    const nlpContainerRef = React.useRef<View | null>(null);

    // ✅ stable callback passed to each NLPWord
    const measureNlpContainer = React.useCallback(
        (callback: (x: number, y: number) => void) => {
            nlpContainerRef.current?.measureInWindow((x, y) => callback(x, y));
        },
        []
    );

    React.useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOnline(!!state.isConnected);
        });

        return unsubscribe;
    }, []);

    const fallbackTokenizer = (phrase: string): Token[] => {
        return phrase.split(" ").map((word, idx) => ({
            id: `${idx}`,
            text: word,
            lemma: word || null,
            pos: "UNKNOWN",
            tag: null,
            dep: null,
            is_stop: true,
            case: null,
            gender: null,
            number: null,
            meaning_en: null,
            default_article: null,
            pronunciation: {
                difficulty: 0,
                flags: "",
            },
            display: null,
            color: null,
        }));
    };

    React.useEffect(() => {

        if(!isOnline) toastError( "Offline mode!" );

        const controller = new AbortController();

        const nlpHandler = async ( phrase: string ) => {
            const data: NlpData = { text: phrase ?? "" };
            setLoading(true);

            // ✅ 1. OFFLINE MODE
            if (!isOnline) {
                const cached = cacheRef.current.get(phrase);

                if (cached) {
                    setNlpTokens(cached);
                    getTokens?.(cached, phrase);
                } else {
                    const fallback = fallbackTokenizer(phrase);
                    setNlpTokens(fallback);
                    getTokens?.(fallback, phrase);
                }

                setLoading(false);
                return;
            }

            // ✅ 2. ONLINE MODE
            try {
                const res = await fetchNLPData(data, {
                    signal: controller.signal,
                });

                if( res?.status !== 200 ) {
                    const errText = res?.statusText;
                    console.error("NLP request failed:", errText);
                    return;
                }
                
                const nlpPhrase = res.data;

                // In NLPAnalyzedPhase, change the getTokens call:
                if (nlpPhrase?.tokens.length) {
                    setNlpTokens(nlpPhrase.tokens);
                    if (getTokens) getTokens(nlpPhrase.tokens, phrase);
                }
                else {
                    setNlpTokens([])
                }
                
            }
            catch(err: any) {
                if (err.name === "CanceledError") return; // ignore aborted requests
                console.error("NLPAnalyzedPhase error:", err)
                // setLoading(false);
            }
            finally {
                setLoading(false);
            }
        }

        if( phrase ) nlpHandler(phrase);

        return () => controller.abort(); // cleanup on unmount or phrase change

    }, [phrase]);

    if( loading && nlpTokens.length === 0 ) return (
        <View style={styles.loader}>
            <LangphyText style={[styles.loaderContent, {color: colors.text}]}>... ...</LangphyText>
        </View>
    );

    return (
        <View
            ref={nlpContainerRef}
            style={[styles.container, (textContainerStyle && textContainerStyle)]}
        >
            {
                nlpTokens?.map( (token: Token, idx: number) => (
                    <NLPWord
                        key={idx?.toString()}
                        idx={idx?.toString()}
                        token={token}
                        onHandler={onHandler}
                        wordRefs={wordRefs}
                        containerRef={containerRef}
                        measureNlpContainer={measureNlpContainer}
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