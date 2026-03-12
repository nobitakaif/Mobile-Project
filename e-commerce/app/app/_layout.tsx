import { Stack } from "expo-router";

import "../global.css"
import { CartProvider } from "@/context/cartContext";
import { WishlistProvider } from "@/context/wishlistContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

export default function RootLayout(){
    return (
        <GestureHandlerRootView style={{flex : 1 }}>
            <CartProvider>
                <WishlistProvider>
                <Stack screenOptions={{
                    headerShown : false
                }}/>
                <Toast position="top" />
                </WishlistProvider>
            </CartProvider>
        </GestureHandlerRootView>        

    )
}