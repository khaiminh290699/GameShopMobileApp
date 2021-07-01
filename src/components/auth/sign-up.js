import React from 'react';
import { useState } from 'react';
import { Button, TextInput, TouchableOpacity, View } from 'react-native';
import style from '../../style';
import baseApi from '../../ultilities/axios';
import validateEmail from '../../ultilities/validateEmail';

function SignUp(props){

  const { navigation } = props;

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();

  const onSignUpClick = () => {
    if (!email || !password || !username) {
      alert("Nhập đầy đủ các thông tin.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Nhập đúng định dạng địa chỉ email.");
      return;
    }

    if (password.length < 8) {
      alert("Độ dài mật khẩu phải lớn hơn 8.");
      return;
    }

    baseApi.post("/auth/sign-up", {
      email,
      password,
      username
    })
    .then(res => {
      const { status, message, error } = res;
      if (status != 200) {
        if (status === 500) {
          alert(error);
        } else {
          alert(message);
        }
        return;
      }
      alert("Tạo tài khoản thành công.");
      navigation.goBack();
    })
  }

  return (
    <View style={style.container}>
        <TextInput style={style.input} autoCapitalize={false} placeholder="Tên đăng nhập" onChangeText={setUsername}></TextInput>
        <TextInput style={style.input} autoCapitalize={false} placeholder="Địa chỉ email" onChangeText={setEmail}></TextInput>
        <TextInput style={style.input} autoCapitalize={false} placeholder="Mật khẩu" secureTextEntry={true} onChangeText={setPassword}></TextInput>
        <TouchableOpacity>
          <Button onPress={() => onSignUpClick()} title="Tạo tài khoản"></Button>
        </TouchableOpacity>
    </View>
  )
}

export default SignUp;