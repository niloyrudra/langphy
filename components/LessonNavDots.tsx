import { StyleSheet, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useTheme } from '@/theme/ThemeContext';

interface LessonNav {
    data: number[];
    currentIndex: number;
}

const LessonNavDots = ({data, currentIndex}: LessonNav) => {
    const {colors} = useTheme();
    return (
        <View style={styles.dotContainer}>
            {
                data?.map( (_, idx) => (
                    <AntDesign key={idx.toString()} name="pinterest" size={15} color={currentIndex >= idx ? '#0A9AB0' : colors.lessonListDot} />
                ))
            }
        </View>
    );
}

export default LessonNavDots;

const styles = StyleSheet.create({
    dotContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5
    }
})