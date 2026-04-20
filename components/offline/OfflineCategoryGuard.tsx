/**
 * OfflineCategoryGuard
 *
 * Shown on the home/category-list screen when categories fail to load.
 *
 * Two cases:
 *   A) Device is offline — categories haven't been cached yet.
 *   B) Device is online but the fetch failed (server error, timeout, etc.)
 *
 * If categories ARE cached locally, this guard is never shown — the screen
 * renders from cache and syncs in the background when connectivity returns.
 *
 * USAGE
 * ──────
 *   if (isLoading) return <LoadingScreenComponent />;
 *   if (error || !categories.length) {
 *       return <OfflineCategoryGuard reason={error ? "fetch_failed" : "no_data"} />;
 *   }
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { useNetwork } from "@/context/NetworkContext";
import LangphyText from "@/components/text-components/LangphyText";
import ActionPrimaryButton from "@/components/form-components/ActionPrimaryButton";
import { ms, vs, rs } from "@/utils/responsive";

export type CategoryGuardReason =
    | "fetch_failed"   // fetch was attempted but failed (offline or server error)
    | "no_data";       // fetch succeeded but returned empty (no categories configured)

interface OfflineCategoryGuardProps {
    reason: CategoryGuardReason;
    onRetry?: () => void; // pass your refetch() from useQuery
}

const OfflineCategoryGuard: React.FC<OfflineCategoryGuardProps> = ({ reason, onRetry }) => {
    const { colors } = useTheme();
    const { isOnline } = useNetwork();

    const isNoData = reason === "no_data";

    const emoji   = isNoData ? "📭" : isOnline ? "⚠️" : "📡";
    const heading = isNoData
        ? "No categories available yet"
        : isOnline
            ? "Couldn't load categories"
            : "You're offline";
    const body = isNoData
        ? "There are no learning categories set up yet. Check back soon — content is added regularly."
        : isOnline
            ? "Something went wrong loading your categories. Please check your connection and try again."
            : "Categories haven't been downloaded to this device yet. Connect to the internet once to load them — after that they'll be available offline.";

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>

            <LangphyText style={styles.emoji}>{emoji}</LangphyText>

            <LangphyText weight="bold" style={[styles.heading, { color: colors.text }]}>
                {heading}
            </LangphyText>

            <LangphyText style={[styles.body, { color: colors.text }]}>
                {body}
            </LangphyText>

            {onRetry && !isNoData && (
                <ActionPrimaryButton
                    buttonTitle={isOnline ? "Try Again" : "Retry"}
                    onSubmit={onRetry}
                    buttonStyle={styles.button}
                />
            )}

        </View>
    );
};

export default OfflineCategoryGuard;

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
    button: {
        marginTop: vs(4),
        width: "100%",
    },
});
