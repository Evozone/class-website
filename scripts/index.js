// Get petite vue
import { createApp } from 'https://unpkg.com/petite-vue?module';

// Components
import Navbar from './components/commons/navbar.js';
import Modal from './components/index/modal.js';
import { Carousel, CarouselItem } from './components/index/carousel.js';
import { Announcements, Announcement } from './components/index/announcement.js';
import { Showcases, ShowcaseItem } from './components/index/showcase.js';
import Footer from './components/commons/footer.js';
import SignIn from './components/commons/signIn.js';

// Creating the Vue Instance
createApp({
    Navbar,
    Modal,
    Carousel,
    CarouselItem,
    Announcements,
    Announcement,
    Showcases,
    ShowcaseItem,
    Footer,
    SignIn
}).mount()





