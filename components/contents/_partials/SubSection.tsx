import { StyleSheet, View } from 'react-native'
import React, { ReactNode } from 'react'
import ContentSubTitle from './ContentSubTitle'

const SubSection = ({subTitle, children}: {subTitle: string, children: ReactNode}) => {
    return (
        <View>
            <ContentSubTitle title={subTitle} />
            {children}
        </View>
    )
}

export default SubSection;

const styles = StyleSheet.create({})