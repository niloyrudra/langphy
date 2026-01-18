import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { useTheme } from '@/theme/ThemeContext'
import { EditIconDark, EditIconLight } from '@/utils/SVGImages'

const EditButton = () => {
    const {theme} = useTheme();
    return (
        <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push('/dashboard/profile-edit') }
        >
            {theme === "light"
                ? (<EditIconLight width={28} height={28} />)
                : (<EditIconDark width={28} height={28} />)
            }
        </TouchableOpacity>
    );
}

export default EditButton;

const styles = StyleSheet.create({
  editButton: {
    position: "absolute",
    right: 10,
    top: 10
  }
})