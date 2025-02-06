import TextField from "@/components/inputs/TextField";
import images from "@/constants/images";
import { router } from "expo-router";
import {Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

const SignUp = () => {
  return (
    <SafeAreaView
      className='h-full bg-[#F5F5F5]'
    >
      <ScrollView>
        <View
        className="w-full h-[310px] bg-primary pt-[40px]"
        >
          <View className="flex-1 items-center flex-col gap-[20px] px-16">
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
          <View className="flex flex-col gap-[15px] items-center bg-white w-[336px] mx-auto rounded-[10px] px-[16px] pt-[20px] pb-[32px]">
            <Text className="text-[24px]">Sign Up</Text>
            <View className="w-full flex flex-col gap-[16px]">
              <TextField label="Full Name" type="text" placeholder="" className="" />
              <TextField label="Email" type="text" placeholder="please enter a valid email" className="" />
              <TextField label="Password" type="password" className="" />
              <TextField label="Confirm Password" type="password" className="" />
            </View>
          </View>
          <View className="w-full flex flex-col items-center gap-[16px]">
            <TouchableOpacity
            className="rounded-[50px] px-[24px] py-[12px] bg-primary w-[210px] h-[50px] flex items-center justify-center"
            >
              <Text className="text-white font-bold text-[16px]">SIGN-UP</Text>
            </TouchableOpacity>
            <Text>Already have an account? <Text className="text-primary font-bold" onPress={()=>router.replace("/")}>SIGN IN</Text></Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp