import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

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
        <View
            style={[styles.container, (containerStyle && containerStyle)]}
        >
            <Text style={{fontSize: 14, color: '#EEF8FF'}}>{title}</Text>
            <View
                style={{
                    marginVertical: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {IconComponent}
            </View>
            <Text style={{fontSize: 16, fontWeight: '800', color: '#68F0F8'}}>{statsValue}</Text>
            {statsUnit && <Text style={{fontSize: 12, color: '#ECFFFF'}}>{statsUnit}</Text>}
            {feedbackText && <Text style={{fontSize: 12, color: '#ECFFFF'}}>{feedbackText}</Text>}
        </View>
    )
}

export default StatsCard

const styles = StyleSheet.create({
    container: {
        flex:1,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#68F0F8",
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: "#12121225"
    }
})