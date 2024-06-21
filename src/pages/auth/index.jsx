import { auth, provider } from '../../config/firebase-config'
import { signInWithPopup } from 'firebase/auth';
import { useNavigate} from 'react-router-dom';
export const Auth = () => {

    const navigate = useNavigate();
    const signInWithGoogle =  async() => {
        // const provider = new firebase.auth.GoogleAuthProvider();
        // auth.signInWithPopup(provider);

        const result = await signInWithPopup(auth, provider);
        
        const authInfo = {
            userId: result.user.uid,
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
            isAuth: true
        }

        localStorage.setItem('user', JSON.stringify(authInfo));

        navigate('/expense-tracker');

    }


    return (
        <div className="login-page">
            <p>Sign in with Google to continue</p>
            <button className="login-with-google-btn" onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        </div>
    );
}