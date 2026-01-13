import { StyleSheet, View } from 'react-native';
import React from 'react';
import HorizontalSeparator from './HorizontalSeparator';
import SIZES from '@/constants/size';
import SocialButton from './SocialButton';
import FacebookIcon from '@/assets/images/social/facebook.svg';
import GoogleIcon from '@/assets/images/social/google.svg';

const SocialLoginSection = () => (
    <>
        {/* Section Breaker Component */}
        <HorizontalSeparator />

        <View>
            <View style={[styles.buttonContainer]}>
                <SocialButton
                    iconComponent={<FacebookIcon width={SIZES.defaultIconSize} height={SIZES.defaultIconSize} />}
                    socialMediaName='facebook'
                    onTap={() => console.log("Facebook")}
                />

                <SocialButton
                    iconComponent={<GoogleIcon width={SIZES.defaultIconSize} height={SIZES.defaultIconSize} />}
                    socialMediaName='Google'
                    onTap={() => console.log("Google")}
                />
            </View>
        </View>
    </>
);


export default SocialLoginSection

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        gap: 16,
        height: SIZES.buttonHeight,
        marginBottom: 20
    }
});