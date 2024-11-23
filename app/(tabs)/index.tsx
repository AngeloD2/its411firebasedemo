import { Image, StyleSheet, Platform, TextInput, Text, Button } from 'react-native';

import auth from '@react-native-firebase/auth'
import { useEffect, useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
export default function HomeScreen() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [error, setError] = useState<unknown | null>(null);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  async function handleRegisterUser() {
    if (!email || password) {
      setError("Email or Password cannot be empty!")
      return;
    }

    try {
      const res = await auth().createUserWithEmailAndPassword(email, password);

      if (!res.user) {
      }

      console.log("User created: ", res.user)
      setUser(res.user)
      return;
    } catch (e) {
      setError(e)
      console.error(e)
    }
  }


  return (
    <ThemedView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.title}> Register with Firebase </ThemedText>
      </ThemedView>

      <ThemedView style={styles.inputContainer}>
        <ThemedText> Email </ThemedText>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />

        <ThemedText> Password </ThemedText>
        <TextInput style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      </ThemedView>

      <ThemedView style={styles.btnContainer}>
        <Button title='Register' onPress={handleRegisterUser} />
      </ThemedView>
      <ThemedView>
        {user ?
          <ThemedText>
            {user.email}
            {user.displayName}
          </ThemedText>
          :
          null
        }
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    margin: 24,
  },
  titleContainer: {
    backgroundColor: 'orange',
    borderRadius: 12,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {

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
