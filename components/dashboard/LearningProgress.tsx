import React from 'react';
import { StyleSheet, View } from 'react-native';
import LearningProgressItem from '@/components/dashboard/_partials/LearningProgressItem';
import Title from '@/components/Title';
import { Images } from '@/constants/images';
import { useVocabularyCount } from '@/hooks/useVocabulary';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { useQuery } from '@tanstack/react-query';
import { getCompletedLessons } from '@/db/progress.repo';
import { getTotalCompletedSessions, getTotalCompletedUnits } from '@/db/performance.repo';

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

    const { data: completedSessionCount = 0 } = useQuery({
        queryKey: ["completedSessions"],
        queryFn: getTotalCompletedSessions,
        staleTime: 30_000
    });

    const { data: completedUnitCount = 0 } = useQuery({
        queryKey: ["completedUnits"],
        queryFn: getTotalCompletedUnits,
        staleTime: 30_000
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
            learningCategoryTitle: "Total Lessons",
            score: completedLessonCount,
            icon: Images.dashboard.progress_lesson,
        },
        {
            id: 3,
            learningCategoryTitle: "Total Sessions",
            score: completedSessionCount,
            icon: Images.dashboard.progress_session,
        },
        {
            id: 4,
            learningCategoryTitle: "Total Units",
            score: completedUnitCount,
            icon: Images.dashboard.progress_unit,
        },
    ]), [wordCount, completedLessonCount, completedSessionCount, completedUnitCount]);

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