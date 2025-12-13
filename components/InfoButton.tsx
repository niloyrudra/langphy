import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { InfoIcon } from '@/utils/SVGImages'

const InfoButton = () => {
  return (
    <View style={{flex: 1}}>
        <TouchableOpacity
            onPress={() => console.log('Info')}
        >
            <InfoIcon />
        </TouchableOpacity>
    </View>
  )
}

export default InfoButton;