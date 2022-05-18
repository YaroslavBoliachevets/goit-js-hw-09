const refs = {
	startBtn: document.querySelector('[data-start]'),
	stopBtn: document.querySelector('[data-stop]'),
};

let changeBodyColorInterval = null;

refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);

refs.stopBtn.setAttribute("disabled", "true");



function onStartClick(e) {
	changeBodyColorInterval = setInterval(() => changeBodyColor(), 1000);

	makeBtnOff(e.target);
	makeBtnOn(refs.stopBtn);
}

function onStopClick(e) {
	clearInterval(changeBodyColorInterval);
	makeBtnOff(e.target);
	makeBtnOn(refs.startBtn);
}

function makeBtnOff(e) {
	e.setAttribute("disabled", "");
}

function makeBtnOn(e) {
	e.removeAttribute("disabled");
}

function changeBodyColor() {
	document.body.setAttribute("style", getRandomHexColor());
}

function getRandomHexColor() {
	return `background-color: #${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

