import { Text, View } from "react-native";

import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-green-500">Edit app/index.tsx to edit this screen.</Text>
      <Link href={"/onboarding"} className="rounded-lg bg-blue-700 m-2 px-4 py-3 text-white font-bold">Go to onboarding</Link>
      <Link href={"/(auth)/signup"} className="rounded-lg bg-blue-700 m-2 px-4 py-3 text-white font-bold">Go to signup</Link>
      <Link href={"/(auth)/signin"} className="rounded-lg bg-blue-700 m-2 px-4 py-3 text-white font-bold">Go to signin</Link>
      <Link href={"/subscription/[id]"}>spotify subscription</Link>
      <Link href={{
        pathname : "/subscription/[id]",
        params : { id : "claude"}   
      }}>Claud Max Subscription</Link>

    </View>
  );
}
