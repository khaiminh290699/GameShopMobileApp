import React, { useState } from "react";
import { useEffect } from "react";
import { FlatList, View, Text, TouchableOpacity} from "react-native";
import style from "../../style";
import baseApi from "../../ultilities/axios";
import formatDate from "../../ultilities/formatDate";
import getStatus from "../../ultilities/getStatus";
import convertMoney from "../../ultilities/moneyConvert";

function Order(props) {
  const { navigation } = props;
  const [pageIndex, setPageIndex] = useState(0);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    baseApi.post("/order/list", {
      page: pageIndex, 
      limit: 10,
      order: [["updatedAt", "DESC"]]
    })
    .then((res) => {
      const { status, message, data } = res;
      if (status != 200) {
        alert(message);
        return;
      }
      const { rows } = data;
      const list = [...orders, ...rows] 
      setOrders(list);
    })
  }, [])
  return (
    <View>
      <FlatList
        data={orders}
        renderItem={({item}) => {
          const { id, total_price, status, ordered_at, finished_at } = item;
          const statusStype = {
            backgroundColor: "#f7d707",
            fontWeight: "bold",
          }
          if (status === 3) {
            statusStype.backgroundColor = "#f7434f"
          }
          if (status === 2) {
            statusStype.backgroundColor = "#49e372"
          }
          if (status === 1) {
            statusStype.backgroundColor = "#4edaed"
          }
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("OrderDetail", { id })
              }}
            >
              <View key={id} style={style.list_item}>
                <View style={{ padding: 10 }}>
                  <Text>Mã đơn: <Text style={{ fontWeight: "bold" }}>{id}</Text></Text>
                  <Text>Tổng tiền: {convertMoney(total_price)}</Text>
                  <Text>Trạng thái: <Text style={{
                    paddingLeft: 25,
                    paddingRight: 25,
                    ...statusStype
                  }}>{getStatus(status)}</Text></Text>
                  <Text>Ngày đặt: {formatDate(ordered_at)}</Text>
                  {
                    finished_at ? <Text>Ngày hoàn thành: {formatDate(finished_at)}</Text> : <></>
                  }
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
      >

      </FlatList>
    </View>
  )
}

export default Order;