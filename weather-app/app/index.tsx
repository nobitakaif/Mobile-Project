import { Image,  ScrollView,  Text, TextInput, TouchableOpacity, View } from "react-native";
import { StatusBar} from "expo-status-bar"
import "../global.css"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CalendarDaysIcon, MagnifyingGlassIcon, MapPinIcon} from "react-native-heroicons/outline"
import { useState } from "react";

export default function App(){
    const insect = useSafeAreaInsets()
    const [showSearch, setShowSearch] = useState(false)
    const [location,setLocation] = useState([1,2,3])
    return <View className="flex-1 relative">
        <StatusBar style="light"/>
            <Image blurRadius={70} source={require("../assets/images/bg.png")} className="h-full w-full " style={{position : "absolute"}}/>
            <View className="flex flex-1 " style={{paddingTop : insect.top+15}}>
                <View style={{height : "7%"}} className="mx-4 relative ">
                    <View className="flex-row justify-between items-center rounded-full  bg-gray-500" >
                        <TextInput
                            placeholder="Search city"
                            placeholderTextColor={"lightgray"}
                            className="pl-4 h-18 flex-1 text-lg text-white rounded-full ml-3 fixed"
                        />
                        <TouchableOpacity className="rounded-full bg-gray-400 p-3 m-1  flex items-center justify-center pt-3" 
                            onPress={()=>{
                                setShowSearch(c => !c)
                            }}>
                            <MagnifyingGlassIcon size="25" color="white"/>
                        </TouchableOpacity>
                    </View>
                    {
                        location.length > 0 && showSearch ? (
                            <View className="absolute w-full bg-gray-400 top-16 rounded-3xl">
                                {
                                    location.map((loc,index) =>{
                                        let showBorder = index +1 != location.length;
                                        let borderClass = showBorder ? " border-b-2 border-b-gray-600" : "";
                                        return (
                                            <TouchableOpacity className={"p-4 text-lg   flex-row  items-center border-0 px-4 "+     borderClass} key={index}
                                                onPress={(loc)=>{
                                                    console.log(loc)
                                                }}
                                            >
                                                <MapPinIcon size={"20"} />
                                                <Text> Lodon, United Kingdom </Text>
                                            </TouchableOpacity>
                                        )
                                    } )
                                }
                            </View>

                        ) : null
                    }
                </View>

                <View className="mx-4 flex justify-around flex-1 mb-2">
                    <Text className="text-white text-center text-2xl font-bold">
                        London,
                        <Text className="text-lg font-semibold text-gray-300">
                            United Kingdom
                        </Text>
                    </Text>
                    <View className="flex-row justify-center">
                        <Image source={require("../assets/images/partlycloudy.png")} className="w-52 h-52"/>
                    </View>
                    <View className="space-y-2">
                        <Text className="text-center font-bold text-white text-6xl ml-5">
                            23&#176;
                        </Text>
                        <Text className="text-center font-bold text-white text-xl tracking-widest">
                            Partly cloudy
                        </Text>
                    </View>
                    <View className="flex-row justify-between mx-4">
                        <View className="flex-row space-x-2 items-center gap-2">
                            <Image source={require("../assets/icons/wind.png")} className="h-6 w-6"/>
                            <Text className="text-white font-semibold text-base">
                                23km
                            </Text>
                        </View>
                        <View className="flex-row space-x-2 items-center gap-2">
                            <Image source={require("../assets/icons/drop.png")} className="h-6 w-6"/>
                            <Text className="text-white font-semibold text-base">
                                23%
                            </Text>
                        </View>
                        <View className="flex-row space-x-2 items-center gap-2">
                            <Image source={require("../assets/icons/sun.png")} className="h-6 w-6"/>
                            <Text className="text-white font-semibold text-base">
                                6:05 AM
                            </Text>
                        </View>
                    </View>
                </View>
                <View className="mb-2 space-y-3 ">
                    <View className="flex-row items-center mx-4 space-x-2">
                        <CalendarDaysIcon size={"22"} color={"white"}/>
                        <Text className="text-white text-base">Daily forecast</Text>
                    </View>
                    <ScrollView horizontal  contentContainerStyle={{paddingHorizontal : 15}} showsHorizontalScrollIndicator={false}>
                        <View className="flex-row gap-3">
                            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-2 bg-gray-400 mt-3" >
                                <Image source={require("../assets/images/heavyrain.png")} className="h-11 w-11"/>
                                <Text className="text-white">Monday</Text>
                                <Text className="text-white text-xl font-semibold">23&#176;</Text>
                            </View>
                            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-2 bg-gray-400 mt-3" >
                                <Image source={require("../assets/images/heavyrain.png")} className="h-11 w-11"/>
                                <Text className="text-white">Monday</Text>
                                <Text className="text-white text-xl font-semibold">23&#176;</Text>
                            </View>
                            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-2 bg-gray-400 mt-3" >
                                <Image source={require("../assets/images/heavyrain.png")} className="h-11 w-11"/>
                                <Text className="text-white">Monday</Text>
                                <Text className="text-white text-xl font-semibold">23&#176;</Text>
                            </View>
                            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-2 bg-gray-400 mt-3" >
                                <Image source={require("../assets/images/heavyrain.png")} className="h-11 w-11"/>
                                <Text className="text-white">Monday</Text>
                                <Text className="text-white text-xl font-semibold">23&#176;</Text>
                            </View>
                            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-2 bg-gray-400 mt-3" >
                                <Image source={require("../assets/images/heavyrain.png")} className="h-11 w-11"/>
                                <Text className="text-white">Monday</Text>
                                <Text className="text-white text-xl font-semibold">23&#176;</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                
            </View>
        
    </View>
}