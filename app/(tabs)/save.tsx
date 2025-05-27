import FavoriteCard from "@/components/FavoriteCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getFavoriteMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import React from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Save = () => {
  const {
    data: movies,
    loading,
    error,
  } = useFetch(() => getFavoriteMovies(), true);

  console.log(movies, "Favorite movies data");

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute t-0 w-full h-full"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <FavoriteCard
            poster_url={item.poster_url}
            title={item.title} 
            id={item?.movie_id?.toString() ?? ""}
          />
        )}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        className="mt-2"
        ListHeaderComponent={
          <>
            <View className="flex-row items-center justify-center mt-20">
              <Image source={icons.logo} className="w-12 h-12" />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#f0be44"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 text-xl px-5 py-3 text-center">
                {error?.message}
              </Text>
            )}

            {!loading && !error && movies && movies.length >= 0 && (
              <Text className="text-lg text-white font-bold px-5 my-6">
                Your <Text className="text-accent"> favorite</Text> movies
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-gray-500 text-xl text-center mt-10">
                No favorite movies found.
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Save;
