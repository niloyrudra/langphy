import { View, Text, ColorValue } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

const ModalColorIndicatorComponent = ({name, color}: {name: string, color: ColorValue}) => {
  return (
    <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
        <AntDesign name="pinterest" size={20} color={color} />
        <Text
            style={{
                color: color,
                fontSize: 14,
                fontWeight: "700"
            }}
        >
            {name}
        </Text>
    </View>
  )
}

export default ModalColorIndicatorComponent