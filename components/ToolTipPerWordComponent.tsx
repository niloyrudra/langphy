import {
    findNodeHandle,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
    UIManager,
} from "react-native";
import React from "react";
import { ToolTip, WordDataShape, WordRole } from "@/types";
import { color_legend, speechHandler, stripPunctuationHandler } from "@/utils";
import { useTheme } from "@/theme/ThemeContext";

interface ToolTipPerWordProps<T extends WordDataShape> {
    item: T;
    onHandler: (value: ToolTip | ((prev: ToolTip) => ToolTip)) => void;
    wordRefs: React.RefObject<Map<string, any>>;
    containerRef: React.RefObject<View | null>;
    textContainerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

function ToolTipPerWordComponent<T extends WordDataShape>({
    item,
    onHandler,
    wordRefs,
    containerRef,
    textContainerStyle,
    textStyle,
}: ToolTipPerWordProps<T>) {
    const { colors } = useTheme();

    return (
        <>
            {item.phrase?.split("/").map((content, idx) => {
                const wordArr = content.trim().split(" ");
                const roleArr = item.analysis?.roles;

                return (
                    <View
                        key={idx}
                        style={[
                            { flexDirection: "row", flexWrap: "wrap" },
                            textContainerStyle,
                        ]}
                    >
                        {wordArr.map((word, wIdx) => {
                            const cleanKey = stripPunctuationHandler(word)
                                .toLowerCase();

                            let role: string | undefined = "";
                            let translation: string | undefined = "";

                            if (roleArr?.length) {
                                const found = roleArr.find(
                                    (r: WordRole) =>
                                        stripPunctuationHandler(
                                            r.word
                                        ).toLowerCase() === cleanKey
                                );
                                role = found?.role;
                                translation = found?.translation;
                            } else {
                                translation = item.name || item.meaning;
                            }

                            const colorForWord =
                                (role &&
                                    color_legend[
                                        role as keyof typeof color_legend
                                    ]) ||
                                colors.textDark;

                            return (
                                <TouchableOpacity
                                    key={wIdx}
                                    ref={(r) => {
                                        const mapKey = `${idx}-${wIdx}`;
                                        if (r) {
                                            wordRefs.current.set(mapKey, r);
                                        } else {
                                            wordRefs.current.delete(mapKey);
                                        }
                                    }}
                                    style={styles.wordWrapper}
                                    onPress={() => {
                                        // speak word
                                        speechHandler(word, "de-DE");

                                        const mapKey = `${idx}-${wIdx}`;
                                        const node = wordRefs.current.get(mapKey);
                                        if (!node) return;

                                        // safer measure method
                                        const measureInWindowSafe = (
                                            refNode: any,
                                            cb: (
                                                x: number,
                                                y: number,
                                                w: number,
                                                h: number
                                            ) => void
                                        ) => {
                                            if (!refNode) return;

                                            if (typeof refNode.measureInWindow === "function") {
                                                refNode.measureInWindow(cb);
                                                return;
                                            }

                                            const handle = findNodeHandle(refNode);
                                            if (!handle) return;

                                            UIManager.measureInWindow(handle, cb);
                                        };

                                        // measure word
                                        measureInWindowSafe(node, (wordX, wordY, wordW, wordH) => {
                                            const containerNode =
                                                containerRef.current;

                                            // fallback: position in window
                                            if (!containerNode) {
                                                onHandler({
                                                    visible: true,
                                                    x: wordX,
                                                    y: wordY + wordH + 4,
                                                    translation: translation || "",
                                                    color: colorForWord,
                                                });
                                                return;
                                            }

                                            // measure container to get relative coords
                                            measureInWindowSafe(
                                                containerNode,
                                                (contX, contY) => {
                                                    const gap = 6;
                                                    const relativeTop =
                                                        wordY - contY + wordH + gap;

                                                    onHandler({
                                                        visible: true,
                                                        x: Math.max(6, wordX - contX),
                                                        y: relativeTop,
                                                        translation: translation || "",
                                                        color: colorForWord,
                                                    });
                                                }
                                            );
                                        });
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.mainText,
                                            { color: colorForWord },
                                            textStyle,
                                        ]}
                                    >
                                        {word}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                );
            })}
        </>
    );
}

export default ToolTipPerWordComponent;

const styles = StyleSheet.create({
    mainText: {
        fontSize: 20,
        fontWeight: "700",
    },
    wordWrapper: {
        marginRight: 6,
        borderBottomWidth: 1,
        borderStyle: "dashed",
        borderBottomColor: "#1B7CF5",
        marginBottom: 10,
    },
});
