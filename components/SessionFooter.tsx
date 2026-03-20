import { View, StyleSheet } from 'react-native'
import React from 'react'
import SIZES from '@/constants/size';
import { useTheme } from '@/theme/ThemeContext';
import PaginationButton from './PaginationButton';
import { Token } from '@/types';
import ActionPrimaryButton from './form-components/ActionPrimaryButton';

interface SessionFooterProps {
    storeVocabulary: () => void,
    goToNext: () => void,
    goToPrevious: () => void,
    currentIndex: number,
    contentId: string;
    dataSize: number;
    tokens: Token;
}

const SessionFooter: React.FC<SessionFooterProps> = ({ storeVocabulary, goToNext, goToPrevious, currentIndex, contentId, dataSize }) => {
    const {colors} = useTheme();
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
                    onSubmit={storeVocabulary}
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
        paddingVertical: 10,
    },
    button: {
        width: "67%",
        borderRadius: 30,
        overflow: "hidden"
    }
});