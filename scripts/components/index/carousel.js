// Firebase
import { auth, db, storage } from '../../firebase.js';
import { collection, getDocs, query } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";


// Component to hold the different Carousel items
export function Carousel() {
    return {
        carousels: [],
        keys: [],
        showCarouselAdder: false,
        modalCaller: -1,
        async getCarousels() {
            // Firestore
            const q = query(collection(db, "Carousels"));
            const qSnap = await getDocs(q);
            qSnap.forEach((doc) => {
                this.carousels.push(doc.data());
                this.keys.push(doc.id);
            });
        },
        async updateModalCaller(index) {
            // Set the modal caller to -1 for a short burst to reset the modal
            this.modalCaller = -1;
            setTimeout(() => {
                this.modalCaller = index;
            }, 100);
            // Set the modal caller to the index of the carousel

            console.log(index);
        }
    }
}

// Component for the Hero Carousel panel
export function CarouselItem(prop, index) {
    return {
        $template: '#carousel-item',
        key: index,
        title: prop.Title,
        caption: prop.Content,
        imageReference: prop.Reference,
        imageURL: '',
        isUserLoggedIn: false,
        // This function gets the image url from the storage
        async getImageURL() {
            const imageRef = ref(storage, prop.Reference);
            // get URL where image is stored
            getDownloadURL(imageRef).then((url) => {
                this.imageURL = url;
            });
        },
        mounted() {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    this.isUserLoggedIn = true;
                } else {
                    this.isUserLoggedIn = false;
                }
            });

            // Get the image url
            this.getImageURL();
        }
    }
}
