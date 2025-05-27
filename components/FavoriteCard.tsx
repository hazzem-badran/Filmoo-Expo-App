import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";


type FavoriteCardProps = {
  id: string;
  poster_url?: string;
  title: string;
};

const FavoriteCard = ({ 
  id,
  poster_url,
  title,
}: FavoriteCardProps) => {

  return (
    <Link href={`/movie/${id}`} asChild>
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
    </Link>
  );
};

export default FavoriteCard;
