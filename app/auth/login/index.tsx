import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import sizes from '@/constants/size'
import { useTheme } from '@/theme/ThemeContext'

import DolphinIcon from '@/assets/images/auth/dolphin-icon.svg'
import HorizontalLine from '@/components/HorizontalLine'

import FacebookIcon from '@/assets/images/social/facebook.svg'
import GoogleIcon from '@/assets/images/social/google.svg'
import { Link, router } from 'expo-router'

const Login = () => {
  const { colors } = useTheme();
  return (
    <ScrollView
      style={{
        flex:1
      }}
    >

      <View
      style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={{height:73}} />

        <View
          style={{
            flex:1,
            justifyContent: 'center',
            alignItems: "center",
            // paddingTop: 83
          }}
        >
          <DolphinIcon width={187} height={211.67} />
        </View>

        <View style={styles.headerWrapper}>
          <Text style={styles.header}>Create Account</Text>
        </View>

        <View
          style={styles.form}
        >
          <TextInput
            placeholder='Email'
            value={''}
            keyboardType='default'
            style={styles.input}
          />
          <TextInput
            placeholder='Password'
            value={''}
            keyboardType='default'
            // inputMode='password'
            style={styles.input}
          />

          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-end"              
            }}
          >
            <Link
              href="/auth/forgetPassword"
              style={{
                color: colors.primary
              }}
            >Forgot Password?</Link>
          </View>

          <TouchableOpacity
            style={[styles.button, {backgroundColor: colors.primary}]}
          >
            <Text style={{fontSize: 16, color: colors.textWhite, fontWeight: "700"}}>Create Account</Text>
          </TouchableOpacity>
        </View>

        <HorizontalLine />

        <View>
          <View
            style={{
              flexDirection: "row",
              gap: 16,
              height: 56,
              marginBottom: 20
            }}
          >

            <TouchableOpacity
              style={{
                flex:1,
                flexDirection: "row",
                gap: 8,
                justifyContent: "center",
                alignItems: "center",
                height: 56,
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: "#F7F7F7",
                backgroundColor: "#ffffff"
              }}
            >
              <FacebookIcon width={24} height={24} />
              <Text>facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex:1,
                flexDirection: "row",
                gap: 8,
                justifyContent: "center",
                alignItems: "center",
                height: 56,
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: "#F7F7F7",
                backgroundColor: "#ffffff"
              }}
            >
              <GoogleIcon width={24} height={24} />
              <Text>Google</Text>
            </TouchableOpacity>

          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
              marginBottom: 20
            }}
          >
            <Text style={{color: colors.textSubColor}}>Don't have an account?</Text>

            <Link
              href="/auth/signUp"
              style={{
                color: colors.primary
              }}
            >Create Account</Link>
          </View>

        </View>

      </View>

    </ScrollView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizes.bodyPaddingHorizontal,
    paddingVertical: 30,
    
  },
  headerWrapper: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    fontSize: 32,
    color: "#142C57",
    fontWeight: "600"
  },
  form: {
    flexDirection: 'column',
    gap: 16
  },
  input: {
    height: 56,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F7F7F7",
    backgroundColor: "#ffffff"
  },
  button: {
    height: 56,
    padding: 16,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#F7F7F7",
    justifyContent: "center",
    alignItems: "center",
  }
})