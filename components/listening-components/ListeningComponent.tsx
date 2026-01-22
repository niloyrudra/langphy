import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListeningProps } from '@/types';
import { useTheme } from '@/theme/ThemeContext'
// import SpeakerComponent from '../SpeakerComponent';
import SIZES from '@/constants/size';
import Speaker from '../Speaker';
import InfoButton from '../InfoButton';
import InfoModal from '../modals/InfoModal';

const ListeningComponent: React.FC<ListeningProps> = ({language, children, color, style: customStyle, buttonStyle, speechContent, speechLang}) => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  return (
    <>
      <View style={[styles.speakerButtonWrapper, customStyle, {borderColor: color}]}>

        <View style={[styles.content, {backgroundColor: color}]}>

          <Text style={[styles.languageText]}>{language}</Text>
          {/* <Text style={[styles.languageText, {color: colors.text}]}>{language}</Text> */}

          {/* Speaker */}
          <View style={styles.speakerContainer}>
            {
              speechLang === 'de-DE' && (
                <InfoButton onModalVisible={() => setModalVisible(!modalVisible)} />
              )}
            {
              speechLang === 'de-DE' && (
                <Speaker
                  speechContent={speechContent!}
                  speechLang={speechLang!}
                  isSlowing={true}
                />
              )
            }
            
            <Speaker
              speechContent={speechContent!}
              speechLang={speechLang!}
            />

          </View>

        </View>

        {/* Render children if provided; otherwise show default text */}
        {children && children}

      </View>
      {
        <InfoModal
          isVisible={modalVisible}
          onModalVisible={() => setModalVisible(!modalVisible)}
        />
      }
    </>
  )
}

export default ListeningComponent;

const styles = StyleSheet.create({
  speakerButtonWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical: 30, // 40
    paddingHorizontal: 20,
    borderTopWidth: 10, 
    borderLeftWidth: 5, 
    borderRightWidth: 5, 
    borderBottomWidth: 5,
    borderRadius: 20
  },
  content: {
    width: SIZES.screenWidth - ( SIZES.bodyPaddingHorizontal * 4.3 ),
    position: "absolute",
    height: 56,
    top: -56,
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems: "center",
    alignSelf: "center",
    zIndex: 2,
    paddingHorizontal: 10,
    borderStartStartRadius: 30,
    borderEndStartRadius: 30,
    borderEndEndRadius: 0,
    borderStartEndRadius: 0
  },
  speakerContainer: {
    flexDirection:"row",
    gap: 10,
    // width: "50%"
  },
  languageText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
    textAlign: "center"
  }
});