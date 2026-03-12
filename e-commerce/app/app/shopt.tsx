import { dummyProducts } from "@/assets/assetes-ecommerce/assets/assets";
import Header from "@/components/header";
import { Product } from "@/constants/types";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
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

            </View>
            
        </SafeAreaView>
    )
}