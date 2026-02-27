import Header from "@/components/header";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Home(){
    return <SafeAreaView className="flex-1 " edges={['top']}>
        <Header showBack={false} title="Forver" showCart showLogo showMenu/>

    </SafeAreaView>
}