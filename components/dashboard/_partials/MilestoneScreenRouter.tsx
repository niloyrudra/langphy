import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import LangphyText from '@/components/text-components/LangphyText'

const MilestoneScreenRouter = ({title}: {title: string}) => {
    const onTap = React.useCallback(() => router.push( "/dashboard/milestones" ), [router]);
    return (
        <TouchableOpacity
            onPress={onTap}
            style={[styles.button]}
        >
            <LangphyText style={{fontSize: 18, color:"#1B7CF5"}}>{title}</LangphyText>
            <Ionicons name="chevron-forward" size={24} color="#1B7CF5" />
        </TouchableOpacity>
    )
}

export default MilestoneScreenRouter;

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    }
})