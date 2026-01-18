import { StyleSheet, View } from 'react-native'
import React from 'react'
import { ProfileStreaks_3_Icon } from '@/utils/SVGImages';
import Title from '../Title';
import SIZES from '@/constants/size';
import MilestoneScreenRouter from './_partials/MilestoneScreenRouter';
import MilestonesItem from './_partials/MilestonesItem';

type Milestones = {
    id: number,
    milestonesTitle: string,
    isLocked: boolean;
    milestones: number,
    ImgComponent?: React.ReactNode
}

const milestonesData: Milestones[] = [
    {
        id: 1,
        milestonesTitle: "3 Day",
        isLocked: false,
        milestones: 3,
        ImgComponent: <ProfileStreaks_3_Icon />
    },
    {
        id: 2,
        milestonesTitle: "7 Day",
        isLocked: true,
        milestones: 7,
        ImgComponent: <ProfileStreaks_3_Icon />
    },
    {
        id: 3,
        milestonesTitle: "14 Day",
        isLocked: true,
        milestones: 14,
        ImgComponent: <ProfileStreaks_3_Icon />
    },
    {
        id: 4,
        milestonesTitle: "30 Day",
        isLocked: true,
        milestones: 30,
        ImgComponent: <ProfileStreaks_3_Icon />
    }
];

const Milestones = ({title}: {title:string}) => {
    return (
        <View>
            <View style={styles.titleContainer}>
              <Title title={title} contentStyle={{ fontSize: 20, fontWeight: "600" }} />
              <MilestoneScreenRouter title="View All" />
            </View>
            
            {/* Milestones Items */}
            <View style={styles.milestonesContainer}>
              {
                milestonesData.map( (item: Milestones) => (
                    <MilestonesItem
                        key={item.id.toString()}
                        title={item.milestonesTitle}
                        milestones={item.milestones}
                        isLocked={item.isLocked}
                        icon={item.ImgComponent}
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
    milestonesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: SIZES.cardGap,
        marginTop: 10
    }
});