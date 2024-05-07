import { router } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { images } from "../constants";
import CustomButton from "./CustomButton";

const WelcomePage = () => {
  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <View className="bg-white/20 rounded-full " style={{ padding: hp(5) }}>
        <View className="bg-white/20 rounded-full" style={{ padding: hp(5) }}>
          <Image
            source={images.r_logo}
            style={{ width: hp(20), height: hp(20) }}
            className="rounded-full"
          />
        </View>
      </View>
      <View className="flex items-centerspace-y-2">
        <Text
          style={{ fontSize: hp(7) }}
          className="text-white font-psemibold tracking-widest"
        >
          Cookly
        </Text>
        <Text
          style={{ fontSize: hp(3) }}
          className="text-gray font-medium tracking-widest -mt-7 ml-3"
        >
          Recipes You'll Love
        </Text>
      </View>
      <CustomButton
        title="Get Started"
        handlePress={() => router.push("/home")}
        containerStyle="w-3/4 mt-7 bg-white p-3 rounded-3xl"
      />
    </View>
  );
};

export default WelcomePage;
