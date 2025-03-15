import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

import * as Progress from 'react-native-progress';


interface SubCategoryProps {
  title: string,
  completion: number,
  imgSource: ImageSourcePropType | undefined,
  customStyle?: object
}

const SubCategoryCard = ( { title, completion, imgSource, customStyle }: SubCategoryProps ) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>  router.push({ pathname: '/lesson', params: { title: title } })}
    >
      <View style={ customStyle ? { ...styles.container, ...customStyle } :styles.container }>
        <View style={styles.imageWrapper}>
          <Image source={imgSource} style={styles.image} />
        </View>
        
        <Text style={styles.title}>{title}</Text>
        
        <View style={styles.progressBarWrapper}>
          {/* <Progress.Bar color={['red', 'green', 'blue']} /> */}
          <Progress.Bar
            progress={completion/100}
            animated={true}
            indeterminateAnimationDuration={1000}
            width={52}
            height={8}
            borderRadius={20}
            animationConfig={{bounciness: 1}}
            animationType='spring'
            borderColor="transparent"
            borderWidth={0}
            unfilledColor="#ffffff"
            color="rgba(72, 228, 239, 1)" // "rgba(27, 124, 245, 1)" //"#1B7CF5"
          />
        </View>
      </View>
     </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
    alignItems: "center",

    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#BCE4FF",
    backgroundColor: "#EEF8FF",

    paddingVertical: 0,
    paddingHorizontal: 0, // 24

    width: Dimensions.get("screen").width - 34,
    height: 78,
  },
  imageWrapper: {
    width: 75,
    height: 75,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",

    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  image: {
    width: 49,
    height: 49
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: "#093743",
    fontWeight: "600",
    lineHeight: 22 
  },
  progressBarWrapper: {
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",

    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  progressBar: {
    width: 52
  }
});

export default SubCategoryCard;