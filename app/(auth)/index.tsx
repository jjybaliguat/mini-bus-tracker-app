import React, { useState } from "react"
import images from "@/constants/images";
import { router } from "expo-router";
import {Alert, Button, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import TextField from "@/components/inputs/TextField";
import { Controller, useForm } from "react-hook-form"
import { useAuth } from "@/context/AuthContext";

type FormData = {
  email: string;
  password: string;
};

export default function Index() {
  const {onLogin} = useAuth()
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ password?: string; email?: string }>({});

  const validateForm = async() => {
    let newErrors: { password?: string; email?: string } = {};

    if (!password.trim()) newErrors.password = "Password is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);

    if(!errors.email && !errors.password){
      await onLogin!(email, password)
    }
  };

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
              <View className="flex flex-col gap-1">
                <TextField 
                  label="Email" type="email" 
                  placeholder="johndoe@gmail.com" 
                  className=""
                  onChange={setEmail}
                  value={email}
                  hasError={errors.email? true : false}
                />
                {errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}
              </View>
              <View className="flex flex-col gap-1">
                <TextField 
                  label="Password" 
                  type="password" 
                  className="" 
                  onChange={setPassword}
                  value={password}
                  hasError={errors.password? true : false}
                />
                {errors.password && <Text style={{ color: "red" }}>{errors.password}</Text>}
              </View>
              <Text className="text-center text-primary" onPress={()=>router.push("/forgot-pass")}>Forgot Password?</Text>
            </View>
          </View>
          <View className="flex flex-col items-center gap-[12px]">
            <TouchableOpacity
            className="rounded-[50px] px-[24px] py-[12px] bg-primary w-[210px] h-[50px] flex items-center justify-center"
            onPress={validateForm}
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
