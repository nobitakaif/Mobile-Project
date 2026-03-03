import { COLORS } from "@/constants";
import { ProductCardProps } from "@/constants/types";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";


export default function ProductCart({ product }: ProductCardProps) {

    const isLiked = true
    
    return (
        <Link href={`/porduct/${product._id}`} asChild>
            <TouchableOpacity className="w-[48%] mb-4 bg-white rounded-lg overflow-hidden">
                <View className="relative h-56 w-full bg-gray-100">
                    <Image source={{uri : product.images[0]}} className="w-full h-full" resizeMode="cover" />
                    <TouchableOpacity className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-sm " onPress={(e)=>{
                        e.stopPropagation()
                    }}>
                        <Ionicons name={isLiked ? 'heart' : 'heart-outline'} color={isLiked ? COLORS.accent : COLORS.primary}/>
                    </TouchableOpacity>

                    {
                        product.isFeatured && (
                            <View className="absolute top-2 left-2 bg-black px-2 py-1 rounded" key={product._id}>
                                <Text className="text-white font-bold uppercase text-xs ">Featured</Text>
                            </View>
                        )
                    }
                </View>
                <View className="p-3">
                    <View className="flex-row items-center mb-1">
                        <Ionicons name="star" size={12} color={"#ffd700"}/>
                        <Text className="text-secondary text-xs ml-1 font-bold">4.6</Text>
                    </View>
                    <Text className="text-primary font-bold text-sm mb-1" numberOfLines={1}>{product.name}</Text>
                    <View className="flex-row items-center">
                        <Text className="font-bold text-primary text-base">
                            ${product.price.toFixed(2)}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    )
}