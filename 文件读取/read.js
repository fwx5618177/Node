const http = require('http');
const fs = require('fs');
let server = http.createServer((req, res) => {
	
	// 读取文件
	
	/* 	2
		4
		3 -1 1 14
		5
		9 6 -53 32 16 */
		
		
		
	/* 	结果：
		0.直接读取： <Buffer 32 0d 0a 34 0d 0a 33 20 2d 31 20 31 20 31 34 0d 0a 35 0d 0a 39 20 36 20 2d 35 33 20 33 32 20 31 36>
		1.转换字符串型： 2
		4
		3 -1 1 14
		5
		9 6 -53 32 16
		2.字符分割： [ '2', '4', '3 -1 1 14', '5', '9 6 -53 32 16' ]
		2.1字符分割a[2][1]： string
		2.2字符分割testfile2_replace： 3,-1,1,14
		2.3字符分割testfile2_split： [ '3 -1 1 14' ]
		2.4字符分割replace_text： [ '3', '-1', '1', '14' ]
		3.split所有空白字符s： [ '2\r\n4\r\n3 -1 1 14\r\n5\r\n9 6 -53 32 16' ]
		4.1分割二维数组testfile4： 2
		4
		3 -1 1 14
		5
		9 6 -53 32 16
		4.2分割二维数组testfile4[3]： 4
		4.3substring(0, index): 2
		Buffer类型： [ <Buffer 32 0d 0a 34 0d 0a 33 20 2d 31 20 31 20 31 34 0d 0a 35 0d 0a 39 20 36 20 2d 35 33 20 33 32 20 31 36> ]
		对数组的序号内容取值： 5
		JSON数组内容: [ { x: 0, y: [ 2, 4, 3, -1, 1, 14, 5 ] } ]

			 */
		
	//0.直接读取
	let testfile0 = fs.readFileSync('./test.txt');
	console.log('0.直接读取：', testfile0);
	
	//1.转换字符串型；
	let testfile1 = fs.readFileSync('./test.txt').toString();
	console.log('1.转换字符串型：', testfile1);
	
	// 2.split字符分割；
	let testfile2 = fs.readFileSync('./test.txt').toString().split('\r\n');
	console.log('2.字符分割：', testfile2);
	console.log('2.1字符分割a[2][1]：', typeof testfile2[2]);
	let testfile2_replace = testfile2[2].replace(/\s/g, ',');
	let testfile2_split = testfile2[2].split('\s+');
	let replace_text = testfile2_replace.split(',');
	console.log('2.2字符分割testfile2_replace：', testfile2_replace);
	console.log('2.3字符分割testfile2_split：', testfile2_split);
	console.log('2.4字符分割replace_text：', replace_text);
	
	//3.split所有空白字符
	let testfile3 = fs.readFileSync('./test.txt').toString().split('\s');
	console.log('3.split所有空白字符\s：', testfile3);
	
	//4.分割成二维数组;
	let testfile4 = fs.readFileSync('./test.txt').toString();
	console.log('4.1分割二维数组testfile4：', testfile4);
	console.log('4.2分割二维数组testfile4[3]：', testfile4[3]);
	let index = testfile4.indexOf('\r\n');
	let posttext = testfile4.substring(0, index);
	console.log('4.3substring(0, index):', posttext);

	
	//5.转换为JSON字符串型
	let a = [];
	let w = [];
	let count = 0;
	let b = [2, 4, 3, -1, 1, 14, 5];
	
	w.push(testfile0);
	console.log('Buffer类型：', w);
	
	
	let m = {
		"x": count,
		"y": b
	};
	a.push(m);
	
	
	req.on('end', () => {
		console.log('JSON数组内容:', a);
	});
	console.log('对数组的序号内容取值：', b[b[1] + 1 + 1]);
	res.end(JSON.stringify(a));
});

server.listen(81, () => {
	console.log('81')
})