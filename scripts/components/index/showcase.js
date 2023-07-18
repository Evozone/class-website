// Firebase
import { auth, db, storage } from '../../firebase.js';
import { collection, getDocs, query, addDoc, doc, deleteDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes, getStorage } from "firebase/storage";

// Component for the Showcase Container
export function Showcases() {
    return {
        showcases: [],
        showcasesInDatabase: [],
        keys: [],
        isUserLoggedIn: false,
        showShowcaseAdder: false,
        newShowcaseTitle: "",
        newShowcaseContent: "",
        newShowcaseReference: "",
        newShowcaseURL: "",
        confirmPush: false,
        flag: true,
        async getShowCaseItems() {
            // Firestore
            const q = query(collection(db, "Showcases"));
            const qSnap = await getDocs(q);
            qSnap.forEach((doc) => {
                this.showcases.push(doc.data());
                this.showcasesInDatabase.push(doc.data());
                this.keys.push(doc.id);
            });
        },
        // Toggle the showShowcaseAdder property
        toggleShowcaseForm() {
            this.showShowcaseAdder = !this.showShowcaseAdder;

            // If the showShowcaseAdder is true, reset the form
            if (this.showShowcaseAdder) {
                this.newShowcaseTitle = "";
                this.newShowcaseContent = "";
                this.newShowcaseReference = "";
                this.newShowcaseURL = "";
            }
        },
        // This function is used to preview the showcase
        previewNewShowcase() {
            // Create a new showcase object
            const newShowcase = {
                Title: this.newShowcaseTitle,
                Content: this.newShowcaseContent,
                Reference: this.newShowcaseReference,
                Link: this.newShowcaseURL,
            }
            // Push the new showcase to the showcase array
            this.showcases.push(newShowcase);
            // Reset the form
            this.newShowcaseTitle = "";
            this.newShowcaseContent = "";
            this.newShowcaseReference = "";
            this.newShowcaseURL = "";

            // Toggle the showShowcaseAdder property
            this.toggleShowcaseForm();

            // Show the confirm push modal
            this.confirmPush = true;
        },
        async sendShowcaseToDatabase() {
            // For each showcase in the showcases array push it to the database
            this.showcases.forEach(async (showcase) => {
                // If the showcase is not in the database
                if (!this.showcasesInDatabase.some(showcase1 => showcase1.Title == showcase.Title)) {
                    // Create a new showcase object
                    const newShowcase = {
                        Title: showcase.Title,
                        Content: showcase.Content,
                        Reference: showcase.Reference,
                        Link: showcase.Link,
                    }
                    // Push the new showcase to the database
                    const docRef = await addDoc(collection(db, "Showcases"), newShowcase);
                }
            });

            // Reset the confirm push modal
            this.confirmPush = false;
        },
        cancelShowcaseChanges() {
            // Set showcases empty
            this.showcases = [];

            // Set the showcases to the showcasesInDatabase
            this.showcasesInDatabase.forEach((showcase) => {
                this.showcases.push(showcase);
            });
            // Reset the confirm push modal
            this.confirmPush = false;
        },
        fileChanged(e) {
            // Get the file
            const file = e.target.files[0];
            // Get the file name
            const fileName = file.name;

            // Set up firebase storage
            const storageRef = ref(storage, `/Showcase_Images/${fileName}`);

            // Upload the file
            uploadBytes(storageRef, file).then((snapshot) => {
                this.newShowcaseReference = snapshot.ref.fullPath;
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
        }
    }
}

// Component for the Showcase Panels
export function ShowcaseItem(prop, id) {
    return {
        $template: '#showcase-item',
        title: prop.Title,
        content: prop.Content,
        reference: prop.Reference,
        url: prop.Link,
        deleteButton: false,
        docId: id,
        imageURL: "",
        removeShowcaseItem() {
            // Set the Title to "Do you want to delete this showcase?"
            this.title = "Do you want to delete this showcase?";

            // Set the content to "This will delete the showcase from the database and the showcase page."
            this.content = "This will delete the showcase from the database and the showcase page.";

            // Set the deleteButton to true
            this.deleteButton = true;
        },
        async confirmDelete() {
            // Set the deleteButton to false
            this.deleteButton = false;
            // Remove showcase from the database
            console.log(this.docId);
            await deleteDoc(doc(db, "Showcases", this.docId));

            // Reload the page
            location.reload();
        },
        cancelDelete() {
            // Set the deleteButton to false
            this.deleteButton = false;

            // Set the Title to the original title
            this.title = prop.Title;

            // Set the content to the original content
            this.content = prop.Content;
        },
        getImageURL() {
            const imageRef = ref(storage, prop.Reference);
            // get URL where image is stored
            getDownloadURL(imageRef).then((url) => {
                this.imageURL = url;
            }).catch((err) => {
                console.log(err);
            });
        },
        mounted() {
            // Get the image url
            this.getImageURL();
        }
    }
}