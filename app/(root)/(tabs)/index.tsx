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

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();
  const { data: latestProperties, loading: loadingLatestProperties } =
    useAppwrite({
      fn: getLatestProperties,
    });
  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: false,
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);
  useEffect(() => {
    if (params.query) {
      refetch({
        filter: params.filter!,
        query: params.query!,
        limit: 6,
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
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center ">
                <Image
                  source={{ uri: user?.avatar }}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-black-100">
                    Welcome
                  </Text>
                  <Text className="text-base text-black-300 font-rubik-medium">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>

            <Search />

            <View className="my-5">
              <View className="flex flex-row items-center justify-between ">
                <Text className="text-xl text-black-300 font-rubik-bold">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base text-primary-300 font-rubik-bold">
                    View All
                  </Text>
                </TouchableOpacity>
              </View>

              {loadingLatestProperties ? (
                <ActivityIndicator
                  size="large"
                  className="text-primary-300 mt-5"
                />
              ) : !latestProperties || latestProperties.length === 0 ? (
                <NoResults />
              ) : (
                <FlatList
                  data={latestProperties}
                  renderItem={({ item }) => (
                    <FeaturedCards
                      item={item}
                      onPress={() => handleCardPress(item.$id)}
                    />
                  )}
                  keyExtractor={(item) => item.$id || item.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="flex gap-5 mt-3"
                  bounces={false}
                />
              )}
            </View>
            <View className="flex flex-row items-center justify-between ">
              <Text className="text-xl text-black-300 font-rubik-bold">
                Popular
              </Text>
              <TouchableOpacity>
                <Text className="text-base text-primary-300 font-rubik-bold">
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            <Filter />
          </View>
        }
      />
    </SafeAreaView>
  );
}
