import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'
import LangphyText from '@/components/text-components/LangphyText';
import SIZES from '@/constants/size';

interface StatsCardProps {
    title: string;
    IconComponent: React.ReactNode;
    statsValue: string | number;
    statsUnit?: string;
    feedbackText?: string;
    containerStyle?: StyleProp<ViewStyle>;
}

const StatsCard = ({title, IconComponent, statsValue, statsUnit, feedbackText, containerStyle}: StatsCardProps) => {
    return (
        <View style={[styles.container, (containerStyle && containerStyle)]}>
            <LangphyText style={styles.title}>{title}</LangphyText>
            <View style={styles.icon}>
                {IconComponent}
            </View>
            <LangphyText weight="semibold" style={styles.statsVal}>{statsValue}</LangphyText>
            {statsUnit && <LangphyText style={styles.info}>{statsUnit}</LangphyText>}
            {feedbackText && <LangphyText style={styles.info}>{feedbackText}</LangphyText>}
        </View>
    )
}

export default StatsCard;

const styles = StyleSheet.create({
    container: {
        // flex:1,
        width: (SIZES.screenWidth/2.25) - (SIZES.bodyPaddingHorizontal*2) - SIZES.cardGap,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: "#68F0F8",
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 12, // 16
        paddingVertical: 8,
        backgroundColor: "#12121233"
    },
    icon: {
        marginVertical: 5, //8,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {fontSize: 12, color: '#EEF8FF'},
    statsVal: {fontSize: 14, fontWeight: "600", color: '#68F0F8'},
    info: {fontSize: 8, color: '#ECFFFF'}
});