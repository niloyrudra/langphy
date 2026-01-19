import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { ProgressIcon, SteakIcon } from '@/utils/SVGImages';
import StatsDetail from './StatsDetail';
import { useStreaks } from '@/context/StreaksContext';

const ProfileStats = () => {
    const {colors} = useTheme();
    const { streaks } = useStreaks();
    return (
        <View style={[styles.container, {backgroundColor: colors.profileGradientBox}]}>
            <StatsDetail
                title="Progress"
                stats="50%"
                icon={<ProgressIcon width={24} height={24} />}
            />
            
            <View style={{width: 1, height: 36, backgroundColor: "#EDEDED"}} />

            <StatsDetail
                title="Streak"
                stats={streaks?.current ? streaks.current.toString() : "0"}
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
    }
});