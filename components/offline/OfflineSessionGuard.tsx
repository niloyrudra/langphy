/**
 * OfflineSessionGuard
 *
 * Shown instead of a session screen when:
 *   A) The device is offline AND there is no local cache for this unit/type
 *   B) The session type requires a live service (NLP / speech) and device is offline
 *
 * Does NOT block sessions where cached data is available — the user can always
 * continue with already-downloaded units even without a connection.
 *
 * USAGE — wrap the screen's content, not the whole screen:
 *
 *   if (isLoading || isFetching) return <LoadingScreenComponent />;
 *   if (error || !lessonData.length) {
 *       return (
 *           <OfflineSessionGuard
 *               sessionType={slug as SessionType}
 *               reason={error instanceof OfflineCacheMissError ? "no_cache" : "unknown"}
 *           />
 *       );
 *   }
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { useNetwork } from "@/context/NetworkContext";
import { SessionType } from "@/types";
import LangphyText from "@/components/text-components/LangphyText";
import ActionPrimaryButton from "@/components/form-components/ActionPrimaryButton";
import { ms, vs, rs } from "@/utils/responsive";
import { router } from "expo-router";

// Which session types have hard dependencies on live backend services
const REQUIRES_NLP     = new Set<SessionType>(["listening", "writing", "practice", "reading", "speaking"]);
const REQUIRES_SPEECH  = new Set<SessionType>(["speaking"]);

type GuardReason = "no_cache" | "unknown";

interface OfflineSessionGuardProps {
    sessionType: SessionType;
    reason: GuardReason;
    onRetry?: () => void;
}

function buildMessages(sessionType: SessionType, isOnline: boolean, reason: GuardReason) {
    if (reason === "no_cache" || !isOnline) {
        // Unit has never been downloaded
        const needsSpeech = REQUIRES_SPEECH.has(sessionType);
        const needsNlp    = REQUIRES_NLP.has(sessionType);

        if (sessionType === "quiz") {
            return {
                emoji:    "📶",
                heading:  "Connect to download this unit",
                body:     "Quiz lessons haven't been downloaded yet. Connect to the internet once to cache them — after that you can practice offline anytime.",
            };
        }
        if (needsSpeech) {
            return {
                emoji:    "🎙️",
                heading:  "Internet required for Speaking",
                body:     "Speaking sessions use live speech recognition and language analysis. They always need a connection — please connect and try again.",
            };
        }
        if (needsNlp) {
            return {
                emoji:    "📶",
                heading:  "Connect to download this unit",
                body:     "This unit's lessons haven't been downloaded yet. Connect once to cache them — after that, word tooltips will work offline too.",
            };
        }
    }

    // Fallback for unexpected empty states online
    return {
        emoji:    "📭",
        heading:  "No lessons found",
        body:     "This unit doesn't have any lessons yet, or something went wrong loading them. Try going back and opening the unit again.",
    };
}

function buildOnlineWarning(sessionType: SessionType): string | null {
    if (REQUIRES_SPEECH.has(sessionType)) {
        return "Note: Speech analysis needs a stable connection. If your network drops mid-session, your score won't be processed until you reconnect.";
    }
    if (REQUIRES_NLP.has(sessionType)) {
        return "Note: Word analysis (tooltips) needs a connection. If you go offline mid-session, words will still be shown but tap-to-analyze won't be available.";
    }
    return null;
}

const OfflineSessionGuard: React.FC<OfflineSessionGuardProps> = ({ sessionType, reason, onRetry, }) => {
    const { colors } = useTheme();
    const { isOnline } = useNetwork();

    const { emoji, heading, body } = buildMessages(sessionType, isOnline, reason);
    const onlineWarning = isOnline ? buildOnlineWarning(sessionType) : null;
    const isNoData = reason === "no_cache";

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <LangphyText style={styles.emoji}>{emoji}</LangphyText>

            <LangphyText
                weight="bold"
                style={[styles.heading, { color: colors.text }]}
            >
                {heading}
            </LangphyText>

            <LangphyText
                style={[styles.body, { color: colors.text }]}
            >
                {body}
            </LangphyText>

            {onlineWarning && (
                <View style={[styles.warningBox, { borderColor: colors.primary }]}>
                    <LangphyText style={[styles.warningText, { color: colors.text }]}>
                        {onlineWarning}
                    </LangphyText>
                </View>
            )}

            <View style={styles.actions}>
                {/* {isOnline && onRetry && ( */}
                {onRetry && !isNoData && (
                    <ActionPrimaryButton
                        buttonTitle={isOnline ? "Try Again" : "Retry"}
                        onSubmit={onRetry}
                        buttonStyle={styles.button}
                    />
                )}
                <ActionPrimaryButton
                    buttonTitle="Go Back"
                    onSubmit={() => router.back()}
                    buttonStyle={styles.button}
                />
            </View>
        </View>
    );
};

export default OfflineSessionGuard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: rs(28),
        gap: vs(16),
    },
    emoji: {
        fontSize: ms(52),
        textAlign: "center",
        marginBottom: vs(4),
    },
    heading: {
        fontSize: ms(20, 0.4),
        textAlign: "center",
    },
    body: {
        fontSize: ms(14),
        textAlign: "center",
        lineHeight: ms(22),
        opacity: 0.8,
    },
    warningBox: {
        marginTop: vs(8),
        padding: rs(14),
        borderRadius: rs(10),
        borderWidth: 1,
        opacity: 0.7,
        width: "100%",
    },
    warningText: {
        fontSize: ms(12),
        textAlign: "center",
        lineHeight: ms(18),
    },
    actions: {
        width: "100%",
        gap: vs(10),
        marginTop: vs(4),
    },
    button: {
        width: "100%",
    },
    secondaryButton: {
        opacity: 0.6,
    },
});
