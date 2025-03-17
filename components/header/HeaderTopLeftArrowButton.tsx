import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

import ArrowLeftIcon from '@/assets/images/header/arrow-left-circle.svg';

const HeaderTopLeftArrowButton = () => {
  const router = useRouter();

  const handlePress = () => {
    router.back();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
    >
      <ArrowLeftIcon width={36} height={36} />
    </TouchableOpacity>
  );
};

export default HeaderTopLeftArrowButton;

const styles = StyleSheet.create({
  container: {
    // borderWidth: 2,
    // borderColor: "#D9EFFF",
    // backgroundColor: "#EEF8FF",
    // borderRadius: 100,
    // paddingHorizontal: 6,
    // paddingVertical: 6,

    // width: 32,
    // height: 32
  }
});