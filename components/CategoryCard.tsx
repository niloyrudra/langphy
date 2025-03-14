import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { useRouter } from 'expo-router';


interface CategoryProps {
  catTitle: String,
  slug: String,
  imgSource: ImageSourcePropType | undefined
}

const CategoryCard = ( { catTitle, slug, imgSource }: CategoryProps ) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push('/category')}
    >
      <View style={styles.container}>
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