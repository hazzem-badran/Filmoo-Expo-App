import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";


type FavoriteCardProps = {
  poster_url?: string;
  title: string;
};

const FavoriteCard = ({
  poster_url,
  title,
}: FavoriteCardProps) => {
  console.log("poster_url:", poster_url);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={{
        backgroundColor: "#18181b",
        borderRadius: 18,
        overflow: "hidden",
        marginBottom: 18,
        width: "100%",
        maxWidth: 340,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 2,
        borderColor: "#FFD600",
      }}
    >
      <Image
        source={{
          uri: poster_url,
        }}
        className="w-full h-56"
        resizeMode="cover"
      />
      <View className="p-4">
        <Text
          className="text-white text-lg font-bold"
          numberOfLines={2}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FavoriteCard;
