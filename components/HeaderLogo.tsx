import { StyleSheet, Image, View } from 'react-native'
import React from 'react'

import Logo from '@/assets/images/splash-app-icon.png';

const HeaderLogo = () => {
  return (
    <View>
        <Image source={Logo} style={styles.logo} />
    </View>
  )
}

export default HeaderLogo

const styles = StyleSheet.create({
    logo: {
        width:180,
        height: 40,
        objectFit:"contain"
    }
})