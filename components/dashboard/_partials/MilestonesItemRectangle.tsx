import { ImageSourcePropType, StyleSheet, View } from 'react-native'
import React from 'react'
import SIZES from '@/constants/size';
import { getCardContainerWidth } from '@/utils';
import { useTheme } from '@/theme/ThemeContext';
import { MilestonesCardBg, MilestonesGrdCardBgLight } from '@/utils/SVGImages';
import LangphyText from '@/components/text-components/LangphyText';
import AppImage from '@/components/AppImage';

interface MilestonesItemRectangleProps {
    title: string;
    description: string;
    isLocked: boolean;
    milestones: number;
    icon: ImageSourcePropType;
}

const MilestonesItemRectangle = ({title, description, isLocked, milestones, icon}: MilestonesItemRectangleProps) => {
    const {colors} = useTheme();
    return (
        <View style={[styles.container, {opacity: isLocked ? 0.35 : 1}]}>
                
            <View style={[styles.icon, {backgroundColor: colors.profileCardImgBgClr}]}>
                {
                    icon && (<AppImage source={icon} size={64} />)
                }
            </View>

            <View style={[styles.content, {backgroundColor: colors.profileCardBg}]}>

                {/* Background Image */}
                <View style={styles.bgImg}>
                    <MilestonesCardBg />
                </View>

                <LangphyText weight="extrabold" style={[styles.milestones, {color: colors.text}]}>{title} Streak</LangphyText>
                <LangphyText style={[styles.subTitle, {color: colors.text}]}>{description}</LangphyText>
            </View>

        </View>
    );
}

export default MilestonesItemRectangle;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        height: 80,
        // minWidth: getCardContainerWidth() - (SIZES.cardGap/2),
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
        alignItems: "flex-start",
        gap: 5,
        position: "relative",
        overflow: 'hidden',
        paddingHorizontal: 20,
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
        fontSize: 12,
        fontWeight: "400"
    },
})