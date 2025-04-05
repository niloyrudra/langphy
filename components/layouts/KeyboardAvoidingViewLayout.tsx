import { KeyboardAvoidingView, Platform } from 'react-native'
import React, { ReactNode } from 'react'

const KeyboardAvoidingViewLayout = ({children}: {children: ReactNode | undefined}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // contentContainerStyle={{flex: 1}}
      style={{flex:1}}
    >
      {children && children}
    </KeyboardAvoidingView>
  )
}

export default KeyboardAvoidingViewLayout;
