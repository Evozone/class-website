// Component for the Navigation Bar
export default function Navbar() {
    return {
        $template: '#nav-template',
        focus: 'index',
        width: window.innerWidth,
        // This function is used to set the focus to the home page
        setFocusHome() {
            this.focus = 'index';
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            // Save the focus to local storage
            localStorage.setItem('focus', this.focus);
            // goto index.html
            window.location.href = "index.html";
        },
        // This function is used to set the focus to the tools page
        setFocusTools() {
            this.focus = 'tools';
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            // Save the focus to local storage
            localStorage.setItem('focus', this.focus);
            // goto tools.html
            window.location.href = "tools.html";
        },
        // This function is used to set the focus to the timeline page
        setFocusTimeline() {
            this.focus = 'timeline';
            // Save the focus to local storage
            localStorage.setItem('focus', this.focus);
            // goto timeline.html
            window.location.href = "timeline.html";
        },
        // This function listens to the window's width and sets the width of the other components
        mounted() {
            window.addEventListener("resize", function () {
                this.width = window.innerWidth;
            })
        },
    }
}