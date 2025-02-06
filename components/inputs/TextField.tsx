import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import images from '@/constants/images'

const TextField = ({
    label,
    type,
    placeholder,
    className
} : {
    label?: string,
    type: "text" | "number" | "password",
    placeholder?: string,
    className?: string
}) => {
    const [focused, setFocused] = useState(false)
    const [showPass, setShowPass] = useState(false)

  return (
    <View className='flex flex-col gap-[4px]'>
      <Text className='text-[14px] font-bold text-[#32343D]'>{label}</Text>
      <View className={`group flex flex-row items-center px-[14px] py-[2px] gap-[20px] border rounded-lg ${focused ? "border-primary" : "border-slate-200"}`}>
        <TextInput
            secureTextEntry={(type === "password" && !showPass) ? true : false}
            keyboardType={type === "number" ? "numeric" : undefined}
            className={`flex-1 ${className}`}
            placeholder={placeholder}
            onFocus={()=>setFocused(true)}
            onBlur={()=>setFocused(false)}
        />
        {type === "password" &&
            <TouchableOpacity
                onPress={()=>setShowPass(!showPass)}
            >
                <Image
                    source={showPass? images.EyeOpen : images.EyeClose}
                    className="h-[24px] w-[24px]"
                    resizeMode="contain"
                />
            </TouchableOpacity>
        }
      </View>
    </View>
  )
}

export default TextField