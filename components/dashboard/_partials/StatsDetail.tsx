import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import LangphyText from '@/components/text-components/LangphyText';

interface StatsDetailProps {
    title: string;
    stats: string;
    icon: React.ReactNode;
}

const StatsDetail = ({title, stats, icon}: StatsDetailProps) => {
    const {colors} = useTheme();
    return (
        <View style={styles.content}>
            <View style={styles.item}>
                {icon}
                <LangphyText weight="extrabold" style={[styles.stats, {color: colors.text}]}>{stats}</LangphyText>
            </View>
            <LangphyText weight="semibold" style={[styles.title, {color: colors.text}]}>{title}</LangphyText>
        </View>
    );
}

export default StatsDetail;

const styles = StyleSheet.create({
    content: {
        flexDirection: "column",
        justifyContent:"center",
        alignItems: "center",
        gap: 5
    },
    item: {
        gap: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems:"center"
    },
    stats: {
        fontSize: 20,
        fontWeight: "800"
    },
    title: {
        fontSize: 14,
        fontWeight:"600",
        textAlign:"center"
    }
});