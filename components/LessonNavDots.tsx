import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

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
                    <LinearGradient
                        key={idx.toString()}
                        colors={currentIndex >= idx
                            ? [colors.gradiantActiveNavDot, colors.gradiantActiveNavDotDark]
                            : [colors.gradiantInactiveNavDot, colors.gradiantInactiveNavDot]
                        }
                        style={styles.dot}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        locations={[0, 1]}
                    />
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
    },
    dot: {
        width: 15,
        height: 15,
        borderRadius: 15,
    }
})