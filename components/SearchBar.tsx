import { icons } from "@/constants/icons";
import React from "react";
import { Image, Text, TextInput, View } from "react-native";

interface Props {
  placeholder?: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;

}

const SearchBar = ({ placeholder, value, onPress, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-2 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        tintColor="#FFFF8B"
        resizeMode="contain"
        className="size-5"
      />
      <TextInput
        placeholder={placeholder}
        className="flex-1 ml-2 text-white"
        value={value}
        onChangeText={onChangeText}
        onPress={onPress}
        placeholderTextColor="#a8b5db"
      />
    </View>
  );
};

export default SearchBar;
