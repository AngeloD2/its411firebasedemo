
import auth from '@react-native-firebase/auth'


   {/* creds is short for credentials */}
export async function loginUser({ creds }: { creds: { email: string | null, password: string | null } }) {

    {/* destructuring creds */}
    const { email, password } = creds;

    {/* if email or password is null or empty, end function. */}
        if (!email || !password) {
            console.error("received null credentials");
            return;
        }

    {/*  if email or password is not null or empty, run the following code. */}
    try {
            const res = auth().signInWithEmailAndPassword(email as string, password as string);

            const data = await res;

            {/*  If there is a user, this if block will be ignored. */}
            if (!data.user) {
                console.error('No user found.');
                return null;
            }

            {/*  No else statement because errors are typically unknown. */}
            console.log("User found: ", data.user)
            return data.user;
        } catch (e) {
            console.error(e);
            return {error: e}
        }
}

export async function createUser1({ creds }: { creds: { email: string | null, password: string | null } }) {
    const { email, password } = creds;
    
    if (!email || !password) {
        console.error("received null credentials");
        return;
    }

    try {
        const res = await auth().createUserWithEmailAndPassword(creds.email as string, creds.password as string);

        if (!res.user) {
            console.error('Unable to create user');
        }

        console.log("User created: ", res.user)
        return res.user;
    } catch (e) {
        console.error(e)
    }


}