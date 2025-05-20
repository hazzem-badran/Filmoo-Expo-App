import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

const Save = () => {
  return (
    <View className="bg-primary flex-1 px-10">
      <View className="flex flex-col justify-center items-center flex-1 gap-5">
        <Image source={icons.save} className="size-10" tintColor="#fff" />
        <Text className="text-gray-500 text-base">Save</Text>
      </View>
    </View>
  );
};

export default Save;
