// Firebase
import { auth } from '../../firebase.js';
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";

// Component for the sign in page
export default function SignIn() {
    return {
        $template: '#sign-in',
        showForm: false,
        arrow: 'fa-solid fa-arrow-down',
        username: '',
        password: '',
        error: '',
        userPresent: false,
        forgotPasswordEmailSent: false,
        admin: {
            name: 'Admin'
        },
        expandSignInForm() {
            this.showForm = !this.showForm;
            if (this.showForm) {
                this.arrow = 'fa-solid fa-arrow-up';
            } else {
                this.arrow = 'fa-solid fa-arrow-down';

                setTimeout(() => {
                    // Scroll so that the sign in form is in view
                    var element = document.getElementById('sign-in-form');
                    var headerOffset = 130;
                    var elementPosition = element.getBoundingClientRect().top;
                    var offsetPosition = elementPosition + window.scrollY - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }, 50);
            }
        },
        sendLoginDetails() {
            // Set the user's details in the app
            signInWithEmailAndPassword(auth, this.username, this.password).then((userCredential) => {
                // Signed in successfully
                const user = userCredential.user;

                // Admin name is first part of the email
                this.admin.name = user.email.split('@')[0];
                this.userPresent = true;

            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                this.error = errorMessage;
                console.log(errorCode);
                console.log(errorMessage);
            });
        },
        signOutUser() {
            signOut(auth).then(() => {
                // Sign out successful
                console.log('Signed out successfully');
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });

            this.userPresent = false;
            this.showForm = false;

            // Reload the page to clear the user's details
            window.location.reload();
        },
        forgotPassword() {
            // Send an email to the user with a link to reset their password
            sendPasswordResetEmail(auth, this.username).then(() => {
                // Email sent
                this.forgotPasswordEmailSent = true;
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
        },
        mounted() {
            // Check if the user is signed in
            auth.onAuthStateChanged((user) => {
                if (user) {
                    // User is signed in
                    this.userPresent = true;
                    // Get the user's name from the email
                    this.admin.name = user.email.split('@')[0];
                } else {
                    // User is not signed in
                    this.userPresent = false;
                }
            });
        }
    }
}