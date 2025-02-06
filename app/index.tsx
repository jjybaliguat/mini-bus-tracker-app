import images from "@/constants/images";
import { router } from "expo-router";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView
      className='h-full bg-[#F5F5F5]'
    >
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View
        className="w-full h-[330px] bg-primary pt-[50px]"
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
        <View className="flex flex-col gap-[20px] items-center transform -translate-y-12">
          <View className="bg-white h-[322px] w-[336px] mx-auto rounded-[10px]">
          
          </View>
          <View className="w-full flex flex-col items-center gap-[16px]">
            <TouchableOpacity
            className="rounded-[50px] px-[24px] py-[12px] bg-primary w-[210px] h-[50px] flex items-center justify-center"
            >
              <Text className="text-white font-bold text-[16px]">LOGIN</Text>
            </TouchableOpacity>
            <Text>Don&apos;t have an account? <Text className="text-primary font-bold" onPress={()=>router.push("/sign-up/index")}>SIGN UP</Text></Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
