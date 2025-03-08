// import { API_KEY, API_URL, TOKEN_KEY } from "@/constants";
// import { User } from "@/types/user";
// import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store'
import { useSegments, useRouter, Redirect } from "expo-router";
import { isLoading } from "expo-font";
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import { useAuthRequest } from "expo-auth-session";
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession()

interface AuthProps {
    authState?: {token: string | null, authenticated: boolean| null, user: any | null};
    onLogin?: (email: string, password: string) => Promise<any>;
    googleLogin?: () => Promise<any>,
    onLogout?: () => Promise<any>,
    isLoading?: boolean | null
}

const AuthContext = createContext<AuthProps>({})
 
export const useAuth = () => {
    return useContext(AuthContext)
}

export default function AuthProvider({children} :  any){
    // android 380579544429-lesmose9dinj7b0g9f6cc1o5eqa8mi89.apps.googleusercontent.com
    const [authState, setAuthState] = useState<{
        token: string | null,
        authenticated: boolean | null,
        user: any | null
    }>({
        token: null,
        authenticated: false,
        user: null
    })
    const segments = useSegments();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const [request, response, promtAsync] = Google.useAuthRequest({
        androidClientId: "380579544429-lesmose9dinj7b0g9f6cc1o5eqa8mi89.apps.googleusercontent.com",
        webClientId: "380579544429-tqopnkgoqvsl5q3vs8dtbl1c6svt3p8v.apps.googleusercontent.com",
    })

    async function handleSignInWithGoogle(){
        const user = await SecureStore.getItemAsync("sessionUser")
        if(!user){
            if(response?.type === "success"){
                await getUserInfo(response.authentication?.accessToken)
            }
        }else{
            setAuthState({
                token: response?.authentication?.accessToken,
                authenticated: true,
                user
            })
        }
    }

    useEffect(()=> {
        handleSignInWithGoogle()
    }, [response])

    const getUserInfo = async (token: string | undefined) => {
        if(!token) return

        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            const user = await response.json()
            await SecureStore.setItemAsync("sessionUser", JSON.stringify(user))
            setAuthState({
                token: token,
                authenticated: true,
                user: user
            })
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(()=> {
        const loadToken = async() => {
            setAuthState({
                        token :  null,
                        authenticated: true,
                        user: null
                    })
            // const token = await SecureStore.getItemAsync(TOKEN_KEY)
            const user: any = await SecureStore.getItemAsync("sessionUser")
            if(user){
                setAuthState({
                    token: null,
                    authenticated: true,
                    user: JSON.parse(user)
                })
                setLoading(false)
            }else{
                setAuthState({
                    token :  null,
                    authenticated: false,
                    user: null
                })
                // const inProtectedRoute = segments[0] === "(screens)" && segments[1] === "(dashboard)";
                //     // console.log(inProtectedRoute)

                // if (!authState.authenticated && inProtectedRoute) {
                // router.replace("/(screens)/Login"); // Redirect to login
                // }
            }
        }

        loadToken()
    }, [])

    useEffect(() => {
        if (authState.token === null) return; // Prevent unnecessary redirects
    
        const inProtectedRoute = segments[0] === "(dashboard)" // Protect dashboard routes
    
        if (!authState.authenticated && inProtectedRoute) {
            router.replace("/(auth)"); // Redirect to login if not authenticated
        }
      }, [authState, segments, router]);

    const login = async (email: string, password: string) => {
        if(email === "justinejeraldbaliguat@gmail.com" || password === "AdmiN@11235"){        
            setAuthState({
                token: null,
                authenticated: true,
                user: null
            })
            router.replace("/(dashboard)/(tabs)")
        }
        // try {
        //     const response = await axios.post(`${API_URL}/login`, {
        //         email,
        //         password
        //     })
        //     if(response.data.user){
        //         setAuthState({
        //             token: response.data.token,
        //             authenticated: true,
        //             user: response.data.user
        //         })
        //         await SecureStore.setItemAsync(TOKEN_KEY, response.data.token)
        //         await SecureStore.setItemAsync("sessionUser", JSON.stringify(response.data.user))
        //         axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
        //         router.replace("/(screens)/(dashboard)/(tabs)")
        //     }else{
        //         setAuthState({
        //             token: null,
        //             authenticated: null,
        //             user: null
        //         })
        //     }

        //     return response.data

        // } catch (error) {
        //     console.log(error)
        //     return null
        // }
    }

    const logout = async () => {
        try {
            // await SecureStore.deleteItemAsync(TOKEN_KEY)
            // await SecureStore.deleteItemAsync("sessionUser");
            // axios.defaults.headers.common['Authorization'] = ''
            setAuthState({
                token: null,
                authenticated: null,
                user: null
            })
            router.replace("/(auth)")
        } catch (error) {
            console.log(error)
        }
    }

    const value = {
        onLogin: login,
        onLogout: logout,
        googleLogin: () => promtAsync(),
        authState,
        isLoading: loading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}