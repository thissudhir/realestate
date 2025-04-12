import { FeaturedCards, Cards } from "@/components/Cards";
import Filter from "@/components/Filter";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/golobal-provider";
import seed from "@/lib/seed";
import { useAppwrite } from "@/lib/useAppwrite";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Explore() {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    },
    skip: false,
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);
  useEffect(() => {
    if (params.query) {
      refetch({
        filter: params.filter!,
        query: params.query!,
        limit: 20,
      });
    }
  }, [params.query, params.filter]);

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <Cards item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item, index) => item.$id || index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex-row gap-5 px-5"
        ListHeaderComponent={
          <View className="px-5 ">
            <View className="flex flex-row items-center justify-between mt-5 ">
              <TouchableOpacity
                className="flex flex-row bg-primary-100 rounded-full size-11 justify-center items-center "
                onPress={() => router.back()}
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>
              <Text className="text-base font-rubik-medium mr-2 text-center text-black-300">
                Search for your Idean home
              </Text>
              <Image source={icons.bell} className="w-6 h-6" />
            </View>

            <Search />
            <View className="mt-5">
              <Filter />
              <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                {" "}
                Found {properties?.length} properties
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
