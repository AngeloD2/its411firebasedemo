import { Button, Text, TextInput, View } from "react-native"
import { Link } from "expo-router"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { createUser1, loginUser } from "@/firebase/auth";
import auth from '@react-native-firebase/auth'

import { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import { router } from 'expo-router'

export default function LoginScreen() {
    const [initializing, setInitializing] = useState(true);

    //     We cannot change the value of email, without using the setEmail function
    const [email, setEmail] = useState<string | null>('');
    const [password, setPassword] = useState<string | null>('');

    const [user, setUser] = useState<FirebaseAuthTypes.User>();

    const [error, setError] = useState<unknown>(null);

    //see if user is logged in.
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((user: any) => {
            setUser(user);
            setInitializing(false);
        });

        return () => unsubscribe();
    }, []);

    //if user is logged in, proceed to dashboard.
    useEffect(() => {
        if (user && !initializing) {
            router.replace('/dashboard');
        }
    }, [user, initializing]);

    if (initializing) return <Text> Loading...  </Text>;



    function resetForm() {
        setEmail('')
        setPassword('')
    }

    async function handleSignIn() {
        if (!email || !password) {
            setError("Email or Password cannot be empty!")
            return;
        }

        try {
            const payload = { creds: { email, password } }

            const res = await loginUser(payload)

            if (!res) {
                setError('User might not exist.');
                return;
            }

            setUser(res as FirebaseAuthTypes.User)
            resetForm();
            return;
        } catch (e) {
            console.error(e)
            setError(e)
            return;
        }
    }


    return (
        <ThemedView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <ThemedView style={{ borderWidth: 2, borderRadius: 5 }}>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText> Login with Firebase </ThemedText>
                </ThemedView>

                <ThemedView style={styles.inputContainer}>
                    <ThemedText> Email </ThemedText>

                    <TextInput
                        style={styles.input}
                        value={email ? email : ''}
                        onChangeText={setEmail}
                    />

                    <ThemedText> Password </ThemedText>
                    <TextInput style={styles.input} secureTextEntry value={password ? password : ''} onChangeText={setPassword} />
                </ThemedView>

                <ThemedView style={styles.btnContainer}>
                    <Button title='Login' onPress={() => handleSignIn()} />
                </ThemedView>
            </ThemedView>

            {error ?
                <ThemedText style={{ color: 'red' }}> {error as string} </ThemedText>
                :
                null
            }

            <Text> This is the login screen. </Text>
            <Link href='/register'>
                No account yet? Click here to register.
            </Link>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        margin: 24,
    },
    titleContainer: {
        justifyContent: 'center',
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 24,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    inputContainer: {
        marginHorizontal: 100,
        rowGap: 8,
    },
    input: {
        borderWidth: 0.5,
        borderRadius: 8,
        padding: 4,
        width: 180,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
