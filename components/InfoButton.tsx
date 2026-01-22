import { TouchableOpacity } from 'react-native'
import React from 'react'
import { InfoIcon } from '@/utils/SVGImages'

const InfoButton = ({onModalVisible}: {onModalVisible: () => void}) => (
  <TouchableOpacity onPress={onModalVisible}>
    <InfoIcon width={42} height={42} />
  </TouchableOpacity>
);

export default InfoButton;