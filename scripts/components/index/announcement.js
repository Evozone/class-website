// Firebase
import { auth, db } from '../../firebase.js';
import { collection, getDocs, query, addDoc } from "firebase/firestore";

// Component for holding all the announcements
export function Announcements() {
    return {
        announcements: [],
        annsInDatabase: [],
        keys: [],
        isUserLoggedIn: false,
        showAnnAdder: false,
        newAnnHeader: "",
        newAnnContent: "",
        confirmPush: false,
        async getAnns() {
            // Firestore
            const q = query(collection(db, "Announcements"));
            const qSnap = await getDocs(q);
            qSnap.forEach((doc) => {
                this.announcements.push(doc.data());
                this.annsInDatabase.push(doc.data());
                this.keys.push(doc.id);
            });
        },
        // Toggle the showAnnAdder property
        toggleAnnForm() {
            this.showAnnAdder = !this.showAnnAdder;
        },
        // This function is used to preview the announcement
        previewNewAnnouncement() {
            // Create a new announcement object
            const newAnn = {
                Header: this.newAnnHeader,
                Content: this.newAnnContent,
            }
            // Push the new announcement to the announcements array
            this.announcements.push(newAnn);
            // Reset the form
            this.newAnnHeader = "";
            this.newAnnContent = "";
            // Toggle the showAnnAdder property
            this.toggleAnnForm();

            // Show the confirm push modal
            this.confirmPush = true;
        },
        cancelAnnChanges() {
            // Log the arrays 'announcements' and 'annsInDatabase'
            console.log(this.announcements);
            console.log(this.annsInDatabase);

            // Set announcements empty
            this.announcements = [];

            // Set the announcements to the annsInDatabase
            this.annsInDatabase.forEach((ann) => {
                this.announcements.push(ann);
            });

            // Reset the confirm push modal
            this.confirmPush = false;
        },
        // This function is used to add an announcement to the database
        async sendAnnToDatabase() {
            // For each announcement in the announcements array push it to the database
            this.announcements.forEach(async (ann) => {
                // If the announcement is not in the database
                if (!this.annsInDatabase.some(ann1 => ann1.Header == ann.Header)) {
                    // Create a new announcement object
                    const newAnn = {
                        Header: ann.Header,
                        Content: ann.Content,
                    }
                    // Push the new announcement to the database
                    const docRef = await addDoc(collection(db, "Announcements"), newAnn);
                }
            });

            // Reset the confirm push modal
            this.confirmPush = false;
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

// Component indicating one announcement
export function Announcement(prop, key) {
    return {
        $template: '#announcement',
        title: prop.Header,
        description: prop.Content,
        id: key,
        collId: `flush-collapse-`,
        flushId: `flush-heading-`,
        updateCollId() {
            this.collId = `flush-collapse-${this.id}`;
        },
        updateFlushId() {
            this.flushId = `flush-heading-${this.id}`;
        },
        mounted() {
            console.log(`Announcement item ${this.title} is mounted!`);
        }
    }
}
