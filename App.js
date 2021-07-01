/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


import Welcome from './src/components/welcome/welcome';
import SignIn from './src/components/auth/sign-in';
import SignUp from './src/components/auth/sign-up';
import Home from './src/components/home.js/home';
import AddCart from './src/components/cart/add-cart';
import Cart from './src/components/cart/cart';
import Deal from './src/components/cart/deal';
import Order from './src/components/order/order';
import DealDetail from './src/components/order/order-detail';

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
        <Stack.Screen name="SignIn" options={{ title: "Đăng nhập" }} component={SignIn} />
        <Stack.Screen name="SignUp" options={{ title: "Đăng ký tài khoản" }} component={SignUp} />
        <Stack.Screen name="Home" options={{ title: "Trang chủ" }} component={Home} />
        <Stack.Screen name="AddCart" options={{ title: "Thêm vào vỏ" }} component={AddCart} />
        <Stack.Screen name="Cart" options={{ title: "Vỏ hàng" }} component={Cart} />
        <Stack.Screen name="ThanhToan" options={{ title: "Thanh toán" }} component={Deal} />
        <Stack.Screen name="Order" options={{ title: "Danh sách đơn hàng" }} component={Order} />
        <Stack.Screen name="OrderDetail" options={{ title: "Chi tiết sản phẩm" }} component={DealDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
