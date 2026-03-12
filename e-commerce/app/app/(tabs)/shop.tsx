import { dummyProducts } from "@/assets/assetes-ecommerce/assets/assets";
import Header from "@/components/header";
import ProductCart from "@/components/productCart";
import { COLORS } from "@/constants";
import { Product } from "@/constants/types";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Shop(){

    const [ prodcut, setProduct ] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [page, setPage] = useState(1)
    const [hashMore, setHashMore] = useState(true)

    const fetchProducts = async (pageNumber = 1)=>{
        if(pageNumber === 1){
            setLoading(true)
        }
        else{
            setLoadingMore(true)
        }
        try{
            const start = (pageNumber - 1) * 10;
            const end = start +10

            const paginationDAta = dummyProducts.slice(start, end)
            if(pageNumber ===1){
                setProduct(paginationDAta)
            }
            else{
                setProduct(prev => [...prev, ...paginationDAta])
            }

            setHashMore(end < dummyProducts.length)
            setPage(pageNumber)
        }catch(e){
            console.error("pagination error : ",e)
        }finally{
            // this finally block will always run 
            setLoading(false)
            setLoadingMore(false)
        }
    }

    const loadMore = ()=>{
        if(!loadingMore && !loading && hashMore){
            fetchProducts(page+1)
        }
    }
    
    useEffect(()=>{
        fetchProducts(1)
    },[])

    
    return (
        <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
            <Header title="Shop" showBack showCart/>

            <View className="flex-row gap-2 mb-3 mx-4 my-2">
                <View className="flex-1 flex-row items-center bg-white rounded-xl border border-gray-100">
                    <Ionicons name="search" className="ml-4 px-1 py-4 " size={20} color={COLORS.secondary}/>
                    <TextInput className="flex-1 ml-2 text-primary px-4 py-3 " placeholder="Search products..." returnKeyType="search"/>
                </View>
                <TouchableOpacity className="bg-gray-800 w-12 h-12 items-center justify-center rounded-xl">
                    <Ionicons name="options" size={24} color={'black'}/>
                </TouchableOpacity>
            </View>

            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size={"large"} color={COLORS.primary}/>
                </View>
            ) : (
                <FlatList data={prodcut} keyExtractor={(item)=> item._id} numColumns={2} contentContainerStyle={{
                    padding : 16,
                    paddingBottom : 100
                }} columnWrapperStyle={{justifyContent: 'space-between'}} renderItem={({item})=>(
                    <ProductCart product={item}/>
                )} onEndReached={loadMore} onEndReachedThreshold={0.5} 
                    ListFooterComponent={loadingMore ? (
                        <View>
                            <ActivityIndicator size={"small"} color={COLORS.primary}/>
                        </View>
                    ) : null
                } ListEmptyComponent={
                    !loading && (
                        <View className="flex-1 items-center justify-center py-20">
                            <Text className="text-secondary">No Product found</Text>
                        </View>
                    )
                }
                />

            )}
            
        </SafeAreaView>
    )
}