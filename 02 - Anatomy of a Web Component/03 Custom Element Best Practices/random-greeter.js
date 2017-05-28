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
        this._interval = setInterval(() => this._render(), 2000);
        this._render();
    }
    _render() {
        if (this._$greet !== null) {
            const index = Math.floor(Math.random() * this._greets.length);
            this._$greet.innerHTML = this._greets[index];
        }
    }
    disconnectedCallback() {
        clearInterval(this._interval);
    }
}

window.customElements.define("random-greeter", RandomGreeter);
