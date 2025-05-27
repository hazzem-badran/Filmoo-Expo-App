import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type FavoriteCardProps = {
  title: string;
  poster_url: URL | string;
  onPress?: () => void;
};

const FavoriteCard: React.FC<FavoriteCardProps> = ({ title, poster_url, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
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
    }}
  >
    <Image
      source={{ uri: typeof poster_url === "string" ? poster_url : poster_url.toString() }}
      style={{ width: "100%", height: 220, resizeMode: "cover" }}
    />
    <View style={{ padding: 16 }}>
      <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }} numberOfLines={2}>
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);

export default FavoriteCard;