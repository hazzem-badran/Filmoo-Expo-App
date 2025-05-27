import { Client, Databases, ID, Query } from "react-native-appwrite";

// track the seaarches made by a user

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const LOVED_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_LOVED_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // EXPO_APPWRITE_ENDPOINT
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_ID!);

const databases = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        count: 1,
        movie_id: movie.id,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
  }

  // check if a record of that search has already been stored
  // if a document is found incremet th searchCount filed
  // if no document is found create ane doucument in appwrite database => 1
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(6),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const saveFavoriteMovie = async (movie: MovieDetails) => {
  try {
    const result = await databases.createDocument(
      DATABASE_ID,
      LOVED_COLLECTION_ID,
      ID.unique(),
      {
        movie_id: movie.id,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      }
    );
    return result;
  } catch (error) {
    console.error("Error saving favorite movie:", error);
  }
};

export const isFavoriteMovie = async (movieId: number): Promise<boolean> => {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID,
      LOVED_COLLECTION_ID,
      [Query.equal("movie_id", movieId)]
      //, Query.limit(1)
    );

    return result.documents.length > 0;
  } catch (error) {
    console.error("Error checking favorite movie:", error);
    return false;
  }
};

export const removeFavoriteMovie = async (movieId: number) => {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID,
      LOVED_COLLECTION_ID,
      [Query.equal("movie_id", movieId)]
    );

    if (result.documents.length > 0) {
      const documentId = result.documents[0].$id;
      await databases.deleteDocument(
        DATABASE_ID,
        LOVED_COLLECTION_ID,
        documentId
      );
    }
  } catch (error) {
    console.error("Error removing favorite movie:", error);
  }
};

export const getFavoriteMovies = async (): Promise<MovieDetails[]> => {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID,
      LOVED_COLLECTION_ID,
      [Query.limit(50)]
    );

    return result.documents as unknown as MovieDetails[];
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    return [];
  }
};
