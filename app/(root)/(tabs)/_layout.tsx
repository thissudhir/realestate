import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import icons from "@/constants/icons";
const TabIcons = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: any;
  title: string;
}) => {
  return (
    <View className="flex-1 mt-3 flex flex-col items-center ">
      <Image
        source={icon}
        tintColor={focused ? "#FF6A00" : "#666876"}
        resizeMode="contain"
        className="size-6"
      />
      <Text
        className={`text-xs font-bold w-full text-center mt-1 ${
          focused
            ? "text-primary-300 font-rubik-medium"
            : "text-black-200 font-rubik"
        }`}
      >
        {title}
      </Text>
    </View>
  );
};
const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: 70,
        },
        tabBarActiveTintColor: "orange",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({ focused }) => (
            <TabIcons focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",

          tabBarIcon: ({ focused }) => (
            <TabIcons focused={focused} icon={icons.search} title="Explore" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",

          tabBarIcon: ({ focused }) => (
            <TabIcons focused={focused} icon={icons.person} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
