import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { Product, WishlistContextType} from "@/constants/types";
import { dummyCart, dummyWishlist } from "@/assets/assetes-ecommerce/assets/assets";

export type CartItem ={
    id : string,
    productId : string
    product : Product,
    quantity : number,
    size : string,
    price : number,
}

type CartContextType = {
    cartItem : CartItem[],
    addToCart : (product : Product, size : string) => Promise<void>,
    removeFromCart : (itemId : string, size : string) => Promise<void>
    updateQuantity : (item : string, quantity : number, size : string) => Promise<void>
    clearCart : () => Promise<void>,
    cartTotal : number,
    itemCount : number,
    isLoading : boolean
}

const CartContext = createContext<CartContextType |undefined>(undefined)

export function CartProvider({children}:{children : ReactNode}){

    const [cartItems, seCartItems] = useState<CartItem[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [cartTotal, setCartTotal] = useState(0)

    const fetchCart = async ()=>{
        setIsLoading(true)
        const serverCart = dummyCart
        const mappedItem : CartItem[] = serverCart.items.map((item:any) =>({
            id : item.product._id,
            productId : item.product._id,
            product : item.product,
            quantity : item.quantity,
            size : item?.size || 'M',
            price : item.price,
        }))
        seCartItems(mappedItem)
        setCartTotal(serverCart.totalAmount)
        setIsLoading(false)
    }

    const addToCart = async (prodcutId : string, size: string)=>{

    }
    
    const removeFromCart = async (prodcutId : string, quantity : number, size: string = "M")=>{
        
    }

    const updateQuantity = async ()=>{
        
    }

    const clearCart = async (prodcut : Product, size: string)=>{
        
    }
    
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    
    return (
        <CartContext.Provider value={{cartItem, addToCart, removeFromCart, updateQuantity, clearCart, itemCount, isLoading}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart(){
    const conext = useContext(CartContext)
    if(conext === undefined){
        throw new Error('useCar must be used with a CartProvder')
    }
    return conext
}