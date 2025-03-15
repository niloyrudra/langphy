import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { useRouter } from 'expo-router';


interface CategoryProps {
  catTitle: string,
  slug: string,
  imgSource: ImageSourcePropType | undefined,
  customStyle?: object
}

const CategoryCard = ( { catTitle, slug, imgSource, customStyle }: CategoryProps ) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>  router.push({ pathname: '/category', params: { title: catTitle } })}
    >
      <View style={ customStyle ? { ...styles.container, ...customStyle } :styles.container }>
        <Image source={imgSource} style={styles.image} />
        <Text style={styles.title}>{catTitle}</Text>
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
    borderColor: "#BCE4FF",
    backgroundColor: "#EEF8FF",

    paddingVertical: 16,
    paddingHorizontal: 24, // 24

    width: 172,
    height: 172,

    // marginHorizontal: 10
  },
  image: {
    width: 80,
    height: 80
  },
  title: {
    fontSize: 16,
    color: "#093743",
    fontWeight: "600",
    lineHeight: 18 
  }
});

export default CategoryCard;