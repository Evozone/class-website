// Get petite vue
import { createApp } from 'https://unpkg.com/petite-vue?module';

// Components
import Navbar from './components/commons/navbar.js';
import { Timeline, TimeCard } from './components/timeline/timestuff.js';
import NewEventForm from './components/timeline/newEventForm.js';
import Footer from './components/commons/footer.js';
import SignIn from './components/commons/signIn.js';

// Creating the Vue Instance
createApp({
    Navbar,
    Timeline,
    TimeCard,
    NewEventForm,
    Footer,
    SignIn
}).mount()