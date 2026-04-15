import { StyleSheet, View } from 'react-native'
import React from 'react'
import Title from '../Title';
import MilestoneScreenRouter from './_partials/MilestoneScreenRouter';
import MilestonesItem from './_partials/MilestonesItem';
import { MilestonesType } from '@/types';
import SIZES from '@/constants/size';
import { useStreak } from '@/hooks/useStreaks';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { milestonesData } from '@/static-data/static-data';

const Milestones = ({title}: {title:string}) => {
    const userId = authSnapshot.getUserId() ?? null;
    const {data: streak} = useStreak( userId as string );
    return (
        <View>
            <View style={styles.titleContainer}>
              <Title title={title} contentStyle={styles.title} />
              <MilestoneScreenRouter title="View All" />
            </View>
            
            {/* Milestones Items */}
            <View style={styles.milestonesContainer}>
              {
                milestonesData.filter( item => item.isFeatured ).map( (item: MilestonesType) => (
                    <MilestonesItem
                        key={item.id.toString()}
                        title={item.title}
                        milestones={item.milestones}
                        isLocked={(streak?.current_streak ?? 0) < item.milestones ? true : false}
                        icon={item.icon}
                    />
                ))
              }
            </View>

        </View>
    );
}

export default Milestones;

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: "600"
    },
    milestonesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: SIZES.cardGap,
        marginTop: 10
    }
});