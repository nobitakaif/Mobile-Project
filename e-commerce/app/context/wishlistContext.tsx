import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { Product, WishlistContextType} from "@/constants/types";
import { dummyWishlist } from "@/assets/assetes-ecommerce/assets/assets";

const WishListContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({children}:{children : ReactNode}){

    const [wishlist, setWishlist] = useState<Product[]>([])
    const [ loading, setLoading ] = useState(false)

    const fetchWishlist = async ()=>{
        setLoading(true)
        setWishlist(dummyWishlist)
        setLoading(false)
    }
    
    useEffect(()=>{
        fetchWishlist()
    },[])

    const toggleWishlist = async (product : Product)=>{
        setWishlist((prev)=>{
            const exist = prev.some((p)=> p._id === product._id)
            if(exist){
                return prev.filter((p)=> p._id !== product._id)
            }
            return [...prev, product]
        })
    }

    const isInWishlist = (productId : string)=>{
        return  wishlist.some((p) => p._id === productId)        
    }
    
    return (
        <WishListContext.Provider value={{wishlist, loading, isInWishlist, toggleWishlist}}>
            {children}
        </WishListContext.Provider>
    )
}

export function useWhishlist(){
    const conext = useContext(WishListContext)
    if(conext === undefined){
        throw new Error('useWishlist must be used with a WishlistProvder')
    }
    return conext
}