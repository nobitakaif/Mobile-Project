import AsyncStorage from "@react-native-async-storage/async-storage"

export const storeData = async (key:any, value:any) =>{
    try{
        await AsyncStorage.setItem(key,value);
    }catch(e){
        console.log("can't set the data in local-storage")
    }
}

export const getData = async(key:any)=>{
    try{
        const value = await AsyncStorage.getItem(key)
        return value
    }catch(e){
        console.log("Error retrieving value ", e)
    }
}