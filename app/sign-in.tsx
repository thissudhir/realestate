import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/golobal-provider";
import { Redirect } from "expo-router";

const SignIn = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext(); //note: Use the global context to get the refetch function

  if (!loading && isLoggedIn) return <Redirect href="/" />; //note: Redirect to home if user is logged in
  //note: Function to handle login when the button is pressed
  const handleLogin = async () => {
    const result = await login(); //note: Call the login function from appwrite
    if (result) {
      refetch(); //note: Refetch the data to update the UI
      console.log("Login successfully"); //note: Log success message if login is successful
    } else {
      Alert.alert("Error", "Failed to login"); //note: Show an alert if login fails
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      {" "}
      {/*note: SafeAreaView to ensure content is within safe area boundaries*/}
      <ScrollView contentContainerClassName="h-full">
        {" "}
        {/*note: ScrollView to allow scrolling of content*/}
        <Image
          source={images.onboarding} //note: Source of the onboarding image
          className="w-full h-4/6" //note: Set width and height of the image
          resizeMode="contain" //note: Resize mode to contain the image within the bounds
        />
        <View className="px-10">
          {" "}
          {/*note: Container for the text and button with padding*/}
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to RealEstate {/*note: Welcome text*/}
          </Text>
          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Lets Get You Closer to {"\n"}{" "}
            <Text className="text-primary-300">Your Ideal Home</Text>{" "}
            {/*note: Main heading with highlighted text*/}
          </Text>
          <Text className="text-lg text-center font-rubik text-black-200 mt-12">
            Login to RealEstate with Google{" "}
            {/*note: Instruction text for login*/}
          </Text>
          <TouchableOpacity
            onPress={handleLogin} //note: Call handleLogin function when button is pressed
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
          >
            <View className="flex flex-row items-center justify-center">
              {" "}
              {/*note: Container for the button content*/}
              <Image
                source={icons.google} //note: Source of the Google icon
                className="w-5 h-5" //note: Set width and height of the icon
                resizeMode="contain" //note: Resize mode to contain the icon within the bounds
              />{" "}
              <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                Continue with Google {/*note: Button text*/}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
