import React from "react";
import { useEffect, useState } from "react";

import { Button, FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native"

import { AsyncStorage } from "react-native";
import baseApi from "../../ultilities/axios";
import convertMoney from "../../ultilities/moneyConvert";
import AddCart from "./add-cart";

import style from "../../style/index"

function Cart(props) {
  const { navigation } = props
  const [products, setProducts] = useState([]);
  let [totalAmount, setTotalAmount] = useState(0);

  useEffect(async () => {
    const cart = JSON.parse(await AsyncStorage.getItem("cart"));

    const productIds = cart.reduce((productIds, item) => {
      const { product_id } = item;
      productIds.push(product_id);
      return productIds;
    }, []);

    baseApi.post(`/product/get-by-ids`, {
      ids: productIds
    })
    .then((res) => {
      const { status, data } = res;
      if (status != 200) {
        return;
      }
      // const cartData = [];
      // data.forEach((item, index) => {
      //   // const { id, title, price, images, stock } = item;
      //   // const { amount } = cart[cart.findIndex((item) => item.product_id === id)];
      //   // setProducts(item);
      // })
      setProducts(data);
    })
  }, [])

  return (
    <View>
      <FlatList 
        style={{
          height: "90%"
        }}
        data={products}
        ListEmptyComponent={() => {
          return (
            <Text style={{ textAlign: "center" }}>Hiện vỏ hàng rỗng</Text>
          )
        }}
        renderItem={({item}) => {
          return (
            <AddCart product={item} setTotalAmount={(amount) => {
              totalAmount += amount;
              setTotalAmount(totalAmount)
            }} ></AddCart>
          )
        }}
      />
      <View style={{ backgroundColor: "#c9c9c1", height: "10%" }}>
        <Text style={{ fontWeight: "bold" }}>Tổng số: {convertMoney(totalAmount)}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ThanhToan")
          }}
        >
          <Text style={{ backgroundColor: "#34eb77", color: "#e0e0dc", ...style.button, width: 300, marginLeft: 40 }}>Nhập thông tin đơn hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Cart;