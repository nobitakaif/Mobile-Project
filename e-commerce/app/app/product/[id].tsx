import { dummyProducts } from "@/assets/assetes-ecommerce/assets/assets";
import { COLORS } from "@/constants";
import { Product } from "@/constants/types";
import { useCart } from "@/context/cartContext";
import { useWhishlist } from "@/context/wishlistContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const {width} = Dimensions.get("window")

export default function ProducctDetails(){
    
    const { id } = useLocalSearchParams()
    const router = useRouter()
    const [prodcut, setProduct ] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const {addToCart, cartItem} = useCart()
    const { toggleWishlist, isInWishlist} = useWhishlist()
    const [ selectedSize, setSelectedSize ] = useState<string|null>(null)
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    const fetchProduct = ()=>{
        setProduct(dummyProducts.find((prodcut)=> prodcut._id === id) as any)
        setLoading(false)
    }
    
    useEffect(()=>{
        fetchProduct()
    },[])

    if(loading){
        return <SafeAreaView className="flex-1 justify-center items-center">
            <ActivityIndicator size={"large"} color={COLORS.primary}/>
        </SafeAreaView>
    }

    if(!prodcut){
        return <SafeAreaView className="flex-1 justify-center items-center">
            <Text>Product not found </Text>
        </SafeAreaView>
    }

    const isLiked = isInWishlist(prodcut._id)

    return <View className="flex-1 bg-white">
        <ScrollView contentContainerStyle={{paddingBottom : 100}}>
            <View className="relative h-[450px] bg-gray-100 mb-6">
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
                    {prodcut.images.map((img, idx)=>(
                        <Image key={idx} source={{uri: img}} style={{width : width, height : 450}} resizeMode="cover"/>
                    ))}
                </ScrollView>
            </View>
        </ScrollView>
        
        <View className="absolute top-12 left-4 right-4 flex-row justify-between items-center z-10">
            <TouchableOpacity onPress={()=> router.back()} className="w-10 h-10 bg-white/80 rounded-full items-center justify-center">
                <Ionicons name="arrow-back" size={24} color={COLORS.primary}/>
            </TouchableOpacity>
            
            <TouchableOpacity className="w-10 h-10 rounded-full items-center justify-center" onPressIn={()=>toggleWishlist(prodcut)}>
                <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={24} color={isLiked ? COLORS.accent : COLORS.primary }/>
            </TouchableOpacity>

        </View>
    </View>
}