import images from "@/constants/images";
import { router } from "expo-router";
import {Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react"
import TextField from "@/components/inputs/TextField";

export default function Index() {
  return (
    <SafeAreaView
      className='h-full bg-[#F5F5F5]'
    >
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View
        className="w-full h-[310px] bg-primary pt-[40px]"
        >
          <View className="flex-1 items-center flex-col gap-[15px] px-16">
            <Image
                source={images.Logo}
                className="w-[130px] h-[84px]"
                resizeMode="contain"
              />
            <View className="flex-1 flex-col gap-[10px] items-center">
              <Text className="font-semibold text-[24px] text-white uppercase text-center">Welcome To Mini-Bus Tracker</Text>
              <Text className="text-white text-center">The first Mini-Bus Tracker in San Isidro, Rodriguez, Rizal </Text>
            </View>
          </View>
        </View>
        <View className="flex flex-col gap-[20px] items-center transform -translate-y-[40px]">
          <View className="flex flex-col gap-[30px] items-center bg-white w-[336px] mx-auto rounded-[10px] px-[16px] pt-[20px] pb-[30px]">
            <Text className="text-[24px]">Login to your account</Text>
            <View className="w-full flex flex-col gap-[16px]">
              <TextField label="Email" type="text" placeholder="johndoe@gmail.com" className="" />
              <TextField label="Password" type="password" className="" />
              <Text className="text-center text-primary" onPress={()=>router.push("/forgot-pass")}>Forgot Password?</Text>
            </View>
          </View>
          <View className="flex flex-col items-center gap-[12px]">
            <TouchableOpacity
            className="rounded-[50px] px-[24px] py-[12px] bg-primary w-[210px] h-[50px] flex items-center justify-center"
            >
              <Text className="text-white font-bold text-[16px]">LOGIN</Text>
            </TouchableOpacity>
            <Text>Don&apos;t have an account? <Text className="text-primary font-bold" onPress={()=>router.push("/sign-up")}>SIGN UP</Text></Text>
          </View>
          <View className="flex flex-col gap-[12px] items-center">
            <View className="flex flex-row items-center gap-1">
              <Text className="bg-[#8B8C9F] w-12 h-[1px]" />
              <Text>or continue with</Text>
              <Text className="bg-[#8B8C9F] w-12 h-[1px]" />
            </View>
            <Image
              source={images.Google}
              className="w-[44px] h-[44px]"
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
