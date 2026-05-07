export {Clock};

const digit = (place) => 
`<svg class="digit" id="digit_${place}" fill="currentColor" viewBox="0 0 36 48" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(-59.53125 -149.48952)">
    <path class="segment s_a" d="m 64.029167,171.44994 v 3.70417 h 9.122637 l 2.525567,-3.70417 z"/>
    <path class="segment s_a" d="m 79.103879,175.15411 2.525568,-3.70417 h 9.122638 v 3.70417 z"/>
    <path class="segment s_b" d="m 59.531251,196.05618 v 1.11648 h 3.929109 l 31.789645,-46.62482 -6e-6,-1.00018 h -4.008392 z"/>
    <path class="segment s_f" d="m 78.5458,175.97262 -2.481463,3.63948 10.138596,17.56056 h 4.582723 L 78.5458,175.97262"/>
    <path class="segment s_c" d="m 76.235451,170.63142 h 0 l 2.481463,-3.63948 -10.071462,-17.44428 h -4.582716 z"/>
    <path class="segment s_d" d="M 59.531251,149.54766 H 63.5 v 39.76242 l -3.968749,5.80379 0,0.017 0,-45.58325"/>
    <path class="segment s_e" d="m 91.281248,157.29397 3.96875,-5.82084 v 45.69953 h -3.96875 z"/>
  </g>
</svg>`;

const segments = {
    0: ['a'],
    1: ['b'],
    2: ['b','c'],
    3: ['b','d','e'],
    4: ['b','f'],
    5: ['b','e','f']
}

class Clock {
    constructor(parent, num_digits, num = 0) {
        // clock internal logic
        const max_digits = 6;
        this.num_digits = num_digits;
        this.max_num = 2*Math.pow(6, 6);
        this.num = num;
        this.running = false;
        
        // HTML elements
        this.parent = parent;
        this.day_indicator = document.getElementById("day-indicator-circle");
        this.digits = new Array(max_digits);
        for(let i = 0; i < max_digits; i++) {
            parent.insertAdjacentHTML("afterbegin", digit(i));
        }
        for(let i = 0; i < max_digits; i++) {
            this.digits[i] = parent.children[i];
            if (i >= num_digits) {
                this.digits[i].dataset.hidden = '';
            }
        }

        this.update();
    }

    isDay(num = this.num) {
        return num < this.max_num/2;
    }

    increment(add = 1) {
        this.num = (this.num + add) % this.max_num;
        this.update()
    }

    regular_increment(speed = 1) {
        this.increment();
        setTimeout(()=>(this.regular_increment(speed)), 1000/speed)
    }

    start(speed = 1) {
        this.regular_increment(speed);
    }

    update() {
        if (this.isDay()) {
            this.day = true;
        } else {
            this.day = false;
        }
        this.update_day_indicator();
        this.update_display();
    }

    update_day_indicator() {
        if (this.day) {
            this.day_indicator.dataset.state = "on";
        }
        else {
            this.day_indicator.dataset.state = "off";
        }
    }

    update_display() {
        let display_num = this.num % Math.pow(6,6);
        // convert the number to a base-6 string
        let num_string = display_num
            .toString(6)
            .padStart(6, "0");

        for (let i = 0; i < this.num_digits; i++) {
            digit_display(this.digits[i], parseInt(num_string[i]));
        }
    }
}

function activate_segments(digit, list) {
    digit.querySelectorAll("*")
        .forEach(segment => segment.dataset.state = "off");
    for (let letter of list) {
        digit.querySelectorAll(".s_" + letter)
            .forEach(segment => segment.dataset.state = "on");
    }
}

function digit_display(digit, num) {
    if (!segments[num])
        return;
    activate_segments(digit, segments[num]);
}