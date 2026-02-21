import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'
import LangphyText from '@/components/text-components/LangphyText';

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
            <LangphyText weight="extrabold" style={styles.statsVal}>{statsValue}</LangphyText>
            {statsUnit && <LangphyText style={styles.info}>{statsUnit}</LangphyText>}
            {feedbackText && <LangphyText style={styles.info}>{feedbackText}</LangphyText>}
        </View>
    )
}

export default StatsCard;

const styles = StyleSheet.create({
    container: {
        flex:1,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#68F0F8",
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: "#12121233"
    },
    icon: {
        marginVertical: 8,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {fontSize: 14, color: '#EEF8FF'},
    statsVal: {fontSize: 16, color: '#68F0F8'},
    info: {fontSize: 12, color: '#ECFFFF'}
});