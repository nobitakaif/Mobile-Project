
import { Link, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function SubscriptionDetails(){
    const { id } = useLocalSearchParams<{id : string}>()
    return <View>
        <Text>Subcription Details : {id}</Text>
        <Link href={"/"} className="rounded-lg bg-blue-700 m-2 px-4 py-3 text-white font-bold">Go to home page</Link>
    </View>
}