import { View, Text, ColorValue } from 'react-native'
import React from 'react'

const ModalSectionTitle = ({title, color="#68F0F8"}: {title: string, color: ColorValue}) => {
    return (
        <Text
            style={{
                color,
                fontSize: 16,
                fontWeight: "700"
            }}
        >
            {title}
        </Text>
    );
}

export default ModalSectionTitle