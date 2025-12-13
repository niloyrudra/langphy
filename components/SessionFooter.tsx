import { View, StyleSheet } from 'react-native'
import React from 'react'
import SIZES from '@/constants/size';
import { useTheme } from '@/theme/ThemeContext';
import PaginationButton from './PaginationButton';
import InfoButton from './InfoButton';
import InfoModal from './modals/InfoModal';

interface SessionFooterProps {
    goToNext: () => void,
    goToPrevious: () => void,
    currentIndex: number,
    dataSize: number
}

const SessionFooter: React.FC<SessionFooterProps> = ({ goToNext, goToPrevious, currentIndex, dataSize }) => {
    const {colors} = useTheme();
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    
    return (
        <>
            <View
                style={[
                    styles.navButtons,
                    {
                        backgroundColor: colors.primary_950_50,
                        marginHorizontal: - SIZES.bodyPaddingHorizontal,
                        marginBottom: - SIZES.bodyPaddingHorizontal,
                        paddingVertical: 10 
                    }
                ]}
            >

                <InfoButton onModalVisible={() => setModalVisible(!modalVisible)} />

                <View
                    style={{
                        width: 150,
                        flexDirection: "row",
                        gap: 20,
                        justifyContent: "flex-end",
                        alignItems: "center",
                        // backgroundColor:"red"
                    }}
                >
                    <PaginationButton
                        actionHandler={goToPrevious}
                        isDisabled={currentIndex === 0}
                        modeLeft={true}
                    />
                    <PaginationButton
                        actionHandler={goToNext}
                        isDisabled={currentIndex === dataSize - 1}
                    />
                </View>
            </View>
            {
                <InfoModal
                    isVisible={modalVisible}
                    onModalVisible={() => setModalVisible(!modalVisible)}
                />
            }
        </>
    );
}

export default SessionFooter;

const styles = StyleSheet.create({
    navButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: SIZES.bodyPaddingHorizontal
    }
});