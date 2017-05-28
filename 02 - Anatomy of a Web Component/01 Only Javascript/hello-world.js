class HelloWorld extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                h1 {
                    color: #ff6600;
                }
            </style>
            <h1>Hello World!</h1>
        `;
    }
}
window.customElements.define("hello-world", HelloWorld);
