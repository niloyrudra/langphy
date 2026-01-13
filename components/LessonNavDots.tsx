import { StyleSheet, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
// import { ToolTip } from '@/types';

interface LessonNav {
    data: number[];
    currentIndex: number;
}

const LessonNavDots = ({data, currentIndex}: LessonNav) => {
    return (
        <View
            style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 5
            }}
        >
            {
                // data.length > 0 &&
                data?.map( (_, idx) => (
                    <AntDesign key={idx.toString()} name="pinterest" size={15} color={currentIndex >= idx ? '#0A9AB0' : "#142C57"} />
                ))
            }
        </View>
    );
}

export default LessonNavDots;

const styles = StyleSheet.create({})