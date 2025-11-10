import { add } from '../add.js';
import { subtract } from '../subtract.js';
import {multiply} from '../multiply.js';
import {divide} from '../divide.js';
// node index.js 2 2 +

const firstNumber = +process.argv[2];
const secondNumber = +process.argv[3];
const symbolMath = process.argv[4];
let result ;

switch (symbolMath) {
	case 'add': {
		result = add(firstNumber, secondNumber);
		break;
	}
	case 'subtract':{
		result = subtract(firstNumber, secondNumber);
		break;
	}
	case 'multiply':{
		result = multiply(firstNumber, secondNumber);
		break;
	}
	case 'divide':{
		result = divide(firstNumber, secondNumber);
		break;
	}
	default: console.log('incorrect symbolMath (add, subtract, multiply, divide)')
}
console.log(result);