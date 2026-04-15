import { StyleSheet, View } from 'react-native'
import React, { ReactNode } from 'react'
import ContentSubTitle from './ContentSubTitle'

const SubSection = ({subTitle, children}: {subTitle: string, children: ReactNode}) => {
    return (
        <View style={styles.container}>
            <ContentSubTitle title={subTitle} />
            {children}
        </View>
    )
}

export default SubSection;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 10,
        // marginVertical: 10
    }
})