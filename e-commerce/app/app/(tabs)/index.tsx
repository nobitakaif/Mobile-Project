import { BANNERS } from "@/assets/assetes-ecommerce/assets/assets";
import React, { useState } from "react";
import Header from "@/components/header";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window")
export default function Home() {
    const router = useRouter()
    const [activeBannerIndex, setActiveBannerIndex] = useState(0)
    return <SafeAreaView className="flex-1 " edges={['top']}>
        <Header showBack={false} title="Forver" showCart showLogo showMenu />

        <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
            <View className="mb-6">
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} className="w-full h-48 rounded-xl" scrollEventThrottle={16}
                    onScroll={(e) => {
                        const slide = Math.ceil(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width)
                        if (slide !== activeBannerIndex) {
                            setActiveBannerIndex(slide)
                        }
                    }}
                >
                    {BANNERS.map((banner, index) => (
                        <View key={index} className="relative w-full h-48 bg-gray-200 overflow-hidden" style={{
                            width: width - 32
                        }}>
                            <Image source={{ uri: banner.image }} className="w-full h-full" resizeMode="cover" />
                            <View className="absolute bottom-4 left-4 z-10">
                                <Text className="text-white font-bold text-2xl">{banner.title}</Text>
                                <Text className="text-white text-sm font-medium">{banner.subtitle}</Text>
                                <TouchableOpacity className="bg-white  rounded-full px-2 mt-2 py-2">
                                    <Text className="font-bold text-primary text-center">
                                        Get Now
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View className="absolute inset-0 bg-black/40" />
                        </View>
                    ))}
                </ScrollView>
                {/* Dot slide view */}
                <View className="flex-row justify-center items-center gap-2 mt-2">
                    {BANNERS.map((_, index) => (
                        <View key={index} className={`h-2 rounded-full ${index === activeBannerIndex ? 'w-6 bg-primary' : 'w-2 bg-gray-300'}`}>

                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>


    </SafeAreaView>
}