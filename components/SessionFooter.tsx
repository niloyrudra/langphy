import { View, StyleSheet, Alert } from 'react-native'
import React from 'react'
import SIZES from '@/constants/size';
import { useTheme } from '@/theme/ThemeContext';
import PaginationButton from './PaginationButton';
import { ContentType, ProgressPayload } from '@/types';
import ActionPrimaryButton from './form-components/ActionPrimaryButton';
import { useSession } from '@/context/SessionContext';
import { useUpdateProgress } from '@/hooks/useUpdateProgess';
// import { useProgress } from '@/hooks/useProgress';

interface SessionFooterProps {
    goToNext: () => void,
    goToPrevious: () => void,
    currentIndex: number,
    contentId: string;
    dataSize: number
}

const SessionFooter: React.FC<SessionFooterProps> = ({ goToNext, goToPrevious, currentIndex, contentId, dataSize }) => {    const {colors} = useTheme();
    const { markLessonCompleted } = useSession();
    // const { data: progress } = useProgress();
    const { mutateAsync: updateProgress } = useUpdateProgress();
    
    const submissionHandler = () => {
        const payload: ProgressPayload = {
            content_type: "practice" as ContentType,
            content_id: contentId,
            completed: true,
            score: 0, // Coming from NLP Analysis
            progress_percent: 0 // Coming from NLP Analysis
        }
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
                        markLessonCompleted(contentId)
                        
                        await updateProgress(payload)
                        
                        goToNext()
                    }
                }
            ]
        );
    }
    return (
        <View
            style={[
                styles.navButtons,
                {backgroundColor: colors.primary_950_50},
                // STYLES.boxShadow
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
                    buttonStyle={{
                        width: "67%",
                        borderRadius: 30,
                        overflow: "hidden"
                    }}
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
    }
});