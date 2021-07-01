import React, { useEffect, useState} from "react";
import { AsyncStorage, Button, Image, Text, TouchableOpacity, View } from "react-native"
import InputSpinner from "react-native-input-spinner";
import style from "../../style";
import baseApi from "../../ultilities/axios";
import convertMoney from "../../ultilities/moneyConvert";


const API_URL = process.env.API_URL || "http://localhost:8080"

function  AddCart(props) {
  const { setTotalAmount } = props
  const [product, setProduct] = useState();
  const [amount, setAmount] = useState(0);

  const id = props.product ? props.product.id : props.route.params.id;

  useEffect(async () => {
    const cart = JSON.parse(await AsyncStorage.getItem("cart"));
    const item = cart[cart.findIndex((i) => i.product_id === id)];
    const amount = item ? item.amount : 0
    setAmount(amount)
    if (props.product) {
      setProduct(props.product)
      if (setTotalAmount) {
        setTotalAmount(amount * props.product.price)
      }
    } else {
      baseApi.get(`/product/${props.route.params.id}`)
      .then(res => {
        const { status, message, data } = res;
        if (status != 200) {
          alert(message);
          return;
        }
        setProduct(data);
      })
    }
  }, [])

  if (!product) {
    return <View style={style.container}>
      <Text>Đang tải...</Text>
    </View>
  }

  return (
    <View style={style.list_item}>
      <Image 
        style={style.list_img}
        source={{
          uri: `${API_URL}/${product.images.main}`
        }}
      />
      <View>
        <Text style={{ fontWeight: 'bold' }}>{product.title}</Text>
        <Text>Giá bán: {convertMoney(product.price)}</Text>
        <Text>Tồn kho: {product.stock}</Text>
        <View style={{ flexDirection: "row" }}>
          <InputSpinner
            max={product.stock}
            min={0}
            step={1}
            color={"#dbd7d7"}
            value={amount}
            width={100}
            buttonFontSize={20}
            arrows={true}
            skin="square"
            height={20}
            onChange={(num) => {
              setAmount(num)
            }}
          />
          <Text> <Text style={{ fontWeight: "bold" }}>Tổng giá: </Text> {convertMoney(product.price * amount)}</Text>
        </View>
        <TouchableOpacity
          onPress={async () => {
            const cart = JSON.parse(await AsyncStorage.getItem("cart"));
            const index = cart.findIndex((i) => i.product_id === id);
            const item = cart[index];
            const a = item ? item.amount : 0
            
            if (amount === 0) {
              if (item) {
                cart.splice(index, 1)
              }
            } else {
              if (item) {
                item.amount = amount;
              } else {
                cart.push({
                  product_id: product.id,
                  amount
                });
              }
            }

            if (setTotalAmount) {
              if (a > amount) {
                setTotalAmount(-(a - amount) * product.price)
              }
              if (a < amount) {
                setTotalAmount((amount - a) * product.price)
              }
            }

            await AsyncStorage.setItem("cart", JSON.stringify(cart));
            alert("Cập nhật vỏ hàng thành công.");
            return;
          }}
        >
            <Text style = {{
              backgroundColor: "#81f09f",
              color: "#f5faf6",
              textAlign: "center",
              width: 150,
              borderWidth: 1,
              paddingTop: 5,
              paddingBottom: 5,
              marginTop: 2,
              fontWeight: "bold",
              borderRadius: 5
            }}>
              Cập nhật vỏ hàng
            </Text>
         </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddCart;