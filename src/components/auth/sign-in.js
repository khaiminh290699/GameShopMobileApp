import React, { useState } from 'react';
import { AsyncStorage, Button, TextInput, TouchableOpacity, View } from 'react-native';
import style from '../../style';
import baseApi from '../../ultilities/axios';
import validateEmail from '../../ultilities/validateEmail';

function SignIn(props){

  const { navigation } = props;

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onSignInClick = () => {
    if (!email || !password) {
      alert("Nhập đầy đủ các thông tin.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Nhập đúng định dạng địa chỉ email.");
      return;
    }

    baseApi.post("/auth/sign-in", {
      email,
      password
    })
    .then(async (res) => {
      const { status, message, error, data } = res;
      if (status != 200) {
        if (status === 500) {
          alert(error);
        } else {
          alert(message);
        }
        return;
      }
      const { token } = data;
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(data));
      await AsyncStorage.setItem("cart", JSON.stringify([]))
      alert("Đăng nhập thành công.");
      navigation.replace("Home")
    })
  }

  const onSignUpClick = () => {
    navigation.navigate("SignUp")
  }

  return (
    <View style={style.container}>
        <TextInput style={style.input} autoCapitalize={false} placeholder="Địa chỉ email" onChangeText={setEmail}></TextInput>
        <TextInput style={style.input} autoCapitalize={false} placeholder="Mật khẩu" secureTextEntry={true} onChangeText={setPassword}></TextInput>
        <TouchableOpacity>
          <Button onPress={onSignInClick} title="Đăng nhập"></Button>
        </TouchableOpacity>
        <TouchableOpacity>
          <Button onPress={onSignUpClick} title="Tạo tài khoản"></Button>
        </TouchableOpacity>
    </View>
  )
}

export default SignIn;