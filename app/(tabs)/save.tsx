import ErrorState from "@/components/ErrorState";
import FavoriteCard from "@/components/FavoriteCard";
import LoadingState from "@/components/LoadingState";
import Logo from "@/components/logo";
import { images } from "@/constants/images";
import { getFavoriteMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import React, { use, useCallback } from "react";
import { FlatList, Image, Text, View } from "react-native";

const MemoFavoriteCard = React.memo(FavoriteCard);


const Save = () => {
  const {
    data: movies,
    loading,
    error,
  } = useFetch(() => getFavoriteMovies(), true);

  const renderItem = useCallback(
    ({ item }: any) => (
      <MemoFavoriteCard
        poster_url={item.poster_url}
        title={item.title}
        id={item?.movie_id?.toString() ?? ""}
      />
    ),
    []
  );

  const keyExtractor = useCallback(
    (item: { id: number | string }) => item?.id?.toString(),
    []
  );

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute t-0 w-full h-full"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        // className="mt-2"

        ListHeaderComponent={
          <>
            <Logo />

            {loading && <LoadingState />}

            {error && <ErrorState message={error?.message} />}

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
        contentContainerStyle={{ paddingBottom: 118 }}
      />
    </View>
  );
};

export default Save;
