import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const MilestoneScreenRouter = ({title}: {title: string}) => {
    return (
        <TouchableOpacity
            onPress={() => router.push( '/dashboard/milestones' )}
            style={[styles.button]}
        >
            <Text style={{fontSize: 18, color:"#1B7CF5"}}>{title}</Text>
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