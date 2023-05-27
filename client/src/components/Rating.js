import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StarZero, StarFull, StarHalf } from "../fontawesome/Star";
const Rating = ({ title, value, style }) => {
  return (
    <View style={[styles.rating, style]}>
      <FontAwesomeIcon
        icon={value >= 1 ? StarFull : StarZero}
        style={{ color: "#eeb02b" }}
        size={24}
      />
      <FontAwesomeIcon
        icon={value >= 2 ? StarFull : StarZero}
        style={{ color: "#eeb02b" }}
        size={24}
      />
      <FontAwesomeIcon
        icon={value >= 3 ? StarFull : StarZero}
        style={{ color: "#eeb02b" }}
        size={24}
      />
      <FontAwesomeIcon
        icon={value >= 4 ? StarFull : StarZero}
        style={{ color: "#eeb02b" }}
        size={24}
      />
      <FontAwesomeIcon
        icon={value >= 5 ? StarFull : StarZero}
        style={{ color: "#eeb02b" }}
        size={24}
      />
      <Text>{title}</Text>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  rating: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
});
