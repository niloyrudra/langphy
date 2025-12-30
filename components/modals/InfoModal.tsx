import { StyleSheet, View, Text, Modal, Pressable } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { InfoIndicatorDarkIcon, InfoIndicatorLightIcon, ModalCloseDarkIcon, ModalCloseLightIcon } from '@/utils/SVGImages';
import HorizontalLine from '../HorizontalLine';
import ModalColorIndicatorComponent from './_partials/ModalColorIndicatorComponent';
import ModalSectionTitle from './_partials/ModalSectionTitle';

const InfoModal = ({isVisible, onModalVisible}: {isVisible: boolean, onModalVisible: () => void}) => {
    const {colors, theme} = useTheme();
    return (
        <Modal
            animationType='slide'
            transparent={false}
            visible={isVisible}
            onRequestClose={onModalVisible}
            backdropColor="#072D3790"
        >
            <View style={[styles.centeredView]}>
                
                <View style={[styles.modalView, {backgroundColor: colors.background}]}>
                    <Pressable
                        style={[styles.buttonClose]}
                        onPress={onModalVisible}
                    >
                        {
                            theme === 'light'
                                ? (<ModalCloseLightIcon />)
                                : (<ModalCloseDarkIcon />)
                        }
                    </Pressable>

                    {/* Modal Header */}
                    <View style={styles.modalHeader}>
                        {
                            theme === 'light'
                                ? (<InfoIndicatorLightIcon />)
                                : (<InfoIndicatorDarkIcon />)
                        }
                        <Text style={[styles.modalText, {color: colors.text}]}>Indications</Text>
                    </View>
                
                    {/* Modal Content */}
                    <View
                        style={{
                            marginVertical: 10
                        }}
                    >
                        <ModalSectionTitle
                            title='Four German Cases (Fälle)'
                            color="#68F0F8"
                        />

                        <View style={styles.contentWrapper}>
                            <ModalColorIndicatorComponent name="Nominative (Nominativ)" color="#E14415" />
                            <ModalColorIndicatorComponent name="Accusative (Akkusativ)" color="#B423EE" />
                            <ModalColorIndicatorComponent name="Dative (Dativ)" color="#40CC0E" />
                            <ModalColorIndicatorComponent name="Genitive (Genitiv)" color="#EFC437" />
                        </View>

                    </View>

                    <HorizontalLine
                        style={{
                            backgroundColor: "#676767",
                            marginVertical: 4,
                            width: "100%"
                        }}
                    />

                    <View
                        style={{
                            marginVertical: 10
                        }}
                    >
                        <ModalSectionTitle
                            title='Four German Genders (Geschlechter)'
                            color="#68F0F8"
                        />

                        <View style={styles.contentWrapper}>
                            <ModalColorIndicatorComponent name="Maskulin (Nominativ)" color="#3098EE" />
                            <ModalColorIndicatorComponent name="Feminine (Femini)" color="#FA44E7" />
                            <ModalColorIndicatorComponent name="Neuter (Kastrieren)" color="#C29B6C" />
                            <ModalColorIndicatorComponent name="Plural (Plural)" color="#EA831D" />
                        </View>

                    </View>

                    <HorizontalLine
                        style={{
                            backgroundColor: "#676767",
                            marginVertical: 4,
                            width: "100%"
                        }}
                    />

                    <View
                        style={{
                            marginVertical: 10
                        }}
                    >
                        <ModalSectionTitle
                            title='German Parts-of-speech'
                            color="#68F0F8"
                        />

                        <View style={styles.contentWrapper}>
                            <ModalColorIndicatorComponent name="Noun (Nominativ)" color="#FF9800" />
                            {/* <ModalColorIndicatorComponent name="Proper Noun (Nominativ)" color="#FF9800" /> */}
                            <ModalColorIndicatorComponent name="Pronoun (Femini)" color="#4CAF50" />
                            <ModalColorIndicatorComponent name="Verb (Kastrieren)" color="#2196F3" />
                            <ModalColorIndicatorComponent name="Auxiliary Verb (Plural)" color="#64B5F6" />
                            <ModalColorIndicatorComponent name="Adjective (Nominativ)" color="#8BC34A" />
                            <ModalColorIndicatorComponent name="Adverb (Femini)" color="#AED581" />
                            <ModalColorIndicatorComponent name="Determiner (Femini)" color="#F06292" />
                            <ModalColorIndicatorComponent name="Adposition (Femini)" color="#BA68C8" />
                            <ModalColorIndicatorComponent name="Conjunction (Femini)" color="#90A4AE" />
                            {/* <ModalColorIndicatorComponent name="Subordinating Conjunction (Femini)" color="#90A4AE" /> */}
                            {/* <ModalColorIndicatorComponent name="Coordinating Conjunction (Femini)" color="#90A4AE" /> */}
                            <ModalColorIndicatorComponent name="Numeral (Plural)" color="#FFD54F" />
                            <ModalColorIndicatorComponent name="Participle (Kastrieren)" color="#B0BEC5" />
                        </View>

                    </View>

                </View>
            </View>
        </Modal>
    );
}

export default InfoModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        position: "relative",
        margin: 20,
        width: "80%",
        borderRadius: 20,
        padding: 20,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
        marginBottom: 4
    },
    buttonClose: {
        position: "absolute",
        top: 10,
        right: 10
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