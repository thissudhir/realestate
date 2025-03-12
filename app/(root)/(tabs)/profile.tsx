import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/lib/golobal-provider";
import { logout } from "@/lib/appwrite";

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  showArrow?: boolean;
  textStyle?: string;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  showArrow = true,
  textStyle,
}: SettingsItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row flex items-center justify-between py-3"
  >
    <View className="flex-row flex items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-rubik-bold text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>
    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);
const Profile = () => {
  const { user, refetch } = useGlobalContext();
  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert("Logout", "You have been logged out successfully");
      refetch();
    } else {
      Alert.alert("Error", "Something went wrong");
    }
  };
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex-row justify-between items-center flex mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>
        <View className="flex-row flex justify-center mt-5">
          <View className="flex-col flex relative items-center">
            <Image
              source={{ uri: user?.avatar }}
              className="size-44 relative rounded-full"
            />
            <TouchableOpacity className="absolute bottom-11 right-2 rounded-full ">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>
            <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
          </View>
        </View>
        <View className="flex-col flex mt-10">
          <SettingsItem icon={icons.calendar} title="My bookings" />
          <SettingsItem icon={icons.wallet} title="Payment" />
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-100">
          {settings.slice(2).map((setting, index) => (
            <SettingsItem key={index} {...setting} />
          ))}
        </View>
        <View className="flex flex-col mt-5 border-t pt-5 border-primary-100">
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            onPress={handleLogout}
            textStyle="text-danger"
            showArrow={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
