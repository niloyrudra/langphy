import { View, StyleSheet, Alert } from 'react-native'
import React from 'react'
import SIZES from '@/constants/size';
import { useTheme } from '@/theme/ThemeContext';
import PaginationButton from './PaginationButton';
// import STYLES from '@/constants/styles';
import ActionButton from './form-components/ActionButton';
import { useSessionPager } from '@/hooks/useSessionPager';
import { Lesson } from '@/types';
import ActionPrimaryButton from './form-components/ActionPrimaryButton';
import { useSession } from '@/context/SessionContext';
// import InfoButton from './InfoButton';
// import InfoModal from './modals/InfoModal';

interface SessionFooterProps {
    goToNext: () => void,
    goToPrevious: () => void,
    currentIndex: number,
    dataSize: number
}

const SessionFooter: React.FC<SessionFooterProps> = ({ goToNext, goToPrevious, currentIndex, dataSize }) => {    const {colors} = useTheme();
    const { lessonCompletionHandler } = useSession();
    const submissionHandler = () => {
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
                    onPress: () => {
                        lessonCompletionHandler();
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