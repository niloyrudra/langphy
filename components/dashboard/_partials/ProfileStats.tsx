import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { ProgressIcon, SteakIcon } from '@/utils/SVGImages';
import StatsDetail from './StatsDetail';
import { useStreak } from '@/hooks/useStreaks';

const ProfileStats = () => {
    const {colors} = useTheme();
    const { data: streaks } = useStreak();
    console.log("Streaks data in ProfileStats: ", streaks);
    return (
        <View style={[styles.container, {backgroundColor: colors.profileGradientBox}]}>
            <StatsDetail
                title="Progress"
                stats="50%"
                icon={<ProgressIcon width={24} height={24} />}
            />
            
            <View style={styles.divider} />

            <StatsDetail
                title="Streak"
                stats={streaks?.current_streak ? streaks.current_streak.toString() : "0"}
                icon={<SteakIcon width={24} height={24} />}
            />

        </View>
    );
}

export default ProfileStats;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent:"space-evenly",
        alignItems: "center"
    },
    divider: {
        width: 1,
        height: 36,
        backgroundColor: "#EDEDED"
    }
});