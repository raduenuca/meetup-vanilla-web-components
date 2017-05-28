class RandomGreeter extends HTMLElement {
    constructor() {
        super();
        this._greets = [
            "Hello World!",
            "Hi Solar System!",
            "Yo Galaxy!",
            "Hey Universe!"
        ];
        this._$greet = null;
        this._interval = null;
    }
    connectedCallback() {
        this.innerHTML = `
            <style>
                .greeter-frame {
                    background-color: #FF6600;
                    text-align: center;
                    padding: 20px;
                }
                h1 {
                    padding: 0;
                    margin: 0;
                    color: #ffffff;
                }
            </style>
            <div class="greeter-frame">
                <h1 id="greet"></h1>
            </div>
        `;
        this._$greet = this.querySelector("#greet");
        this._setInterval(this.getAttribute("interval"));
        this._render();
    }
    _render() {
        if (this._$greet !== null) {
            const index = Math.floor(Math.random() * this._greets.length);
            this.setAttribute("current-index", index);
            this._$greet.innerHTML = this._greets[index];
        }
    }
    _setInterval(value) {
        if (this._interval !== null) {
            clearInterval(this._interval);
        }
        if (value > 0) {
            this._interval = setInterval(() => this._render(), value);
        }
    }
    static get observedAttributes() {
        return ["interval"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this._setInterval(newValue);
    }
    disconnectedCallback() {
        clearInterval(this._interval);
    }
    set greets(greets) {
        if (this._greets === greets) return;
        this._greets = greets;
        this._render();
    }
    get greets() {
        return this._greets;
    }
}

window.customElements.define("random-greeter", RandomGreeter);
