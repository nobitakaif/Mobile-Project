import { Text} from "react-native";
import "../global.css"
import { SafeAreaView } from "react-native-safe-area-context";

export default function App(){
    return (
        <SafeAreaView className="bg-red-400 h-screen w-full">
            <Text className="text-white">
                Alright
            </Text>
        </SafeAreaView>
    )
}