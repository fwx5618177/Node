const http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
	
	let testfile0 = fs.readFileSync('./test.txt').toString().split('\r\n');

	function list(m){
		if( m+1 > testfile0.length){
			if(count-1 == total){
				console.log("处理成功")
				return
			}else{
				console.log("递归出错")
				return
			}
		}
		//console.log('(m + 1) % 2', (m + 1) % 2);
		if( (m+1) % 2  == 0){
			//console.log('m:', m);
			//console.log('testfile0[m+1]', testfile0[m+1]);
			let arr = testfile0[m+1].replace(/\s/g, ',').split(',');
			//console.log('得到的数组：',arr);
			//console.log('上一行,指定的数字个数:', parseInt(testfile0[m]));

			let sum = square(parseInt(testfile0[m]), arr);
			count ++;
			console.log('最后总和：', sum);
		}

		m++;
		return list(m);
	}
	function square(n, arr) {
		//let arr = arr;
		//console.log("传进来的参数，代表个数:", n);
		//console.log('此时指定奇数行的值：', parseInt(arr[n-1]));
		
		let num = parseInt(arr[n-1]);
		if (n == 1)	{
			//console.log('最后一个的平方:', parseInt(arr[0]) * parseInt(arr[0]));
			return parseInt(arr[0]) * parseInt(arr[0]);
		}else {
			if (num >= 0){
				//console.log('parseInt(arr[n-1])', parseInt(arr[n-1]));
				
				//console.log('平方:', num * num);
				
				return num * num + square(n-1, arr);

				
			}else{
				return square(n-1, arr);
			}
		
		}
	}	
	let total = testfile0[0];
	let count = 0;
	let m = 0;
	list(m);

});

server.listen(81, () => {
	console.log('81')
})