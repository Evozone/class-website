// Firebase
import { auth, db } from '../../firebase.js';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

// Component for holding the Timeline
export function Timeline() {
    return {
        events: [],
        keys: [],
        dates: [],
        currentView: new Date().getTime(),
        showDatePicker: false,
        showEventAdder: false,
        isUserLoggedIn: false,
        newEvent: {
            subject: "",
            date: "",
            batch: "",
            type: "",
            number: "",
            location: ""
        },
        updateCurrView() {
            // currentview is the date currently being viewed. At the start of the page, it is the current date.
            var selectDate = new Date(this.currentView);
            // This line converts the date to a string in the format YYYY-MM-DD
            this.currentView = selectDate.toLocaleDateString();

            // this.currentView contains id of the date currently being viewed.
            // If it is present on the page, it can be retrieved from the page directly.
            var element = document.getElementById(this.currentView);
            // If the element is not present on the page, then the closest element is retrieved.
            if (element === null) {
                var timestamp = selectDate.getTime();
                var id = `${timestamp}`,
                    max = Number.MAX_VALUE;
                // Traverse through the dates array to find the closest date to timestamp
                for (var i = 0; i < this.dates.length; i++) {
                    var date = this.dates[i];
                    var diff = Math.abs(date - timestamp);
                    if (diff < max) {
                        max = diff;
                        id = date;
                    }
                }

                // Set the current view to the closest date
                selectDate = new Date(id);
                this.currentView = selectDate.toLocaleDateString();
                element = document.getElementById(this.currentView);
            }

            // Scroll to the date currently being viewed
            var headerOffset = 130;
            var elementPosition = element.getBoundingClientRect().top;
            var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            this.showDatePickers = false;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        },
        returnLastIndex() {
            // Get the last index of the events array
            var lastIndex = this.events.length - 1;
        },
        openDatePicker() {
            this.showDatePicker = true;
        },
        submit() {
            this.showDatePicker = false;
        },
        async getEvents() {
            // Firestore
            // Get the events from the database and sort them by date
            const q = query(collection(db, "Events"), orderBy('Date'));
            const qSnap = await getDocs(q);

            // Add the events to the events array
            qSnap.forEach((doc) => {
                this.events.push(doc.data());
                this.keys.push(doc.id);
                this.dates.push(doc.data().Date.seconds * 1000);
            });

            setTimeout(() => { // Wait for the events to load
                this.updateCurrView();
            }, 500)
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

// Component for holding one event
export function TimeCard(prop, index, key, prevEvent) {
    return {
        $template: '#time-card',
        flowType: 'flex-row',
        key: key,
        index: index,
        subject: prop.Subject,
        batch: prop.Batch,
        type: prop.Type,
        number: prop.Number,
        location: prop.Location,
        date: prop.Date,
        day: '0',
        month: '1',
        humanDate: '02/02/2022',
        prevEvent: prevEvent,
        cardColor: 'text-dark bg-light',
        mounted() {
            var checked = JSON.parse(localStorage.getItem(key));
            document.getElementById(key).checked = checked;

            var date = new Date(this.date.seconds * 1000); // Thu Apr 09 2020 14:28:32 GMT+0100 (British Summer Time)
            this.day = date.getDate();
            this.month = date.getMonth() + 1;
            this.humanDate = date.toLocaleDateString();
            switch (this.subject) {
                case 'Microprocessor':
                    this.cardColor = 'text-dark bg-warning';
                    break;

                case 'Operating System':
                    this.cardColor = 'text-white bg-primary';
                    break;

                case 'Analysis of Algorithms':
                    this.cardColor = 'text-dark bg-info';
                    break;

                case 'Python':
                    this.cardColor = 'text-white bg-success';
                    break;

                case 'Applied Mathematics':
                    this.cardColor = 'text-white bg-secondary';
                    break;

                case 'Data Structures':
                    this.cardColor = "text-white bg-dark";

                default:
                    this.cardColor = 'text-dark bg-light';
                    break;
            }
        },
        updateFlowType() {
            if (this.index % 2 == 1 || window.innerWidth < 660) {
                this.flowType = 'flex-row-reverse';
            }
        },
        isDateNotRepeated() {
            // If this is the first event, then it is not repeated
            if (this.prevEvent === undefined) {
                return true;
            }

            // Convert the previous event's date to a string in the format DD/MM/YYYY
            var prevDate = new Date(this.prevEvent.Date.seconds * 1000).toLocaleDateString();

            // The current event's date is this.humanDate. Compare the dates.
            if (prevDate === this.humanDate) {
                return false;
            } else {
                return true;
            }
        },
        saveCheckbox() {
            var checkbox = document.getElementById(key);
            localStorage.setItem(key, checkbox.checked);
        },
    }
}
