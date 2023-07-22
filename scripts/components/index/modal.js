// Firebase
import { db, storage } from '../../firebase.js';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

// Component for a Modal
export default function Modal(index) {
    return {
        $template: '#modal-template',
        carouselIndex: index,
        myModal: {},
        carousel: {
            title: '',
            content: '',
            image: '',
            ref: '',
        },
        // This function is used to show the modal
        async mounted() {
            // Get the data from Firebase Firestore. The collection is Carousels and the index is the Document ID (stringify the index)
            const docRef = doc(db, "Carousels", "" + this.carouselIndex);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                this.carousel.title = docSnap.data().Title;
                this.carousel.content = docSnap.data().Content;
                this.carousel.ref = docSnap.data().Reference;
                this.getImageURL(this.carousel.ref);
            } else {
                this.carousel.title = "No Title";
                this.carousel.content = "No Content";
            }

            this.myModal = new bootstrap.Modal(document.getElementById("modal-id"), {
                keyboard: false
            });
            this.myModal.show();
        },
        // This function gets the image url from the storage
        async getImageURL(reference) {
            const imageRef = ref(storage, reference);
            // get URL where image is stored
            getDownloadURL(imageRef).then((url) => {
                this.carousel.image = url;
            }).catch((error) => {
                console.log(error);
            });
        },
        fileChanged(e) {
            // Get the file
            const file = e.target.files[0];
            // Get the file name
            const fileName = file.name;

            // Set up firebase storage
            const storageRef = ref(storage, `/Carousel_Pictures/${fileName}`);

            // Upload the file
            uploadBytes(storageRef, file).then((snapshot) => {
                this.carousel.ref = snapshot.ref.fullPath;
                this.getImageURL(this.carousel.ref);
            });
        },
        async updateCarousel() {
            // Get the data from Firebase Firestore. The collection is Carousels and the index is the Document ID (stringify the index)
            const docRef = doc(db, "Carousels", "" + this.carouselIndex);

            // Update the data in Firebase Firestore
            await updateDoc(docRef, {
                Title: this.carousel.title,
                Content: this.carousel.content,
                Reference: this.carousel.ref,
            });
            // Close the modal
            this.myModal.hide();
        }
    }
}