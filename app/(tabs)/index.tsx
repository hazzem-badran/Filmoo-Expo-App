import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: loadingMovies,
    error: errorMovies,
  } = useFetch(() => fetchMovies({ query: "" }), true);
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
          minHeight: "100%",
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {loadingMovies || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : errorMovies || trendingError ? (
          <Text className="text-white text-2xl">
            Error: {errorMovies?.message || trendingError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              placeholder="Search for a movie"
              onPress={() => router.push("/search")}
            />

            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mt-5 mb-3 ">
                  Trending Movies
                </Text>
              </View>
            )}

            <>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className="w-4" />}
                className="mb-4 mt-3"
                data={trendingMovies}
                renderItem={({ item, index }) => (
                  <TrendingCard movie={item} index={index} />
                )}
                keyExtractor={(item) => item.movie_id.toString()}
              />

              <Text className="text-white text-lg font-bold mt-5">
                Latest Movies
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  paddingRight: 5,
                  marginBottom: 10,
                  gap: 20,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
