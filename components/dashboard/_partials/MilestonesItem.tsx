import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SIZES from '@/constants/size';
import { getCardContainerWidth } from '@/utils';
import { useTheme } from '@/theme/ThemeContext';
import { MilestonesGrdCardBgLight } from '@/utils/SVGImages';

interface MilestonesItemProps {
    title: string;
    isLocked: boolean;
    milestones: number;
    icon: React.ReactNode;
}

const MilestonesItem = ({title, isLocked, milestones, icon}: MilestonesItemProps) => {
    const {colors} = useTheme();
    return (
        <View style={[styles.container, {opacity: isLocked ? 0.35 : 1}]}>
                
            <View style={[styles.icon, {backgroundColor: colors.profileCardImgBgClr}]}>
                {icon}
            </View>

            <View style={[styles.content, {backgroundColor: colors.profileCardBg}]}>

                {/* Background Image */}
                <View style={styles.bgImg}>
                    <MilestonesGrdCardBgLight />
                </View>

                <Text style={[styles.milestones, {color: colors.text}]}>{milestones}</Text>
                <Text style={[styles.subTitle, {color: colors.text}]}>Streak</Text>
            </View>

        </View>
    );
}

export default MilestonesItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        height: 64,
        minWidth: getCardContainerWidth() - (SIZES.cardGap/2),
    },
    icon: {
        borderTopStartRadius: 12,
        borderBottomStartRadius: 12
    },
    content: {
        flex: 1,
        width: "60%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        position: "relative",
        overflow: 'hidden',
        borderTopEndRadius: 12,
        borderBottomEndRadius: 12
    },
    bgImg: {
        position: "absolute",
        bottom: 0,
        right: 0
    },
    milestones: {
        fontSize: 16,
        fontWeight: "800"
    },
    subTitle: {
        fontSize: 14,
        fontWeight: "400"
    },
})