import React, { useState } from "react";
import { TextInput, TouchableOpacity, View, Text, AsyncStorage } from "react-native";

import style from "../../style/index"
import baseApi from "../../ultilities/axios";

function Deal(props) {
  const { navigation } = props;
  const [address, setAddress] = useState();
  const [phone_number, setPhoneNumber] = useState();
  return (
    <View style={style.container}>
        <TextInput style={style.input} autoCapitalize={false} placeholder="Địa chỉ nhận hàng" onChangeText={setAddress} ></TextInput>
        <TextInput style={style.input} autoCapitalize={false} placeholder="Điện thoại liên lạc" onChangeText={setPhoneNumber} ></TextInput>
        <TouchableOpacity
          onPress={async () => {
            const products = JSON.parse(await AsyncStorage.getItem("cart"));
            baseApi.post(`/order/create`, {
              products, address, phone_number
            })
            .then(async (res) => {
              const { status, data, message, error } = res;
              if (status !== 200) {
                if (status !== 500) {
                  alert(message);
                } else {
                  alert(error);
                }
                return;
              }
              await AsyncStorage.setItem("cart", JSON.stringify([]))
              alert("Đơn hàng tạo thành công.");
              navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              });
            })
          }}
        >
          <Text style={{ backgroundColor: "#16b2f5", ...style.button, width: 300 }}>Xác nhận đơn hàng</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Deal;