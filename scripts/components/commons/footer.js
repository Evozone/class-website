// Component for holding the About and Follow pages
export default function Footer(prop) {
    return {
        $template: '#footer-icon',
        name: prop.name,
        imgSrc: prop.img,
        link: prop.link,
        className: 'col-xl-3 col-md-2 col-sm-4 col-6',
        mounted() {
            console.log(`Footer icon ${this.name} is mounted`);
        }
    }
}