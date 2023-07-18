// Component for the Tools Panel
export default function Tool(prop) {
    return {
        $template: '#tool-card',
        title: prop.title,
        desc: prop.desc,
        imageLink: prop.imageSrc,
        link: prop.link,
        mounted() {
            console.log(`Tool item ${this.title} is mounted!`);
        }
    }
}