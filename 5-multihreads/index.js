import { Worker } from 'worker_threads';
import os from 'os'
import {performance, PerformanceObserver} from 'perf_hooks';
import { countMultiplesOf3 } from './countMultiplesOf3.js'

function createArray (n) {
	let arr = [];
	for (let i = 1; i <= n; i++) {
		arr.push(i);
	}
	return arr;
}

function lineVersion(n){
	const arr = createArray(n);
	// Линейно
	const count = countMultiplesOf3({arr})
	console.log(`количество чисел, делящихся на 3 = ${count}`);
}

function workerVersion(n){
	const cores = os.cpus().length;
	const requestAll = [];
	
	for (let i = 0; i < cores; i++) {
		const arr = createArray(Math.floor(n/cores));
		const workerPromise = new Promise((resolve, reject) => {
			const worker = new Worker('./worker.js', {
				workerData: {arr},
			});
			worker.on('message', (msg) => {
				resolve(msg);
			})
			worker.on('error', (err) => {
				reject(err);
			})
			worker.on('exit', () => {})
		});
		requestAll.push(workerPromise);
	}
	
	let promiseAll = Promise.all(requestAll)
	
	
	Promise.all(requestAll).then(results => {
        console.log('Все воркеры завершили работу');
				const count = results.reduce((acc, curr) => acc + curr, 0)
				console.log(`количество чисел, делящихся на 3 = ${count}`);
	});
}

/****************/
/* ИЗМЕРЕНИЯ */
/****************/
const observer = new PerformanceObserver(list => {
	list.getEntries().forEach(entry => {
		console.log(`Функция: ${entry.name}, время: ${entry.duration} ms`);
	})
})
observer.observe({ entryTypes: ['function'] });
const linearApproach = performance.timerify(lineVersion);
const workerApproach = performance.timerify(workerVersion);
await linearApproach(300_000);
await workerApproach(300_000);
