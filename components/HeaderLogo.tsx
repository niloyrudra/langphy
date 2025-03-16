import { StyleSheet, Image, View } from 'react-native'
import React from 'react'

// import Logo from '@/assets/images/splash-app-icon.png';
import SVGLogo from '@/assets/images/svg-images/Logo.svg'

const HeaderLogo = () => {
  return (
    <View>
        {/* <Image source={SVGLogo} style={styles.logo} /> */}
        <SVGLogo width={133.07} height={31.34} style={styles.logo} />
    </View>
  )
}

export default HeaderLogo

const styles = StyleSheet.create({
    logo: {}
})