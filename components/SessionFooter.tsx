import { View, StyleSheet, Alert } from 'react-native'
import React from 'react'
import SIZES from '@/constants/size';
import { useTheme } from '@/theme/ThemeContext';
import PaginationButton from './PaginationButton';
// import STYLES from '@/constants/styles';
import ActionButton from './form-components/ActionButton';
import { useSessionPager } from '@/hooks/useSessionPager';
import { ContentType, Lesson } from '@/types';
import ActionPrimaryButton from './form-components/ActionPrimaryButton';
import { useSession } from '@/context/SessionContext';
import { useProgress } from '@/context/ProgressContext';
import { useAuth } from '@/context/AuthContext';
import { useLocalSearchParams } from 'expo-router';
// import InfoButton from './InfoButton';
// import InfoModal from './modals/InfoModal';

interface SessionFooterProps {
    goToNext: () => void,
    goToPrevious: () => void,
    currentIndex: number,
    contentId: string;
    dataSize: number
}

const SessionFooter: React.FC<SessionFooterProps> = ({ goToNext, goToPrevious, currentIndex, contentId, dataSize }) => {    const {colors} = useTheme();
    // const { lessonCompletionHandler } = useSession();
    const {user} = useAuth()
    const {categoryId, slug, unitId} = useLocalSearchParams();
    const { progress, updateProgress } = useProgress();
    
    const submissionHandler = () => {
        const c_id = typeof categoryId === 'string' ? categoryId : "";
        const u_id = typeof unitId === 'string' ? unitId : "";
        const payload = {
            category_id: c_id,
            unit_id: u_id,
            user_id: user?.id ?? '',
            content_type: 'practice' as ContentType,
            content_id: contentId,
            completed: true,
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
                        updateProgress(payload)
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