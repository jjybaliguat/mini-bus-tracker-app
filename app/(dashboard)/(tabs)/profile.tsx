import { View, Text, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '@/context/AuthContext'

const ProfilePage = () => {
  const {onLogout} = useAuth()
  return (
    <SafeAreaView>
        <View>
            <Text>ProfilePage</Text>
            <Button title='Logout' onPress={async()=>await onLogout!()} />
        </View>
    </SafeAreaView>
  )
}

export default ProfilePage