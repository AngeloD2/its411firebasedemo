import { createUserWithEmailAndPassword } from '@react-native-firebase/auth'
import auth from '@react-native-firebase/auth'

export async function createUser1({ creds }: { creds: { email: string | null, password: string | null } }) {
    const { email, password } = creds;
    
    if (email || password) {
        console.error("received null credentials");
        return;
    }

    try {
        const res = auth().createUserWithEmailAndPassword(creds.email as string, creds.password as string);

        const data = await res
        if (!data.user) {
            console.error('Unable to create user');
        }

        console.log("User created: ", data.user)
        return data.user;
    } catch (e) {
        console.error(e)
    }


}