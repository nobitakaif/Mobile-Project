import { BANNERS, dummyProducts } from "@/assets/assetes-ecommerce/assets/assets";
import React, { useEffect, useState } from "react";
import Header from "@/components/header";
import { ActivityIndicator, Dimensions, Image, ScrollView, Text, Touchable, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { CATEGORIES } from "@/constants";
import CategoryItem from "@/components/categoryItem";
import { Product } from "@/constants/types";
import ProductCart from "@/components/productCart";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window")
export default function Home() {
    const router = useRouter()
    const [activeBannerIndex, setActiveBannerIndex] = useState(0)
    const catogries = [{id:'all', name : 'All', icon : 'grid'},...CATEGORIES]
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    const fetchProduct = async () =>{
        setProducts(dummyProducts)
        setLoading(false)
    }

    useEffect(()=>{
        fetchProduct()
    },[])
    
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
            <View>
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-xl font-bold text-primary"> Categories </Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {catogries.map((cat,idx) =>(
                        <CategoryItem item={cat} key={idx} isSelected={false} onPress={()=> router.push({pathname : "/shop", params : {category : cat.id === 'all' ? '' : cat.name}})}/>
                    ))}
                </ScrollView>
            </View>

            <View className="mb-8">
                <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-xl font-bold">Popular</Text>
                        <TouchableOpacity onPress={() => router.push("/shop")}>
                            <Text className="text-secondary text-sm">See All</Text>
                        </TouchableOpacity>
                </View>
                {loading ? (
                        <ActivityIndicator size={"large"}/>
                    ):(
                        <View className="flex-row flex-wrap justify-between">
                            {products.slice(0,4).map((product) =>(
                                <ProductCart key={product._id} product={product}/>
                            ))}
                        </View>
                        
                    )
                }
            </View>
            
            <View className="bg-gray-100 p6 rounded-2xl mb-20 items-center">
                <Text className="text-2xl font-bold text-primary mb-2 text-center">Join the Revolution</Text>
                <Text className="text-secondary text-center mb-4 font-semibold">
                    Subscribe to our newsletter and get 10% off your first purchase
                </Text>
                <TouchableOpacity className="bg-primary w-4/5 py-3 rounded-full items-center">
                    <Text className="text-white font-medium text-base">Subscribe Now</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    </SafeAreaView>
}