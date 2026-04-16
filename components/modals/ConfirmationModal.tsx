import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import ActionPrimaryButton from '../form-components/ActionPrimaryButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ResultDetail from './_partials/ResultDetail';
import ModalLayout from './_partials/ModalLayout';
import SecondaryActionButton from '../form-components/SecondaryActionButton';

interface ConfirmationModalProps {
    isVisible: boolean;
    title: string;
    message: string;
    status: "success" | "error" | "warning";
    onModalVisible: () => void;
    onRetry: () => void;
    onContinue: () => void;
}

const ConfirmationModal = ({isVisible, title, message, status, onModalVisible, onRetry, onContinue}: ConfirmationModalProps) => {
    const insets = useSafeAreaInsets();
    const {colors} = useTheme();

    const handleContinue = React.useCallback( () => onContinue(), [onContinue]);

    return (
        <ModalLayout
            isVisible={isVisible}
            onModalVisible={onModalVisible}
            gradientColor={[colors.gradientDeep, colors.gradientDeep]}
            containerStyle={styles.modalContainer}
        >

            {/* Modal Content */}
            <View style={styles.content}>

                {
                    <ResultDetail
                        detail={message}
                        iconComponent={
                            <MaterialCommunityIcons name="head-lightbulb-outline" size={20} color={colors.text} />
                        }
                    />
                    
                }
                
                <View style={styles.buttonWrapper}>
                    <SecondaryActionButton
                        buttonTitle='Retry'
                        onSubmit={onRetry}
                        buttonStyle={styles.button}
                        background={colors.gradientDeep}
                    />
                    <ActionPrimaryButton
                        buttonTitle='Continue'
                        onSubmit={handleContinue}
                        buttonStyle={styles.button} />
                </View>

            </View>
        </ModalLayout>                    
    );
}

export default ConfirmationModal;

const styles = StyleSheet.create({
    modalContainer: {
        width: "100%"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        bottom: 0
    },
    content: { gap: 5 },
    modalView: {
        borderStartStartRadius: 20,
        borderEndStartRadius: 20,
        borderTopWidth: 6,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 20,
        fontWeight: "700"
    },
    contentWrapper: {
        marginTop: 10,
        flexDirection: "column",
        gap: 5
    },
    divider: {
        marginVertical: 15,
        borderBottomColor: "#3FA1FF"
    },
    buttonWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30
    },
    button: {
        width: '45%',
        borderRadius: 30,
        overflow: 'hidden'
    }
});