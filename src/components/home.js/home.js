import React, { useState } from "react";
import { useEffect } from "react";
import { FlatList, Image, Text, View, Button, TouchableOpacity, AsyncStorage } from "react-native";
import style from "../../style";
import baseApi from "../../ultilities/axios";
import convertMoney from "../../ultilities/moneyConvert";

const API_URL = process.env.API_URL || "http://localhost:8080"

function Home(props) {

  const { navigation } = props;

  const [loadable, setLoadable] = useState(true)
  let [pageIndex, setPageIndex] = useState(0);
  const [products, setProducts] = useState([]);

  const onLoadMoreClick = () => {
    pageIndex += 1;
    setPageIndex(pageIndex)
  }

  const onAddCartClick = (id) => {
    navigation.navigate("AddCart", {
      id
    });
  }

  useEffect(() => {
    baseApi.post("/product/list", {
      wheres: {
        is_deleted: {
          eq: false
        }
      },
      page: pageIndex, 
      limit: 10,
      order: [["createdAt", "DESC"]]
    })
    .then(res => {
      const { status, message, data } = res;
      if (status != 200) {
        alert(message);
        return;
      }
      const { count, rows } = data;
      const list = [...products, ...rows] 
      setProducts(list);
      if (list.length == count) {
        setLoadable(false)
      }
    })
  }, [pageIndex])

  return (
    <View>
      <FlatList 
        style={{
          height: "90%"
        }}
        data={products}
        ListFooterComponent={() => {
          return (
            loadable ? <Button title="Xem thêm" onPress={onLoadMoreClick} ></Button> : <Button title="Không thể tải thêm" disabled></Button>
          )
        }}
        renderItem={({item}) => {
          const { id, title, images: { main }, stock, price, Category: { title: category } } = item;
          return (
            <View key={id} style={style.list_item}>
              <Image style={style.list_img} source={{
                uri: `${API_URL}/${main}`
              }} />
              <View>
                <Text style={{ fontWeight: 'bold' }}>{title}</Text>
                <Text>Danh mục: {category}</Text>
                <Text>Giá bán: {convertMoney(price)}</Text>
                <Text>Tồn kho: {stock}</Text>
                <Text style={{ color: "#fafcfb", backgroundColor: "#a0a3a2", alignSelf: 'baseline' }}
                  onPress={() => onAddCartClick(id)}
                >
                  + Thêm vào vỏ 
                </Text>
              </View>
            </View>
          )
        }}
      />
      <View style={{ backgroundColor: "#c9c9c1", height: "10%" }}>
        <View style={{ marginTop: 10, marginBottom: 10, flexDirection: "row", justifyContent:'space-between' }}>
          <TouchableOpacity onPress={() => {
            navigation.navigate("Cart")
          }}>
            <Text style={{ backgroundColor: "#f2786f", color: "#e0e0dc", ...style.button }}>Vỏ hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate("Order")
          }}>
            <Text style={{ backgroundColor: "#757ad1", color: "#e0e0dc", ...style.button }}>Đơn hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={async () => {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("cart");
            navigation.reset({
              index: 0,
              routes: [{name: 'SignIn'}],
            });
          }}>
            <Text style={{ backgroundColor: "#f2f063", color: "#e0e0dc", ...style.button }}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Home;