import { FlatList, ListRenderItem, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@/theme/ThemeContext'
import SIZES from '@/constants/size'
import STYLES from '@/constants/styles'
import { Lesson, LessonListProps } from '@/types'
import { useSession } from '@/context/SessionContext'
import React, { useCallback } from 'react'
import LangphyText from '../text-components/LangphyText'

const getTextStyle = (
    active: boolean,
    completed: boolean,
    color: string
) => [
    styles.text,
    active && styles.activeText,
    { color },
    completed && styles.completedText,
];

const LessonList: React.FC<LessonListProps> = ({
    lessons,
    scrollToLessonRef,
    currentPosition
}) => {
    const {colors} = useTheme();
    const {toggleLessonList} = useSession();
    
    const renderItem: ListRenderItem<Lesson> = useCallback(({item, index}: {item: Lesson, index: number}) => {
        const onScrollHandler = () => scrollToLessonRef?.current?.(index);
        const isActive = index === currentPosition;
        const color = isActive ? "green" : colors.text;

        return (
        <TouchableOpacity onPress={onScrollHandler}>
            <LangphyText weight={isActive ? "bold" : "regular"} style={getTextStyle(isActive, item.completed, color)}>
                {index + 1}. {item.title} {(item.completed) ? "*" : ""}
            </LangphyText>
        </TouchableOpacity>
    )}, [currentPosition, colors.text, colors.activeLessonText, scrollToLessonRef]);

    return (
        <>
            <Pressable onPress={toggleLessonList} style={StyleSheet.absoluteFill} />
            <View style={styles.container}>
                <View style={[styles.content, STYLES.boxShadow, {backgroundColor: colors.primary_950_50}]}>
                    <FlatList
                        data={lessons}
                        keyExtractor={(item) => item?.id?.toString()}
                        showsVerticalScrollIndicator={true}
                        renderItem={renderItem}
                    />
                </View>
            </View>
        </>
    );
}

export default React.memo(LessonList);

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        right: SIZES.bodyPaddingHorizontal,
        width: "70%",
        height: "67%", // "auto", // "100%",
        zIndex: 100,
    },
    content: {
        position: "relative",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 16
    },
    text: {
        paddingVertical: 8,
        fontSize: 12,
    },
    activeText: {
        fontWeight: 'bold',
    },
    completedText: {
        opacity: 0.30,
    },
});