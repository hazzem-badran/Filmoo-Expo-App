import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import Logo from "@/components/logo";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React, { memo, useCallback } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";

const MemoMovieCard = memo(MovieCard);

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: loadingMovies,
    error: errorMovies,
  } = useFetch(() => fetchMovies({ query: "" }), true);

  const keyExtractor = useCallback(
    (item: { id: number | string }) => item.id.toString(),
    []
  );

  const renderItem = useCallback(
    ({ item }: any) => <MemoMovieCard {...item} />,
    []
  );

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute t-0 w-full h-full"
        resizeMode="cover"
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
          minHeight: "100%",
        }}
      >
        <Logo />

        {loadingMovies ? (
          <LoadingState />
        ) : errorMovies ? (
          <ErrorState message={errorMovies?.message} />
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              placeholder="Search for a movie"
              onPress={() => router.push("/search")}
            />

            <>
              <Text className="text-white text-lg font-bold mt-5">
                Latest Movies
              </Text>
              <FlatList
                data={movies}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  paddingRight: 5,
                  marginBottom: 10,
                  gap: 20,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
                initialNumToRender={9}
                removeClippedSubviews
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
