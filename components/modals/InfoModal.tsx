import { StyleSheet, View, Pressable } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { InfoIndicatorDarkIcon, InfoIndicatorLightIcon, ModalCloseDarkIcon, ModalCloseLightIcon } from '@/utils/SVGImages';
import ModalColorIndicatorComponent from './_partials/ModalColorIndicatorComponent';
import ModalSectionTitle from './_partials/ModalSectionTitle';
import LangphyText from '../text-components/LangphyText';
import ModalLayout from './_partials/ModalLayout';

const InfoModal = ({isVisible, onModalVisible}: {isVisible: boolean, onModalVisible: () => void}) => {
    const {colors, theme} = useTheme();
    return (
        <ModalLayout
            isVisible={isVisible}
            onModalVisible={onModalVisible}
            gradientColor={[colors.gradientDeep, colors.gradientDeep]}
            containerStyle={[styles.container, {borderBottomColor: colors.modalBorderColor, backgroundColor: colors.background}]}
        >
            <View style={[styles.modalView]}>
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
                    <LangphyText weight="semibold" style={[styles.modalText, {color: colors.text}]}>Indications</LangphyText>
                </View>
            
                {/* Modal Content */}
                <View style={styles.sectionContainer}>
                    <ModalSectionTitle title='German Cases (Fälle)' />

                    <View style={styles.contentWrapper}>
                        <ModalColorIndicatorComponent name="Nominative (Nominativ)" color="#E14415" />
                        <ModalColorIndicatorComponent name="Accusative (Akkusativ)" color="#B423EE" />
                        <ModalColorIndicatorComponent name="Dative (Dativ)" color="#40CC0E" />
                        <ModalColorIndicatorComponent name="Genitive (Genitiv)" color="#EFC437" />
                    </View>

                </View>

                <View style={styles.sectionContainer}>
                    <ModalSectionTitle title='German Genders (Geschlechter)' />

                    <View style={styles.contentWrapper}>
                        <ModalColorIndicatorComponent name="Maskulin (Nominativ)" color="#3098EE" />
                        <ModalColorIndicatorComponent name="Feminine (Femini)" color="#FA44E7" />
                        <ModalColorIndicatorComponent name="Neuter (Kastrieren)" color="#C29B6C" />
                        <ModalColorIndicatorComponent name="Plural (Plural)" color="#EA831D" />
                    </View>

                </View>

                <View style={styles.sectionContainer}>
                    <ModalSectionTitle title='German Parts-of-speech'/>

                    <View style={styles.contentWrapper}>
                        <ModalColorIndicatorComponent name="Noun (Substantiv)" color="#FF9800" />
                        {/* <ModalColorIndicatorComponent name="Proper Noun (Eigenname)" color="#FF9800" /> */}
                        <ModalColorIndicatorComponent name="Pronoun (Pronomen)" color="#4CAF50" />
                        <ModalColorIndicatorComponent name="Verb (Verb)" color="#2196F3" />
                        <ModalColorIndicatorComponent name="Auxiliary Verb (Hilfsverb)" color="#64B5F6" />
                        <ModalColorIndicatorComponent name="Adjective (Adjektiv)" color="#8BC34A" />
                        <ModalColorIndicatorComponent name="Adverb (Adverb)" color="#AED581" />
                        <ModalColorIndicatorComponent name="Determiner (Determinierer)" color="#F06292" />
                        <ModalColorIndicatorComponent name="Adposition (Adposition)" color="#BA68C8" />
                        <ModalColorIndicatorComponent name="Conjunction (Konjunction)" color="#90A4AE" />
                        {/* <ModalColorIndicatorComponent name="Subordinating Conjunction (Unterordnende Konjunktion)" color="#90A4AE" /> */}
                        {/* <ModalColorIndicatorComponent name="Coordinating Conjunction (Koordinierende Konjunktion)" color="#90A4AE" /> */}
                        <ModalColorIndicatorComponent name="Numeral (Ziffer/Zahl)" color="#FFD54F" />
                        <ModalColorIndicatorComponent name="Particle (Teilchen)" color="#B0BEC5" />
                    </View>
                </View>
            </View>
        </ModalLayout>
    );
}
export default InfoModal;

const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginVertical: "auto",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: "relative"
    },
    modalView: {
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 8,
        marginBottom: 4
    },
    sectionContainer: {
        marginVertical: 4
    },
    buttonClose: {
        position: "absolute",
        top: 0,
        right: 0
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 18, // 20
        fontWeight: "600"
    },
    contentWrapper: {
        marginTop: 6,
        flexDirection: "column",
        gap: 3
    },
    horizontal: {
        backgroundColor: "#676767",
        marginVertical: 3,
        width: "100%"
    }
});