import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CategoryArchiveHeaderTitle = ({title}: {title: string}) => {
  return (
<View style={styles.titleWrapper}><Text style={styles.title}>{title}</Text></View>
  )
}

export default CategoryArchiveHeaderTitle

const styles = StyleSheet.create({
    titleWrapper: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    title: {
        color: '#142C57',
        fontWeight: "800",
        fontSize: 24
    }
})