import { View, StyleSheet, Alert } from 'react-native'
import React, { useCallback } from 'react'
import SIZES from '@/constants/size';
import { useTheme } from '@/theme/ThemeContext';
import PaginationButton from './PaginationButton';
import { SessionType, DBProgress } from '@/types';
import ActionPrimaryButton from './form-components/ActionPrimaryButton';
import { useUpdateProgress } from '@/hooks/useUpdateProgess';
import { useLocalSearchParams } from 'expo-router';
import { useLessonTimer } from '@/hooks/useLessonTimer';
import { markLessonCompleted } from '@/db/progress.repo';

interface SessionFooterProps {
    goToNext: () => void,
    goToPrevious: () => void,
    currentIndex: number,
    contentId: string;
    dataSize: number
}

const SessionFooter: React.FC<SessionFooterProps> = ({ goToNext, goToPrevious, currentIndex, contentId, dataSize }) => {
    const {colors} = useTheme();
    const {categoryId, unitId, slug} = useLocalSearchParams();
    const { stop } = useLessonTimer()
    const { mutateAsync: updateProgress } = useUpdateProgress();
    
    const submissionHandler = useCallback(() => {
        if( !contentId ) return Alert.alert("Lesson Id is missing.")
        const duration = stop();
        const now = Math.floor( Date.now() / 1000 );
        const attemptId = Date.now();
        const sessionkey = `${unitId}:${slug}:${attemptId}`;

        const payload: DBProgress = {
            category_id: categoryId as string,
            unit_id: unitId as string,
            content_type: "practice" as SessionType,
            session_key: sessionkey,
            content_id: contentId,
            completed: 1,
            lesson_order: currentIndex,
            score: 1, // Coming from NLP Analysis
            duration_ms: duration,
            progress_percent: 100, // Coming from NLP Analysis
            updated_at: now,
            dirty: 1
        };

        Alert.alert(
            "Lesson Completion",
            "You have completed this lesson",
            [
                {
                    text: "Retry",
                    style: 'cancel'
                },
                {
                    text: 'Continue',
                    onPress: async () => {
                        // lessonCompletionHandler();
                        // await markLessonCompleted({
                        //     content_type: slug as SessionType,
                        //     lessonId: payload.content_id,
                        //     sessionKey: payload.session_key,
                        //     score: payload.score,
                        //     duration_ms: payload.duration_ms,
                        //     lesson_order: payload.lesson_order,
                        // })
                        
                        await updateProgress(payload)
                        
                        goToNext()
                    }
                }
            ]
        );
    }, [markLessonCompleted, stop, goToNext, contentId, unitId, slug ])

    return (
        <View
            style={[
                styles.navButtons,
                {backgroundColor: colors.primary_950_50}
            ]}
        >
                <PaginationButton
                    actionHandler={goToPrevious}
                    isDisabled={currentIndex === 0}
                    modeLeft={true}
                />

                <ActionPrimaryButton
                    buttonTitle='Done'
                    onSubmit={submissionHandler}
                    buttonStyle={styles.button}
                />

                <PaginationButton
                    actionHandler={goToNext}
                    isDisabled={currentIndex === dataSize - 1}
                />

        </View>
    );
}

export default SessionFooter;

const styles = StyleSheet.create({
    navButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: SIZES.bodyPaddingHorizontal,
        marginHorizontal: - SIZES.bodyPaddingHorizontal,
        marginBottom: - SIZES.bodyPaddingHorizontal,
        paddingVertical: 10
    },
    button: {
        width: "67%",
        borderRadius: 30,
        overflow: "hidden"
    }
});