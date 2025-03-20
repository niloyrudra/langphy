import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TitleProps } from '@/types';
import { useTheme } from '@/theme/ThemeContext';
import STYLES from '@/constants/styles';

const FormHeaderTitle = ({title, wrapperStyle, titleStyle}: TitleProps) => {
  const {colors} = useTheme();
  return (
    <View style={[STYLES.childContentCentered, styles.headerWrapper, (wrapperStyle && wrapperStyle)]}>
      <Text style={[styles.header, {color: colors.text}, (titleStyle && titleStyle)]}>{title}</Text>
    </View>
  );
}

export default FormHeaderTitle;

const styles = StyleSheet.create({
  headerWrapper: {
    marginVertical: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "800" // 600
  },
});