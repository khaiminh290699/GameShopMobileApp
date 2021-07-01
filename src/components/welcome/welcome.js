import React, { useEffect } from "react";
import { View, StyleSheet, Text, AsyncStorage} from "react-native";

import style from "../../style/index"

const Welcome = (props) => {

  const { navigation } = props;

  useEffect(() => {
    setTimeout(async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        navigation.replace("Home")
        return;
      }
      navigation.replace("SignIn")
      return;
    }, 1000)
  }, [])

  return (
    <View style={style.container}>
      <Text>
        Welcome to GameShop
      </Text>
    </View>
  )
}

export default Welcome;