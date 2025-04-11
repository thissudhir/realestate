import { FeaturedCards, Cards } from "@/components/Cards";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/golobal-provider";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user, refetch } = useGlobalContext();
  return (
    <SafeAreaView className="h-full bg-white">
      <View className="px-5">
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row items-center ">
            <Image
              source={{ uri: user?.avatar }}
              className="size-12 rounded-full"
            />
            <View className="flex flex-col items-start ml-2 justify-center">
              <Text className="text-xs font-rubik text-black-100">
                Good Morning
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
          <View className="flex flex-row gap-5 mt-5">
            <FeaturedCards />
            <FeaturedCards />
          </View>
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

        <View className="flex flex-row gap-5 mt-5">
          <Cards />
          <Cards />
        </View>
      </View>
    </SafeAreaView>
  );
}
