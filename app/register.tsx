import { Button, Text, TextInput, View, StyleSheet } from "react-native"
import { Link } from "expo-router"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { createUser1 } from "@/firebase/auth";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useState, useEffect } from "react";

export default function RegisterScreen() {

    const [email, setEmail] = useState<string | null>('');
    const [password, setPassword] = useState<string | null>('');

    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<FirebaseAuthTypes.User>();

    function resetForm() {
        setEmail('')
        setPassword('')

    }
    async function handleRegisterUser() {
        if (!email || !password) {
            setError("Email or Password cannot be empty!")
            return;
        }

        try {
            const payload = { creds: { email, password } }

            const res = await createUser1(payload)

            if (!res) {
                setError('User creation error');
                return;
            }

            setUser(res)
            resetForm();
            return;
        } catch (e) {
            console.error(e)
        }


    }

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(null)
            }, 3000)
        }
    }, [error])

    return (
        <ThemedView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText> Register with Firebase </ThemedText>

            </ThemedView>

            <ThemedView style={styles.inputContainer}>
                <ThemedText> Email </ThemedText>
                <TextInput style={styles.input} value={email ? email : ''} onChangeText={setEmail} />

                <ThemedText> Password </ThemedText>
                <TextInput style={styles.input} secureTextEntry value={password ? password : ''} onChangeText={setPassword} />
            </ThemedView>
            <ThemedView style={styles.btnContainer}>
                <Button title='Register' onPress={() => handleRegisterUser()} />
            </ThemedView>

            {error ? <ThemedText style={{ color: 'red' }}> {error} </ThemedText> : null}

            <ThemedView>
                {user ?
                    <ThemedText>
                        {user.email}
                    </ThemedText>
                    :
                    null
                }
            </ThemedView>

            <Text> This is the registration screen. </Text>
            <Link href='/'>
                Already have an account? Back to login.
            </Link>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        margin: 24,
    },
    titleContainer: {
        backgroundColor: 'orange',
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
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