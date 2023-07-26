function gcd(a, b){
	if (a == 0 && b == 0) return 0;

	function calculate_variables(){
		q = Math.floor(a/b);
		return a-b*q;
	}

	r = calculate_variables();
	while (r != 0){
		a = b;
		b = r;
		r = calculate_variables();
	}

	return Math.abs(b);
}

function fib(n){
	// worst way to do it bc i have to
	n = Math.floor(n);
	let prev = 1;
	let sum = 0;

	for (let i = 0; i <= n; i++){
		let tmp = sum;
		sum += prev;
		prev = tmp;
	}

	return sum;
}

function prime(x){
	sum = 0;
	for (let i = 0; i <= x; i++) {
		if (math.isPrime(i)){
			sum += 1;
		}
	}

	return sum;
}

function binom(x,y){
	if (x > y)
		return (math.factorial(x))/(math.factorial(y)*math.factorial(x-y));
	else
		return 0;
}

function mltico(x,y){
	return bimon(x+y-1,y);
}

function multin(x,y){
	product = 1;
	for (let i = 0; i < y.length; i++){
		product *= math.factorial(y)
	}

	return (math.factorial(x))/(product);
}