import React from 'react';
import { StyleSheet, View } from 'react-native';
import LearningProgressItem from '@/components/dashboard/_partials/LearningProgressItem';
import Title from '@/components/Title';
import { Images } from '@/constants/images';
import { useVocabularyCount } from '@/hooks/useVocabulary';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { useQuery } from '@tanstack/react-query';
import { getCompletedLessons } from '@/db/progress.repo';

const LearningProgress = ({ title }: { title: string }) => {
    const userId = authSnapshot.getUserId() ?? "";

    // useVocabularyCount is already a React Query hook — no useEffect needed
    const { data: wordCount = 0 } = useVocabularyCount(userId);

    // Move getCompletedLessons into React Query — no useState/useEffect,
    // no stale function reference in dependency arrays
    const { data: completedLessonCount = 0 } = useQuery({
        queryKey: ["completedLessons"],
        queryFn: getCompletedLessons,
        staleTime: 30_000,
    });

    // useMemo so the array is only rebuilt when the two scores actually change
    const items = React.useMemo(() => ([
        {
            id: 1,
            learningCategoryTitle: "Total Words",
            score: wordCount,
            icon: Images.dashboard.progress_word,
        },
        {
            id: 2,
            learningCategoryTitle: "Total Phrases",
            score: 500,
            icon: Images.dashboard.progress_paragraph,
        },
        {
            id: 3,
            learningCategoryTitle: "Total Units",
            score: 100,
            icon: Images.dashboard.progress_unit,
        },
        {
            id: 4,
            learningCategoryTitle: "Total Lessons",
            score: completedLessonCount,
            icon: Images.dashboard.progress_lesson,
        },
    ]), [wordCount, completedLessonCount]);

    return (
        <View style={styles.container}>
            <Title title={title} contentStyle={styles.title} />
            {items.map((item) => (
                <LearningProgressItem
                    key={item.id}
                    icon={item.icon}
                    title={item.learningCategoryTitle}
                    score={item.score.toString()}
                />
            ))}
        </View>
    );
};

export default LearningProgress;

const styles = StyleSheet.create({
    container: { gap: 10 },
    title: { fontSize: 20, fontWeight: "600" },
});