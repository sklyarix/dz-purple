let hour;
let minute;
let second;

for (let i = 2; i <= 4; i++) {
 let str = process.argv[i];
 switch (str[str.length - 1]) {
	case 'h':
		hour = +str.slice(0, str.length - 1).trim();
		break;
	case 'm':
		minute = +str.slice(0, str.length - 1).trim();
		break;
	case 's':
		second = +str.slice(0, str.length - 1).trim();
		break;
	default:
		console.log('incorrect example: 1h 5m 10s')
	}
}

const delay = (hour * 3600_000) + (minute * 60_000) + (second * 1_000);

setTimeout(() =>{
	console.log('Сработал таймер')
}, delay);