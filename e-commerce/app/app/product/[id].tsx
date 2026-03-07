import { dummyProducts } from "@/assets/assetes-ecommerce/assets/assets";
import { COLORS } from "@/constants";
import { Product } from "@/constants/types";
import { useCart } from "@/context/cartContext";
import { useWhishlist } from "@/context/wishlistContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const {width} = Dimensions.get("window")

export default function ProducctDetails(){
    
    const { id } = useLocalSearchParams()
    const router = useRouter()
    const [prodcut, setProduct ] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const {addToCart, cartItem, itemCount} = useCart()
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

    const handleAddToCart = () =>{
        if(!selectedSize){
            Toast.show({
                type : 'info',
                text1 : "No size selected",
                text2 : "Please select a size"
            })
            return  
        }
        
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
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} scrollEventThrottle={16}
                onScroll={(e : any)=>{
                    const slide = Math.ceil(e.nativeEvent.contentOffset / e.nativeEvent.layoutMeasurement.width)
                    setActiveImageIndex(slide)
                }}
                >
                    {prodcut.images.map((img, idx)=>(
                        <Image key={idx} source={{uri: img}} style={{width : width, height : 450}} resizeMode="cover"/>
                    ))}
                </ScrollView>

                 <View className="absolute top-12 left-4 right-4 flex-row justify-between items-center z-10">
                    <TouchableOpacity onPress={()=> router.back()} className="w-10 h-10 bg-white/80 rounded-full items-center justify-center">
                        <Ionicons name="arrow-back" size={24} color={COLORS.primary}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity className="w-10 h-10 rounded-full items-center justify-center" onPressIn={()=>toggleWishlist(prodcut)}>
                        <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={24} color={isLiked ? COLORS.accent : COLORS.primary }/>
                    </TouchableOpacity>
                </View>

                <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-2">
                    {prodcut.images?.map((_, index) =>(
                        <View className={`h-2 rounded-full ${index === activeImageIndex ? 'w-6 bg-primary' : 'w-2 bg-gray-300'}`} key={index}>

                        </View>
                    ))}
                </View>
            </View>

            <View className="px-5">
                    <View className="flex-row justify-between items-start mb-2">
                        <Text className="text-2xl font-bold text-primary flex-1 mr-4 ">{prodcut.name}</Text>
                        <View className="flex-row gap-1">
                            <Ionicons name="star" size={14} color={"#ffd700"}/>
                            <Text className="text-sm font-bold ml-1">4.6</Text>
                            <Text className="text-sm font-bold ml-1 text-secondary">(85)</Text>
                        </View>
                    </View>
                    <Text className="text-2xl font-bold text-primary mb-6">${prodcut.price.toFixed(2)}</Text>

                    {prodcut.sizes && prodcut.sizes.length > 0 && (
                        <>
                            <Text className="text-base font-bold text-primary mb-3">Size</Text>
                            <View className="flex-row gap-3 mb-6 flex-wrap">
                                {prodcut.sizes.map((size) => (
                                    <TouchableOpacity key={size} onPress={()=>{
                                        setSelectedSize(size)
                                    }} className={`w-12 h-12 rounded-lg items-center justify-center border border-gray-600 ${selectedSize == size ? 'bg-primary border-primary text-white' : 'bg-white border-gray-100'}`}>
                                            <Text className={`${selectedSize == size? 'text-white' : 'text-black'}`}>{size}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </>
                    )}
                    <Text className="font-bold text-lg text-primary mb-2">Description</Text>
                    <Text className="text-sm text-gray-500 font-semibold">{prodcut.description}</Text>
            </View>
        </ScrollView>   

        <View className="absolute bottom-0 left-0 flex-row right-0 p-4 bg-white border-t  border-t-gray-200 rounded-full border-x-gray-100">
            <TouchableOpacity className="flex-row gap-4 border border-gray-600 px-4 py-3 rounded-full w-4/5 justify-center items-center bg-black" onPress={handleAddToCart}>
                <Ionicons name="bag-outline" size={20} color={"white"}/>
                <Text className="font-bold text-lg text-white">Add to Cart</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="w-1/5 py-3 flex-row justify-center relative" onPress={()=> router.push("/(tabs)/cart")}>
                <Ionicons name="cart-outline" size={20} color={"balck"}/>
                <View className="absolute top-2 right-4 size-4 z-10 bg-black rounded-full justify-center items-center">
                    <Text className="font-bold text-[9px] text-white">{itemCount}</Text>
                </View>
                
            </TouchableOpacity>
        </View>
    </View>
}