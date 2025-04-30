import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCp_gxCi_RgdVPiU9-bcq-m_PAbvXcdfFY",
    authDomain: "capstone-project-1dbd2.firebaseapp.com",
    projectId: "capstone-project-1dbd2",
    storageBucket: "capstone-project-1dbd2.firebasestorage.app",
    messagingSenderId: "142702773595",
    appId: "1:142702773595:web:9382f4ba52490b0608c67e",
    measurementId: "G-F14S55FGVM"
};

const app = initializeApp(firebaseConfig);

// Auth Providers
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider(); // ✅ ADD THIS LINE

export { auth, googleProvider, githubProvider }; // ✅ ADD THIS LINE