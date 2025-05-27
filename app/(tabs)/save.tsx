import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { use } from "react";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/services/useFetch";
import { getFavoriteMovies } from "@/services/appwrite";
import FavoriteCard from "@/components/FavoriteCard";

const Save = () => {
  const {
    data: movies,
    loading,
    error,
  } = useFetch(() => getFavoriteMovies(), true);

  return (
    <View className="bg-primary flex-1 ">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <FavoriteCard title={item.title} poster_url={item?.poster_path ?? ""} />
        )}
        keyExtractor={(item) => item.id?.toString()}
        className="px-5"
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperClassName="justifuy-center my-4 gap-4"
        contentContainerClassName="pb-10"
        ListHeaderComponent={
          <>
            <View className="flex-row items-center justify-center mt-20">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 text-xl px-5 py-3 text-center">
                {error?.message}
              </Text>
            )}

            {!loading && !error && movies && movies.length >= 0 && (
              <Text className="text-lg text-white font-bold mt-6">
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
