import { View, Text, Button } from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { router } from 'expo-router'
import { useEffect, useState } from "react";

export default function DashboardScreen() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User>();


    useEffect(() => {
        if (!user && !initializing) {
            router.replace('/');
        }
    }, [user, initializing]);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((user: any) => {
            setUser(user);
            setInitializing(false);
        });

        return () => unsubscribe();
    }, []);

    if (initializing) return <Text> Loading...wewewewe  </Text>;

    async function handleSignOut() {
        console.log('signing out...')
        const res = await auth().signOut()
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text> You are logged in as: {user?.email}  </Text>

            <Button title="logout" onPress={() => handleSignOut()} />
        </View>
    )
}