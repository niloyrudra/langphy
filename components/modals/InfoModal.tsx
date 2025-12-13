import { StyleSheet, View, Text, Modal, Pressable } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { InfoIndicatorDarkIcon, InfoIndicatorLightIcon, ModalCloseDarkIcon, ModalCloseLightIcon } from '@/utils/SVGImages';
import { AntDesign } from '@expo/vector-icons';
import HorizontalLine from '../HorizontalLine';
import ModalColorIndicatorComponent from './_partials/ModalColorIndicatorComponent';
import ModalSectionTitle from './_partials/ModalSectionTitle';
// import SafeAreaLayout from '../layouts/SafeAreaLayout'

const InfoModal = ({isVisible, onModalVisible}: {isVisible: boolean, onModalVisible: () => void}) => {
    const {colors, theme} = useTheme();
    // const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    return (
        // <SafeAreaLayout>
            <Modal
                animationType='slide'
                transparent={false}
                visible={isVisible}
                onRequestClose={onModalVisible}
                backdropColor="#072D3790"//{'#00000080'}
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
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: 10,
                                marginBottom: 10
                            }}
                        >
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

                            <View
                                style={{
                                    marginTop: 10,
                                    flexDirection: "column",
                                    gap: 5
                                }}
                            >
                                <ModalColorIndicatorComponent name="Nominative (Nominativ)" color="#E14415" />
                                <ModalColorIndicatorComponent name="Accusative (Akkusativ)" color="#B423EE" />
                                <ModalColorIndicatorComponent name="Dative (Dativ)" color="#40CC0E" />
                                <ModalColorIndicatorComponent name="Genitive (Genitiv)" color="#EFC437" />
                            </View>

                        </View>

                        <HorizontalLine
                            style={{
                                backgroundColor: "#676767",
                                marginVertical: 10,
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

                            <View
                                style={{
                                    marginTop: 10,
                                    flexDirection: "column",
                                    gap: 5
                                }}
                            >
                                <ModalColorIndicatorComponent name="Maskulin (Nominativ)" color="#3098EE" />
                                <ModalColorIndicatorComponent name="Feminine (Femini)" color="#FA44E7" />
                                <ModalColorIndicatorComponent name="Neuter (Kastrieren)" color="#C29B6C" />
                                <ModalColorIndicatorComponent name="Plural (Plural)" color="#EA831D" />
                            </View>

                        </View>

                    </View>
                </View>
            </Modal>
        // </SafeAreaLayout>
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
    // backgroundColor: 'white',
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
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
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
});