const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null,
    },

    properties: {
        value: "",
        capsLock: false,
    },

    init(){
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard-keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard-key");

        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        document.querySelectorAll(".keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                })
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keysLayout = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]","\\", "del",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "shift1", "z", "x", "c", "v", "b", "n", "m",",", ".", "/", "up", "shift",
            "ctrl", "win", "alt", "space", "alt", "left", "down", "right", "ctrl", 
        ]
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons"> ${icon_name} </i>`;
        };

        keysLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "del", "enter", "shift"].indexOf(key) !== -1;

            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard-key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add ("keyboard-key-wide");
                    keyElement.innerHTML = createIconHTML("Backspace");

                    keyElement.addEventListener("click", () => {
                        this.propeties.value = this.propeties.value.substring(0, this.propeties.value.length -1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add ("keyboard-key-wide", "keyboard-key-active");
                    keyElement.innerHTML = createIconHTML("CapsLock");
    
                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard-key-active", this.properties.capsLock);
                    });
                    break;

                        case "enter":
                            keyElement.classList.add ("keyboard-key-wide");
                            keyElement.innerHTML = createIconHTML("Enter");
        
                            keyElement.addEventListener("click", () => {
                                this.propeties.value += "\n";
                                this._triggerEvent("oninput");
                            });
                            break;

                        case "del":
                            keyElement.classList.add ("keyboard-key-dark");
                            keyElement.innerHTML = createIconHTML("Del");
                            break;
        
                        case "tab":
                            keyElement.classList.add ("keyboard-key-dark");
                            keyElement.innerHTML = createIconHTML("Tab");
                            break;

                        case "ctrl":
                            keyElement.classList.add ("keyboard-key-dark");
                            keyElement.innerHTML = createIconHTML("Ctrl");
                            break;
        
                        case "alt":
                            keyElement.classList.add ("keyboard-key-dark");
                            keyElement.innerHTML = createIconHTML("Alt");
                            break;

                        case "shift1":
                            keyElement.classList.add ("keyboard-key-wide");
                            keyElement.innerHTML = createIconHTML("Shift");
                            break;
                            
                        case "space":
                            keyElement.classList.add ("keyboard-key-extra-wide");
                            keyElement.innerHTML = createIconHTML("  ");
        
                            keyElement.addEventListener("click", () => {
                                this.propeties.value += " ";
                                this._triggerEvent("oninput");
                            });
                        break;

                        case "shift":
                            keyElement.classList.add ("keyboard-key-wide");
                            keyElement.innerHTML = createIconHTML("Shift");
        
                            keyElement.addEventListener("click", () => {
                                this.close();
                                this._triggerEvent("onclose");
                            });
                        break;

                            default:
                                keyElement.textContent = key.toLowerCase();

                                /*keyElement.addEventListener("click", () => {
                                    this.propeties.value = this.propeties.capsLock ? key.toUpperCase() : key.toLowerCase();
                                    this._triggerEvent("oninput");
                                });*/
                                break;
            }
            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0)
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
    },

   /* open(initialValue, oninput, onclose){
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard-hidden");
    },

    close(){
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;

    }*/
};

window.addEventListener("DOMContentLoaded", function(){
    Keyboard.init();
});