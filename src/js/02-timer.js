import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

const TIMER_DELAY = 1000;
const flatpickrInput = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');

btnStart.disabled = true;

let idInterval = null;
let selectedDate = null;
let currentDate = null;

Report.info(
	'Greeting, my Friend!',
	'Please, choose a date and click on start',
	'Ok'
);
	
flatpickr(flatpickrInput, {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		if (selectedDates[0].getTime() < Date.now()) {
			Report.failure(
				'Ooops...',
				'Please, choose a date in the future',
				'Ok'
			);
		} else {
			Report.success(
				'Congratulation! Click on start!',
				'',
				'Ok'
			);
			btnStart.disabled = false;
			const setTimer = () => {
				selectedDate = selectedDates[0].getTime();
				timer.start();
			};
			btnStart.addEventListener('click', setTimer);
		}
  },
});

const timer = {
	rootSelector: document.querySelector('.timer'),
	start() {
		idInterval = setInterval(() => {
			btnStart.disabled = true;
			flatpickrInput.disabled = true;
			currentDate = Date.now();
			const delta = selectedDate - currentDate;

			if (delta <= 0) {
				this.stop();
				Report.info(
					'Congratulation! Timer stopped!',
					'Please, if you want to start timer, choose a date and click on start or reload this page',
					'Ok'
				);
				return;
			}
			const { days, hours, minutes, seconds } = this.convertMs(delta);
			this.rootSelector.querySelector('[data-days]').textContent = this.addLeadingZero(days);
			this.rootSelector.querySelector('[data-hours]').textContent = this.addLeadingZero(hours);
			this.rootSelector.querySelector('[data-minutes]').textContent = this.addLeadingZero(minutes);
			this.rootSelector.querySelector('[data-seconds]').textContent = this.addLeadingZero(seconds);
		}, TIMER_DELAY);
	},

	stop() {
		clearInterval(idInterval);
		this.idInterval = null;
		btnStart.disabled = true;
		flatpickrInput.disabled = false;
	},

	convertMs(ms) {
		// Number of milliseconds per unit of time
		const second = 1000;
		const minute = second * 60;
		const hour = minute * 60;
		const day = hour * 24;

		// Remaining days
		const days = this.addLeadingZero(Math.floor(ms / day));
		// Remaining hours
		const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
		// Remaining minutes
		const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
		// Remaining seconds
		const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
		
		return { days, hours, minutes, seconds };
	},
	
	addLeadingZero(value) {
		return String(value).padStart(2, 0);
	},
};