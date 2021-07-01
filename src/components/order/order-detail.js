import React from "react";
import { useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native"
import { useState } from "react/cjs/react.development";
import style from "../../style";
import baseApi from "../../ultilities/axios";
import formatDate from "../../ultilities/formatDate";
import getStatus from "../../ultilities/getStatus";
import convertMoney from "../../ultilities/moneyConvert";

const API_URL = process.env.API_URL || "http://localhost:8080"

function DealDetail(props) {
  const { route: { params: { id } } } = props;

  const [order, setOrder] = useState();

  useEffect(() => {
    baseApi.get(`/order/${id}`)
    .then((res) => {
      const { status, message, data } = res;
      if (status != 200) {
        alert(message);
        return;
      }
      setOrder(data)
    })
  }, [])

  if (!order) {
    return (
      <View style={style.container}>
        <Text>
          Đang tải
        </Text>
      </View>
    )
  }

  const statusStype = {
    backgroundColor: "#f7d707",
    fontWeight: "bold",
  }
  if (order.status === 3) {
    statusStype.backgroundColor = "#f7434f"
  }
  if (order.status === 2) {
    statusStype.backgroundColor = "#49e372"
  }
  if (order.status === 1) {
    statusStype.backgroundColor = "#4edaed"
  }

  return (
    <View style={{
      borderWidth: 1
    }}>
      <View style={{
        padding: 20
      }}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Mã đơn: </Text>
          <Text>{order.id}</Text>
        </Text>
        <Text>Tổng tiền: {convertMoney(order.total_price)}</Text>
        <Text>Trạng thái: <Text style={{
          ...statusStype
        }}>{getStatus(order.status)}</Text></Text>
        <Text>Ngày đặt: {formatDate(order.ordered_at)}</Text>
        <Text>Địa chỉ giao: {order.address}</Text>
        <Text>Số điện thoại liên lạc: {order.phone_number}</Text>
        {
          order.finished_at ? <Text>Ngày hoàn thành: {formatDate(order.finished_at)}</Text> : <></>
        }
        {
          order.status === 0 ? <TouchableOpacity
            style={{
              backgroundColor: "#f7434f",
              width: 100,
              alignItems: "center",
              borderRadius: 45,
              paddingTop: 10,
              paddingBottom: 10
            }}
            onPress={() => {
              baseApi.post(`/order/update-status`, {
                id,
                status: 3
              })
              .then(res => {
                const { status, message } = res;
                if (status != 200) {
                  alert(message);
                  return;
                }
                setOrder({
                  ...order,
                  status: 3
                })
              })
            }}
          >
            <Text>Huỷ đơn</Text>
          </TouchableOpacity> : <></>
        }
      </View>
      <FlatList
        data={order.OrderDetails}
        renderItem={({item, index}) => {
          const { Product: product, amount, total_price } = item;
          return (
            <View key={index} style={style.list_item}>
              <Image 
                style={style.list_img}
                source={{
                  uri: `${API_URL}/${product.images.main}`
                }}
              />

              <View>
                <Text style={{ fontWeight: 'bold' }}>{product.title}</Text>
                <Text>Tổng số: {amount}</Text>
                <Text>Tổng giá: {convertMoney(total_price)}</Text>
              </View>
            </View>
          )
        }}
      ></FlatList>
    </View>
  )
}

export default DealDetail