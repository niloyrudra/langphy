import { View, ColorValue, StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import LangphyText from '@/components/text-components/LangphyText'

const ModalColorIndicatorComponent = ({name, color}: {name: string, color: ColorValue}) => {
  return (
    <View style={styles.container}>
        <AntDesign name="pinterest" size={20} color={color} />
        <LangphyText
            weight="bold"
            style={[styles.text, {color: color}]}
        >
            {name}
        </LangphyText>
    </View>
  )
}

export default ModalColorIndicatorComponent;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },
    text: {fontSize: 14}
});