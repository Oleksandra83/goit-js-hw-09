import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('click', onCreatePromise)

function createPromise(position, delay) {
	return new Promise((resolve, reject) => {
		const shouldResolve = Math.random() > 0.3;
		setTimeout(() => {
			if (shouldResolve) {
				// Fulfill
				resolve({ position, delay });
			} else {
				// Reject
				reject({ position, delay });
			}
		}, delay);
	});
}

function onCreatePromise(evt) {
	evt.preventDefault();
	const { delay, step, amount } = evt.currentTarget.elements;

	let inputDelay = Number(delay.value);
	let inputStep = Number(step.value);
	let inputAmount = Number(amount.value);

	for (let i = 1; i <= inputAmount; i += 1){
		inputDelay += inputStep;

		createPromise(i, inputDelay).then(({ position, delay }) => {
			Notiflix.Notify.success(`✔ Fulfilled promise ${position} in ${delay}ms`);
		}).catch(({ position, delay }) => {
			Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
		});
		evt.currentTarget.reset();
	}
}