import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

const Logo = () => {
  return (
    <View className="flex-row items-center justify-center mt-20 mx-auto">
      <Image source={icons.logo} className="w-12 h-12" />
    </View>
  );
};

export default Logo;
