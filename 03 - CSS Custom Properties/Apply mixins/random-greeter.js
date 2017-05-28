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

        this._root = this.attachShadow({"mode": "open"});
    }
    connectedCallback() {
        this._root.innerHTML = `
            <style>
                :host{
                    display: block;
                    background-color: var(--var-bg-color, #FF6600);
                    color: var(--var-color, #ffffff);
                }

                :host([theme="orange"]) {
                    background-color: #FF6600;
                    color: #ffffff;                
                }
                
                :host([theme="red"]) {
                    background-color: red;
                    color: greenyellow;                
                }
                                
                .bottom::slotted(marquee) {
                    color: yellow;
                    text-align: right;
                }                           
                
                .greeter-frame {
                    text-align: center;
                    padding: 20px;
                    
                    @apply --greeter-styles;
                }
                h1 {
                    padding: 0;
                    margin: 0;
                }
            </style>
            <div class="greeter-frame">
                <slot name="top"></slot>
                <h1 id="greet"></h1>
                <slot name="bottom" class="bottom"></slot>
            </div>
        `;
        this._$greet = this._root.querySelector("#greet");
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
