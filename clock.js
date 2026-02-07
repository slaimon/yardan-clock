export {Clock};

const digit = (place) => 
`<svg class="digit" id="digit_${place}" width="153.46mm" height="153.52mm" version="1.1" viewBox="0 0 153.46 153.52" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(-59.531 -149.43)" stroke-width="0">
    <path fill="currentColor" class="segment s_b" d="m150.81 150.81s-8.8191-1e-3 -8.8202 2e-3l-50.711 152.13h13.229l46.302-138.91z"/>
    <path fill="currentColor" class="segment s_d" d="m153.46 150.81h8.8194l50.712 152.14h-13.229l-46.302-138.91z"/>
    <path fill="currentColor" class="segment s_a" d="m152.14 235.48h-23.812l-2.6458 7.9375h52.917l-2.6458-7.9375z"/>
    <path fill="currentColor" class="segment s_a" d="m85.99 243.42h-23.812l-2.6458-7.9375h52.917l-2.6458 7.9375z"/>
    <path fill="currentColor" class="segment s_c" d="m70.031 150.81c-7.321-12.465 37.113 63.193 45.063 76.729l-2.2049 6.6146h-5.7326l-47.625-83.344z"/>
    <path fill="currentColor" class="segment s_e" d="m153.34 302.95-30.304-51.599 2.2049-6.6146h5.7326l33.073 58.208z"/>
    </g>
</svg>`;

class Clock {
    constructor(parent, num_digits) {
        self.parent = parent;
        self.num_digits = num_digits;
        self.digits = new Array(num_digits);

        for(let i = 0; i < num_digits; i++) {
            parent.insertAdjacentHTML("afterbegin", digit(i));
        }
        for(let i = 0; i < num_digits; i++) {
            self.digits[i] = parent.children[i];
        }
    }

    display(num) {
        // convert the number to a base-6 string
        let num_string = num
            .toString(6)
            .padStart(self.num_digits, "0");

        for (let i = 0; i < num_digits; i++) {
            digit_display(self.digits[i], parseInt(num_string[i]));
        }
    }
}

const segments = {
    0: ['a'],
    1: ['b'],
    2: ['b','c'],
    3: ['b','c','d'],
    4: ['b','e'],
    5: ['b','d','e']
}

function activate_segments(digit, list) {
    digit.querySelectorAll("*")
        .forEach(segment => segment.classList.remove("s_on"));
    for (let letter of list) {
        digit.querySelectorAll(".s_" + letter)
            .forEach(segment => segment.classList.add("s_on"));
    }
}

function digit_display(digit, num) {
    if (!segments[num])
        return;
    activate_segments(digit, segments[num]);
}

function clock_display(num) {
    let num_string = num.toString(6);
    let digits = clock.children();

    let i = 0;
    for (digit of digits) {
        digit_display(digit, parseInt(num_string[i]));
        i++;
    }
}