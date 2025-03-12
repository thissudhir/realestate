import { View, Text, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, usePathname } from "expo-router";
import icons from "@/constants/icons";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query || "");
  const handleSearch = (text: string) => {
    setSearch(text);
  };
  return (
    <View className="flex flex-row items-center justify-between mt-5 w-full px-4 rounded-lg bg-accent-100 border border-primary-100 py-2">
      <View className="flex flex-row items-center flex-1 z-50 justify-start">
        <Image source={icons.search} className="size-5" />
        <TextInput />
      </View>
    </View>
  );
};

export default Search;
