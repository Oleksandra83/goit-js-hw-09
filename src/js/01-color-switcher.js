const DELAY_CHANGE_COLOR = 1000;

const refs = {
	btnStart: document.querySelector('[data-start]'),
	btnStop: document.querySelector('[data-stop]'),
	body: document.querySelector('body'),
}
let interval = null;

refs.btnStop.disabled = true;
refs.btnStart.addEventListener('click', onChangeColor);
refs.btnStop.addEventListener('click', offChangeColor);

function onChangeColor() {
	refs.btnStart.disabled = true;
	refs.btnStop.disabled = false;

	interval = setInterval(() => {
	refs.body.style.backgroundColor = getRandomHexColor()
}, DELAY_CHANGE_COLOR);
}

function offChangeColor() {
	refs.btnStart.disabled = false;
	refs.btnStop.disabled = true;

	clearInterval(interval);
}

function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
