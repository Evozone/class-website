// Get petite vue
import { createApp } from 'https://unpkg.com/petite-vue?module';

// Components
import Navbar from './components/commons/navbar.js';
import Tool from './components/tools/tool.js';
import Footer from './components/commons/footer.js';
import SignIn from './components/commons/signIn.js';

// Creating the Vue Instance
createApp({
    Navbar,
    Tool,
    Footer,
    SignIn
}).mount()