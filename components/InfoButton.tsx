import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { InfoIcon } from '@/utils/SVGImages'

const InfoButton = ({onModalVisible}: {onModalVisible: () => void}) => {
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={onModalVisible}
      >
        <InfoIcon />
      </TouchableOpacity>
    </View>
  )
}

export default InfoButton;