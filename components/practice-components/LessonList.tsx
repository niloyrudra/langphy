import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@/theme/ThemeContext'
import SIZES from '@/constants/size'
import STYLES from '@/constants/styles'
import { LessonListProps } from '@/types'

const LessonList: React.FC<LessonListProps> = ({
    lessons,
    scrollToLessonRef,
    currentPosition
}) => {
    const {colors, theme} = useTheme();
    return (
        <View
            style={[
                styles.listContainer,
                {
                    backgroundColor: colors.primary_950_50,
                },
                STYLES.boxShadow
            ]}
        >
            <View style={{position: "relative"}}>
                {
                    lessons?.map((lesson, idx) => (
                        <TouchableOpacity
                            key={idx.toString()}
                            onPress={() => scrollToLessonRef?.current?.(idx)}
                        >
                            <Text
                                style={{
                                    color: idx === currentPosition ? (theme === 'light' ? 'blue' : "green") : colors.text,
                                    paddingVertical: 8,
                                    fontWeight: idx === currentPosition ? "bold" : "normal",
                                    opacity: lesson.completed ? 0.35 : 1,
                                }}
                            >
                                {idx + 1}. {lesson.title}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    );
}

export default LessonList;

const styles = StyleSheet.create({
    listContainer: {
        position: "absolute",
        top: 0,
        right: SIZES.bodyPaddingHorizontal,
        width: "70%",
        height: "auto", // "100%",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderStartStartRadius: 16,
        borderStartEndRadius: 16,
        borderEndEndRadius: 16,
        borderEndStartRadius: 0,
        zIndex: 100,
    }
});