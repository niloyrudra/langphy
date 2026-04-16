import { StyleSheet, View } from 'react-native';
import React, { ReactNode } from 'react';
import ContentTitle from './ContentTitle';

const Section = ({title, children}: {title: string, children: ReactNode}) => {
    return (
        <View style={styles.container}>
            <ContentTitle title={title} />
            {children}
        </View>
    )
}

export default Section

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 10,
        marginVertical: 10
    }
});