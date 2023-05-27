import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import data from "../../database/dbProducts";
import COLORS from "../components/Colors";
import Rating from "../components/Rating";
import request from "../api/request";
const SingleProduct = ({ route }) => {
  const id = route.params.id;

  const [product, setProduct] = useState({});
  const { width, height } = useWindowDimensions();

  //get item product
  const getItem = async () => {
    try {
      const req = await request.get(`client/product/${route.params.id}`);
      setProduct(req.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    console.log(id);
    getItem();
  }, []);
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card_image}>
        {product.image ? (
          <Image source={{ uri: product.image }} style={styles.image} />
        ) : (
          <Image
            source={require("../images/products/product03.png")}
            style={styles.image}
          />
        )}
      </View>
      <Text style={styles.title}>Thông tin sản phẩm</Text>
      {/* Detail product */}
      <View style={styles.detail}>
        <View style={[styles.card, { width: "95%" }]}>
          <View style={[styles.row, styles.around]}>
            <Text style={[styles.card_title, styles.flex]}>Tên sản phẩm:</Text>
            <Text style={[styles.card_title, styles.flex, styles.text_center]}>
              {product.name}
            </Text>
          </View>
          <View style={[styles.row, styles.around]}>
            <Text style={[styles.card_title, styles.flex]}>Giá tiền:</Text>
            <Text style={[styles.card_price, styles.flex, styles.text_center]}>
              {product.price} đồng
            </Text>
          </View>
          <View style={[styles.row, styles.around]}>
            <Text style={[styles.card_title, styles.flex]}>Đánh giá:</Text>
            <Rating
              value={product.rating}
              style={{ justifyContent: "center" }}
            />
          </View>
          <View style={[styles.row, styles.around]}>
            <Text style={[styles.card_title, styles.flex]}>Tình trạng:</Text>
            <Text style={[styles.card_title, styles.flex, styles.text_center]}>
              Còn hàng
            </Text>
          </View>
        </View>
      </View>
      {/* more */}
      <Text style={styles.title}>Chi tiết</Text>

      <View style={{ marginHorizontal: 10 }}>
        <Text>
          {product.description}
        </Text>
      </View>
      
    </ScrollView>
  );
};

export default SingleProduct;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    margin: 5,
  },
  around: {
    justifyContent: "space-around",
  },
  container: {},
  card_image: {
    alignItems: "center",
    maxHeight: 260,
  },
  image: {
    height: 250,
    width: 250,
    resizeMode: "contain",
  },
  detail: {
    alignItems: "center",
    flex: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 5,
  },
  card: {
    borderRadius: 15,
    borderWidth: 0.5,
    backgroundColor: COLORS.azure,
  },
  card_title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  card_price: {
    fontSize: 16,
    color: "red",
    fontStyle: "italic",
    marginLeft: 10,
    fontWeight: 500,
  },
  flex: {
    flex: 1,
  },
  text_center: {
    textAlign: "center",
  },
  button: {
    width: "95%",
    backgroundColor: "green",
  },
  button_text: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    paddingVertical: 5,
  },
});
