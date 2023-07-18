// Firebase
import { db } from '../../firebase.js';
import { collection, addDoc } from 'firebase/firestore';

// Component for adding a new timeline event
export default function NewEventForm(previndex) {
    return {
        $template: '#new-event-form',
        flowType: 'flex-row',
        index: previndex + 1,
        showForm: false,
        newEvent: {
            Subject: "",
            Date: new Date(),
            Batch: "",
            Type: "",
            Number: "",
            Location: ""
        },
        async addEvent() {
            // Change the date to timestamp
            this.newEvent.Date = new Date(this.newEvent.Date);

            // Add the event to the database
            await addDoc(collection(db, "Events"), this.newEvent);

            // Reset the new event object
            this.newEvent = {
                Subject: "",
                Date: new Date(),
                Batch: "",
                Type: "",
                Number: "",
                Location: ""
            };

            // Close the form
            this.showForm = false;
        },
        mounted() {
            if (this.index % 2 == 1 || window.innerWidth < 660) {
                this.flowType = 'flex-row-reverse';
            }
        }
    }
}