let hour = 0;
let minute = 0;
let second = 0;

for (let i = 2; i <= 4; i++) {
 let str = process.argv[i];
 if (!str) continue;
 switch (str[str.length - 1]) {
	case 'h':
		hour = +str.slice(0, -1).trim();
		break;
	case 'm':
		minute = +str.slice(0, -1).trim();
		break;
	case 's':
		second = +str.slice(0, -1).trim();
		break;
	}
}

const delay = (hour * 3600_000) + (minute * 60_000) + (second * 1_000);

setTimeout(() =>{
	console.log('Сработал таймер')
}, delay);