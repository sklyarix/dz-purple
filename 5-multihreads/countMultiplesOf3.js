export function countMultiplesOf3 ({arr}){
	let count = 0;
	for ( const number of arr){
		number % 3 === 0 && count++
	}
	return count;
}