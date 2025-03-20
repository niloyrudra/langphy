import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import sizes from '@/constants/size';
import STYLES from '@/constants/styles';

import { DictionaryIcon } from '@/utils/SVGImages';


const FloatingDictionaryIcon = () => {
  return (
    <TouchableOpacity style={[STYLES.childContentCentered, styles.container, STYLES.boxShadow]}>
      <DictionaryIcon width={40} height={40} />
    </TouchableOpacity>
  )
}

export default FloatingDictionaryIcon;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: sizes.bodyPaddingHorizontal,
    bottom: 100,
    width: 70, // 80
    height: 70,
    borderRadius: 35, // 40
    backgroundColor: "#24DEEC",
  }
});