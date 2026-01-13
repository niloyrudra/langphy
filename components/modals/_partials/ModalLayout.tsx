import { StyleSheet, View, Text, Modal, Dimensions, ColorValue, ViewStyle, StyleProp } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/theme/ThemeContext';
import { Feedback } from '@/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ModalLayoutProps = {
    isVisible: boolean;
    onModalVisible: () => void;
    children: React.ReactNode;
    feedback?: Feedback;
    gradianColor: readonly [ColorValue, ColorValue, ...ColorValue[]];
    containerStyle?: StyleProp<ViewStyle>;
}

const ModalLayout = ({isVisible, onModalVisible, children, feedback, gradianColor, containerStyle}: ModalLayoutProps) => {
    const insets = useSafeAreaInsets();
    const {colors} = useTheme();

    return (
        <Modal
            animationType='slide'
            // transparent
            statusBarTranslucent
            visible={isVisible}
            onRequestClose={onModalVisible}
            backdropColor={colors.modalBackDropColor}
            style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                bottom: 0
            }}
            
        >
            <View style={[styles.centeredView]}>
                
                <View 
                    style={[
                        styles.modalView,
                        {
                            borderTopColor: colors.modalBoderColor, // cardBorderColor
                            borderLeftColor: colors.modalBoderColor,
                            borderRightColor: colors.modalBoderColor,
                            width: '98%',
                            overflow: 'hidden'
                        },
                        (containerStyle && containerStyle)
                    ]}
                >
                    {/* Modal Content */}
                    <LinearGradient
                        colors={gradianColor}
                        style={[{padding: 20}]}
                    >

                        {/* Modal Header */}
                        {feedback && (
                            <View style={{marginBottom: 15}}>
                                <Text style={[styles.modalText, {color: feedback.color}]}>{feedback.label}</Text>
                            </View>
                        )}

                        {/* Modal Content */}
                        {children && children}

                    </LinearGradient>
                </View>
            </View>
        </Modal>
    );
}

export default ModalLayout;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        bottom: 0
    },
    modalView: {
        // position: "relative",
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
    }
});