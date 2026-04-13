import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import ContentTitle from './ContentTitle'

const Section = ({title, children}: {title: string, children: ReactNode}) => {
    return (
        <View>
            <ContentTitle title={title} />
            {children}
        </View>
    )
}

export default Section

const styles = StyleSheet.create({})