const EventEmitter = require('events');
const { add } = require('../add')
const { subtract } = require('../subtract')
const { multiply } = require('../multiply')
const { divide } = require('../divide')
const myEventEmitter = new EventEmitter();

myEventEmitter.on('add', (a, b) => {
	myEventEmitter.emit('result',add(a, b));
});

myEventEmitter.on('subtract', (a, b) => {
	myEventEmitter.emit('result',subtract(a, b));
});

myEventEmitter.on('multiply', (a, b) => {
	myEventEmitter.emit('result',multiply(a, b));
	
});

myEventEmitter.on('divide', (a, b) => {
	myEventEmitter.emit('result',divide(a, b));
});

myEventEmitter.on('result', (result) => {
	console.log(result);
});
//Получение данных
const firstNumber = +process.argv[2];
const secondNumber = +process.argv[3];
const symbolMath = process.argv[4];
let result ;

switch (symbolMath) {
	case 'add': {
		myEventEmitter.emit('add', firstNumber, secondNumber);
		break;
	}
	case 'subtract':{
		myEventEmitter.emit('subtract', firstNumber, secondNumber);
		break;
	}
	case 'multiply':{
		myEventEmitter.emit('multiply', firstNumber, secondNumber);
		break;
	}
	case 'divide':{
		myEventEmitter.emit('divide', firstNumber, secondNumber);
		break;
	}
	default: console.log('incorrect symbolMath (add, subtract, multiply, divide)')
}
