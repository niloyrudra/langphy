import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'

const KeyboardAvoidingViewLayout = ({children}: {children: ReactNode | undefined}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {children && children}
    </KeyboardAvoidingView>
  )
}

export default KeyboardAvoidingViewLayout;

const styles = StyleSheet.create({
  container: {flex:1}
});