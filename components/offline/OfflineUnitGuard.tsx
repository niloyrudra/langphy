/**
 * OfflineUnitGuard
 *
 * Shown on the unit-list screen when units fail to load for a category.
 *
 * Always knows which category it belongs to (passed as prop) so the
 * message is specific: "Units for Beginner couldn't be loaded" rather
 * than a generic error.
 *
 * Two cases:
 *   A) Device is offline and units haven't been cached for this category.
 *   B) Device is online but the fetch failed.
 *
 * USAGE
 * ──────
 *   if (isLoading) return <LoadingScreenComponent />;
 *   if (error || !units.length) {
 *       return (
 *           <OfflineUnitGuard
 *               categoryTitle={categoryTitle}  // e.g. "Beginner"
 *               reason={error ? "fetch_failed" : "no_data"}
 *               onRetry={refetch}
 *           />
 *       );
 *   }
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { useNetwork } from "@/context/NetworkContext";
import LangphyText from "@/components/text-components/LangphyText";
import ActionPrimaryButton from "@/components/form-components/ActionPrimaryButton";
import { ms, vs, rs } from "@/utils/responsive";
import { router } from "expo-router";

export type UnitGuardReason =
    | "fetch_failed"   // fetch attempted but failed (offline or server error)
    | "no_data";       // fetch succeeded but returned 0 units for this category

interface OfflineUnitGuardProps {
    categoryTitle?: string;   // e.g. "Beginner" — shown in the message
    reason: UnitGuardReason;
    onRetry?: () => void;     // pass your refetch() from useQuery
}

const OfflineUnitGuard: React.FC<OfflineUnitGuardProps> = ({
    categoryTitle,
    reason,
    onRetry,
}) => {
    const { colors } = useTheme();
    const { isOnline } = useNetwork();

    const categoryLabel = categoryTitle ? `"${categoryTitle}"` : "this category";
    const isNoData = reason === "no_data";

    const emoji   = isNoData ? "📭" : isOnline ? "⚠️" : "📡";
    const heading = isNoData
        ? `No units in ${categoryLabel} yet`
        : isOnline
            ? `Couldn't load units for ${categoryLabel}`
            : `${categoryLabel} isn't available offline`;
    const body = isNoData
        ? `${categoryTitle ? `The "${categoryTitle}" category` : "This category"} doesn't have any units yet. Check back soon — content is added regularly.`
        : isOnline
            ? `We had trouble loading the units for ${categoryLabel}. Please check your connection and try again.`
            : `The units for ${categoryLabel} haven't been downloaded to this device yet. Connect to the internet once to load them — after that you can browse units offline.`;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>

            {/* Category context pill — shows which category the user is inside */}
            {categoryTitle && (
                <View style={[styles.categoryPill, { backgroundColor: colors.primary + "22", borderColor: colors.primary }]}>
                    <LangphyText style={[styles.categoryPillText, { color: colors.primary }]}>
                        {categoryTitle}
                    </LangphyText>
                </View>
            )}

            <LangphyText style={styles.emoji}>{emoji}</LangphyText>

            <LangphyText weight="bold" style={[styles.heading, { color: colors.text }]}>
                {heading}
            </LangphyText>

            <LangphyText style={[styles.body, { color: colors.text }]}>
                {body}
            </LangphyText>

            <View style={styles.actions}>
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
                    buttonStyle={[styles.button, styles.secondaryButton]}
                />
            </View>

        </View>
    );
};

export default OfflineUnitGuard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: rs(28),
        gap: vs(16),
    },
    categoryPill: {
        paddingHorizontal: rs(14),
        paddingVertical: vs(5),
        borderRadius: rs(20),
        borderWidth: 1,
        marginBottom: vs(4),
    },
    categoryPillText: {
        fontSize: ms(12),
        fontWeight: "600",
    },
    emoji: {
        fontSize: ms(48),
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
