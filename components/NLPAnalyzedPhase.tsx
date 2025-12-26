import { StyleSheet, View, Text, ColorValue, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import SIZES from '@/constants/size';
import { speechHandler } from '@/utils';

type NlpData = {
  text: string;
};

type Token = {
    text: string;
    lemma: string | null;
    pos: string | null;
    tag: string | null;
    dep: string | null;
    is_stop: boolean;
    case: string | null;
    gender: string | null;
    number: string | null;
    meaning_en: string | null;
    default_article: string | null;
    pronunciation: { difficulty: number, flags: string | string[] };
    display: string | null;
    color: ColorValue | null;
}

const NLPAnalyzedPhase = ({phrase}: {phrase: string | null}) => {
    const { colors } = useTheme();
    const [nlpTokens, setNlpTokens] = React.useState<Token[] | null>([]);
    const [ loading, setLoading ] = React.useState<boolean>(false);
    const [ showToolTip, setShowToolTip ] = React.useState<boolean>(false);

    React.useEffect(() => {
        const nlpHandler = async ( phrase: string ) => {
            const data: NlpData = {
                text: phrase ?? ""
            };
            try {
                const res = await fetch(
                `${process.env.EXPO_PUBLIC_API_BASE}/nlp/analyze/lesson`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                    // body: data
                },
                );
                
                if (!res.ok) {
                    const errText = await res.text();
                    console.error("NLP request failed:", errText);
                    return;
                }
                
                const nlpPhrase = await res.json();

                if( nlpPhrase?.tokens.length ) setNlpTokens( prv => prv = nlpPhrase.tokens )
                else setNlpTokens(null)

                // console.log( "nlpPhrase", nlpPhrase )
            }
            catch(err) {
                console.error(err)
            }
        }
        if( phrase ) nlpHandler(phrase);
    }, [phrase]);

    return (
        <>
            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                    gap: 6
                }}
            >
                {
                    nlpTokens?.length && nlpTokens.map( (token: Token, idx: number) => {
                        // let isToolTipOpen = false
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    // isToolTipOpen = true
                                    speechHandler(
                                        token.text,
                                        "de-DE"
                                    );
                                    setShowToolTip( prevVal => !prevVal )
                                }}
                                style={styles.wordWrapper}
                            >
                                <Text key={idx.toString()} style={{ color: token.color ?? colors.text, fontSize: 20, fontWeight: "800", marginLeft: (token.pos === "PUNCT" ? -6 : 0) }}>{token.text}</Text>
                                {
                                    showToolTip && (
                                        <View
                                            style={{
                                                position: "absolute",
                                                top: 20,
                                                backgroundColor: colors.primary_950_50,
                                                padding: 10,
                                                borderRadius: 10,
                                                flexWrap: "wrap",
                                                zIndex: 9
                                            }}
                                        >
                                            {token?.meaning_en?.split(", ").map((item: string, idx: number) => item && (
                                                <Text
                                                    key={idx.toString()}
                                                    style={{
                                                        color: colors.text,
                                                        textTransform: "capitalize"
                                                    }}
                                                >
                                                    {item}
                                                </Text>
                                            ))}
                                            <Text style={{color: colors.text}}>{token.default_article} {token.lemma}</Text>

                                            {token.pronunciation?.difficulty > 0 && (
                                                <Text style={{color: "orange"}}>
                                                    Pronunciation warning
                                                </Text>
                                            )}
                    
                                        </View>
                                    )
                                }
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
        fontWeight: "700",
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