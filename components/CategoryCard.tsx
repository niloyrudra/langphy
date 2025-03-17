import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';


interface CategoryProps {
  catTitle: string,
  slug: string,
  imgSource: ImageSourcePropType | undefined,
  customStyle?: object
}

const CategoryCard = ( { catTitle, slug, imgSource, customStyle }: CategoryProps ) => {
  const router = useRouter();
  const {colors} = useTheme()

  return (
    <TouchableOpacity
      onPress={() =>  router.push({ pathname: '/category', params: { title: catTitle, slug: slug } })}
    >
      <View style={[styles.container, {backgroundColor: colors.cardBackgroundColor, borderColor: colors.cardBorderColor}, (customStyle && { ...customStyle } ) ]}>
        <Image source={imgSource} style={styles.image} />
        <Text style={[styles.title, {color: colors.text}]}>{catTitle}</Text>
      </View>
     </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 24, // 24
    width: 172,
    height: 172,
  },
  image: {
    width: 80,
    height: 80
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 18 
  }
});

export default CategoryCard;