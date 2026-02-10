import { Image,  ScrollView,  Text, TextInput, TouchableOpacity, View } from "react-native";
import { StatusBar} from "expo-status-bar"
import "../global.css"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CalendarDaysIcon, MagnifyingGlassIcon, MapPinIcon} from "react-native-heroicons/outline"
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash"
import { fetchLocation, fetchWeatherForecast } from "@/api";
import axios from "axios";
import { dummyWeatherData, WeatherCondition, weatherImages, WeatherResponse } from "@/constant/url";



export default function App(){
    const insect = useSafeAreaInsets()
    const [showSearch, setShowSearch] = useState<any>(false)
    const [weather, setWeather] = useState<WeatherResponse>(dummyWeatherData)
    const [loading, setLoading] = useState(true)
     
    useEffect(()=>{
        // setWeather(dummyWeatherData)
        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=1db28aaeda084d7c9dc215139260702&q=delhi&days=7&aqi=no&alerts=no`).then( data =>{
            setWeather(data.data)
            console.log("got data ->", data.data)
            setLoading(false)
        })
    },[])
    
    const [currentLocation,setLocation] = useState<any>([])
    const handleSearch=async (e:string)=>{
        if(e.length >2 ){
            setShowSearch(true)
            const resposne = await axios.get(`https://api.weatherapi.com/v1/search.json?key=1db28aaeda084d7c9dc215139260702&q=${e}`)
            console.log(resposne.data)
            setLocation(resposne.data)
        }else{
            setShowSearch(false)
        }
    }

    const searchButton= async (loc:any)=>{
        
        console.log("weather -> ",weather)
        setShowSearch([])
        setLoading(true)
        new Promise(res => setTimeout(res, 1000))
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=1db28aaeda084d7c9dc215139260702&q=${loc.name}&days=7&aqi=no&alerts=no`)
        if(response.status == 200){
            setLoading(false)
            setShowSearch(false)
        }
      
        setWeather(response.data)
        
        
        console.log("response.data ->", response.data)
    }
    const locationSearchDebounce = useCallback(debounce(handleSearch, 1200), [])
    function getWeatherImage(condition: string) {
        return (
            weatherImages[condition as WeatherCondition] ??
            weatherImages.other
        );
    }
    
    return <View className="flex-1 relative">
        <StatusBar style="light"/>
         <Image blurRadius={70} source={require("../assets/images/bg.png")} className="h-full w-full " style={{position : "absolute"}}/>
            
            {
                loading  ? (
                    <View className="h-screen w-full flex justify-center items-center">
                        <Text className="h-screen w-full flex text-center ">Loading...</Text>
                    </View>
                ) : (
                   
                <View className="flex flex-1 " style={{paddingTop : insect.top+15}}>
                    <View style={{height : "7%"}} className="mx-4 relative ">
                        <View className="flex-row justify-between items-center rounded-full  bg-gray-500" >
                            <TextInput
                                onChangeText={locationSearchDebounce}
                                placeholder="Search city"
                                placeholderTextColor={"lightgray"}
                                className="pl-4 h-18 flex-1 text-lg text-white rounded-full ml-3 fixed"
                            />
                            <TouchableOpacity className="rounded-full bg-gray-400 p-3 m-1  flex items-center justify-center pt-3" 
                                >
                                <MagnifyingGlassIcon size="25" color="white"/>
                            </TouchableOpacity>
                        </View>
                        {
                            currentLocation?.length > 0 && showSearch ? (
                                <View className="absolute w-full bg-gray-400 top-16 rounded-3xl">
                                    {
                                        currentLocation.map((loc:any,index:any) =>{
                                            let showBorder = index +1 != currentLocation.length;
                                            let borderClass = showBorder ? " border-b-2 border-b-gray-600" : "";
                                            return (
                                                <TouchableOpacity className={"p-4 text-lg   flex-row  items-center border-0 px-4 "+borderClass} key={index}
                                                    onPress={()=>searchButton(loc)}
                                                >
                                                    <MapPinIcon size={"20"} />
                                                    <Text className="font-semibold text-lg"> {loc?.name}</Text>
                                                    <Text>, {loc.country} </Text>
                                                </TouchableOpacity>
                                            )
                                        } )
                                    }
                                </View>

                            ) : null
                        }
                    </View>

                    <View className="mx-4 flex justify-around flex-1 mb-2 ">
                        <Text className="text-white text-center text-4xl font-bold">
                            {weather && weather.location.name }
                            <Text className="text-lg font-semibold text-gray-300">
                                {", " +weather.location.country}
                            </Text>
                        </Text>
                        <View className="flex-row justify-center">
                        <Image source={getWeatherImage(weather ? weather.current.condition?.text! : 'other' )} className="w-52 h-52" />
                        </View>
                        <View className="space-y-2">
                            <Text className="text-center font-bold text-white text-6xl ml-5">
                                {weather.current.temp_c}&#176;
                            </Text>
                            <Text className="text-center font-bold text-white text-xl tracking-widest">
                                {weather.current?.condition?.text}
                            </Text>
                        </View>
                        <View className="flex-row justify-between mx-4">
                            <View className="flex-row space-x-2 items-center gap-2">
                                <Image source={require("../assets/icons/wind.png")} className="h-6 w-6"/>
                                <Text className="text-white font-semibold text-base">
                                    {weather && weather.current.wind_kph}
                                </Text>
                            </View>
                            <View className="flex-row space-x-2 items-center gap-2">
                                <Image source={require("../assets/icons/drop.png")} className="h-6 w-6"/>
                                <Text className="text-white font-semibold text-base">
                                    {weather.current?.humidity}% 
                                </Text>
                            </View>
                            <View className="flex-row space-x-2 items-center gap-2">
                                <Image source={require("../assets/icons/sun.png")} className="h-6 w-6"/>
                                <Text className="text-white font-semibold text-base">
                                    {weather.forecast.forecastday[0]?.astro?.sunrise}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View className="mb-2 space-y-3 flex gap-2">
                        <View className="flex-row items-center mx-5 space-x-2">
                            <CalendarDaysIcon size={"22"} color={"white"}/>
                            <Text className="text-white text-base">Daily forecast</Text>
                        </View>
                        <ScrollView horizontal  contentContainerStyle={{paddingHorizontal : 15}} showsHorizontalScrollIndicator={false} className="flex gap-2 flex-row">
                        {
                            weather?.forecast?.forecastday?.map((item, idx)=>{
                                let date = new Date(item.date)
                                let options = {weekday : 'long'};
                                // @ts-ignore
                                let dayName = date.toLocaleDateString('en-Us', options);
                                dayName.split(',')[0]
                                return (
                                    <View key={idx} className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-2 bg-gray-500 mx-2">
                                        <Image source={getWeatherImage(item.day.condition.text)} className="h-11 w-11"/>
                                        <Text className="text-white">
                                            {dayName}
                                        </Text>
                                        <Text className="text-white text-xl font-semibold">
                                            {item?.day.avgtemp_c}&#176;
                                        </Text>
                                    </View>
                                )
                            })
                        }
                        </ScrollView>
                    </View>
                    
                </View>
                    )
            }
        
    </View>
}