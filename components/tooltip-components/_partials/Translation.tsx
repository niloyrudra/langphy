import { ColorValue, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'

const Translation = ({translation, color}: {translation: string, color: ColorValue | string}) => {
    const {colors} = useTheme();
  return (
    <View style={{flexDirection: "column"}}>
        {
            translation && translation.split(",").map((word, idx) => word.trim() !== "" && (

                <View
                    key={idx.toString()}
                    style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.hLineColor
                    }}
                >
                    <Text
                        style={[
                            styles.translation,
                            {
                                textTransform: "capitalize",
                                color: color ?? colors.textDark
                            }
                        ]}
                    >
                        {word.trim()}
                    </Text>
                </View>
            ))
        }
    </View>
  )
}

export default Translation

const styles = StyleSheet.create({
    translation: {
        fontSize: 12,
        fontWeight: "400"
    }
})