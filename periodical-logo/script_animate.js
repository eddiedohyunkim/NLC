const wired = 'WIRED';
let trends;

drawData();
setInterval(drawData, 3000)

function drawData(){
	trends = [];

	let posW = [ [1,1], [1,6], [3,5], [3,1], [5,6], [5,1] ];
	const orderW = [ [0,1],[1,2],[2,3],[2,4],[4,5] ];
	
	let posI = [ [1,1], [3,1], [5,1], [1,6], [3,6], [5,6] ];
	const orderI = [ [0,1],[1,2],[1,4],[3,4],[4,5] ];
	
	let posR = [ [1,1], [5,1], [5,3], [1,3], [1,6], [5,6] ];
	const orderR = [ [0,1],[1,2],[2,3],[0,3],[3,4],[3,5] ];
	
	let posE = [ [1,1], [5,1], [1,3], [5,3], [1,6], [5,6] ];
	const orderE = [ [0,1],[0,2],[2,3],[4,5],[2,4] ];
	
	let posD = [ [1,1], [4,1], [5,3], [1,6], [4,6], [5,4] ];
	const orderD = [ [0,1],[1,2],[2,5],[0,3],[3,4],[4,5] ];

	const url = 'https://www.randomnumberapi.com/api/v1.0/random?min=10&max=99&count=5';
	fetch(url)
		.then(function(response){return response.json();})
		.then(function(json){getData(json);})

	function getData(data) {
		console.log(data);
		for(let i=0; i<data.length; i+=1){
			let so = data[i].toString()[0]
			let st = data[i].toString()[1]
			let co = map(parseFloat(st),0,9,0,4)+1;
			let ct = map(parseFloat(so),1,9,0,5)+1;
			trends.push([6-co, 7-ct])
		}
		console.log(trends);

		plotData();
		connectData();
	
		changePos(trends[0], posW);
		changePos(trends[1], posI);
		changePos(trends[2], posR);
		changePos(trends[3], posE);
		changePos(trends[4], posD);
		
		setTimeout(function(){ drawLetter('W', orderW, posW, 0)},0);
		setTimeout(function(){ drawLetter('I', orderI, posI, 1)},100);
		setTimeout(function(){ drawLetter('R', orderR, posR, 2)},200);
		setTimeout(function(){ drawLetter('E', orderE, posE, 3)},300);
		setTimeout(function(){ drawLetter('D', orderD, posD, 4)},400);
	}
}
/*—————————————————————————————————————— Draw Data ——————————————————————————————————————*/
function map(value, low1, high1, low2, high2) { return Math.round( low2 + (high2 - low2) * (value - low1) / (high1 - low1) ); }

function plotData(){
	for(var i=0; i<wired.length; i+=1){
		let pixel = document.getElementsByClassName(`${wired[i]}data`)[0];
		let x = trends[i][0];
		let y = trends[i][1];
		pixel.style.gridColumn = x+'/'+(x+1);
		pixel.style.gridRow = y+'/'+(y+1);
	}
}

function connectData(){
	let data = document.getElementsByClassName('data');
	let time = 100;
	// for(var i=0; i<data.length-1; i+=1){
	// 	for(let x=0; x<4; x+=1){
	// 		setTimeout(function(){ connect(data[0], data[x+1], `DataLine${x}`) }, x*time);
	// 	}
	// 	for(let y=1; y<4; y+=1){
	// 		setTimeout(function(){ connect(data[1], data[y+1], `DataLine${y+3}`) }, y*time);
	// 	}
	// 	for(let z=2; z<4; z+=1){
	// 		setTimeout(function(){ connect(data[2], data[z+1], `DataLine${z+5}`) }, z*time);
	// 	}
	// 	setTimeout(function(){ connect(data[3], data[4], `DataLine${9}`) }, time*3);
	// }
	setTimeout(function(){ connect(data[0], data[1], `DataLine${0}`) }, 0);
	setTimeout(function(){ connect(data[1], data[2], `DataLine${4}`) }, 100);
	setTimeout(function(){ connect(data[2], data[3], `DataLine${7}`) }, 200);
	setTimeout(function(){ connect(data[3], data[4], `DataLine${9}`) }, 300);
}

/*—————————————————————————————————————— Draw Letter ——————————————————————————————————————*/
function DistSquared(pt1, pt2) {
    let diffX = pt1[0] - pt2[0];
    let diffY = pt1[1] - pt2[1];
    return (diffX*diffX+diffY*diffY);
}

function measure(data,dest){
	let closest = dest[0];
	let shortestDistance = DistSquared(data, dest[0]);
	for (i = 0; i < dest.length; i++) {
    	let d = DistSquared(data, dest[i]);
    	if (d < shortestDistance) {
      		closest = dest[i];
      		shortestDistance = d;
    	}
	}
	return closest;
}

function changePos(data,letter){
	let closest = measure(data,letter);
	let found = letter.indexOf(measure(data,letter));
	if (~found) { letter[found] = data; }
	letter.forEach(function(item, i) { if (item[0] === closest[0]) letter[i][0] = data[0]; });
	letter.forEach(function(item, i) { if (item[1] === closest[1]) letter[i][1] = data[1]; });
	
	//execptions for letter D – Prevent 'D' not looking like 'D'
	// if (letter==posD){
	// 	if((data===posD[2])||(data===posD[5])){ posD[1][0]=posD[2][0]-1; posD[4][0]=posD[5][0]-1;
	// 	}else{ posD[2]=[ posD[1][0]+1, posD[1][1]+1 ]; posD[5]=[ posD[4][0]+1, posD[4][1]-1 ]; }
	// }
	// // execptions for letter W – Prevent 'W' looking like 'N'
	// if (letter==posW){
	// 	if(((data[0]===1)||(data[0]===5))&&(data[1]===4)){
	// 		if(data[0]===1){ posW[0] = [ data[0], data[1] ]; posW[5][1]=data[1]; }
	// 		if(data[0]===5){ posW[5] = [ data[0], data[1] ]; posW[0][1]=data[1]; } 
	// 		posW[2]=[3,7]; posW[3]=[3,posW[0][1]+1];
	// 	}else if(posW[3][1]<posW[0][1]){ posW[3][1]=posW[0][1]+1; }
	// }
}

function drawLetter(letter, order, pos, num){
	// plot dots
	let pixel = document.getElementsByClassName(`${letter}pixels`);
	for(var i=0; i<pixel.length; i+=1){
		pixel[i].setAttribute('id', `${letter}-${pos[i][0]},${pos[i][1]}`);
		pixel[i].style.gridColumn = pos[i][0]+'/'+(pos[i][0]+1);
		pixel[i].style.gridRow = pos[i][1]+'/'+(pos[i][1]+1);
	}

	// connect dots
	let pixels = document.getElementsByClassName(`${letter}pixels`);
	for(var i=0; i<order.length; i+=1){
		connect(pixels[order[i][0]], pixels[order[i][1]], `${letter}L${i+1}`)
	}
	// round(letter, trends[num]);
}
function round(letter, data){ 
	document.getElementById(`${letter}-${data}`).style.borderRadius = '100%'; 
}

/*—————————————————————————————————————— SVG ——————————————————————————————————————*/
let formattedXml;
const doc = document.implementation.createDocument(', ', null);

// setSVG();

function setSVG() {
	const svgElem = doc.createElement('svg');
	svgElem.setAttribute('xmlns','http://www.w3.org/2000/svg');
	svgElem.setAttribute('version','1.0');
	// svgElem.setAttribute('style', ' background-color:gray;');
	let width = document.getElementById('big-container').offsetWidth;
	let height = document.getElementById('big-container').offsetHeight+200;
	svgElem.setAttribute('width',width);
	svgElem.setAttribute('height',height);

	let datas = document.getElementsByClassName('data');
	for(let i=0; i<datas.length-1; i+=1){
		const path = document.createElement('path');
		path.setAttribute('d', connectSVG(datas[i], datas[i+1]) );
		path.setAttribute('stroke', '#f07');
		// path.setAttribute('stroke', '#fff');
		path.setAttribute('stroke-width', '4');
		path.setAttribute('fill', 'transparent');
		svgElem.appendChild(path);	
	}
	doc.appendChild(svgElem);
	xmlWriter();
} 

function xmlWriter(){
	const heading = '<?xml version="1.0" encoding="UTF-8"?>'
	const s = new XMLSerializer();
	const str = heading + s.serializeToString(doc);
	const format = require('xml-formatter');
	formattedXml = format(str);
	print();
}

function print (){
	const container = document.getElementById('SVGcontainer');
	container.innerHTML = formattedXml;
};

function connectSVG(div1, div2) {
    let off1 = getOffset(div1);
    let off2 = getOffset(div2);
    let cont = getOffset(document.getElementById('big-container'));
    let x1 = off1.left - cont.left + (off1.width/2);
	let y1 = off1.top - cont.top + (off1.height/2)+100;
	let x2 = off2.left - cont.left + (off2.width/2);
	let y2 = off2.top - cont.top  + (off2.height/2)+100;
    return `M ${x1} ${y1} C ${x1+70} ${y1+70}, ${x2-70} ${y1-70}, ${x2} ${y2}`;
}

/*—————————————————————————————————————— Drawing Lines ——————————————————————————————————————*/
function randomNum(max) { return Math.floor(Math.random() * max); }
function connect(div1, div2, line) {
    let off1 = getOffset(div1);
    let off2 = getOffset(div2);
    let cont = getOffset(document.getElementById('big-container'));
    let dom = document.getElementById(line);
    // from 
    let x1 = off1.left - cont.left + (off1.width/2);
	let y1 = off1.top - cont.top + (off1.height/2);
	// to
	let x2 = off2.left - cont.left + (off2.width/2);
	let y2 = off2.top - cont.top  + (off2.height/2);
    // distance
    let length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
    // center
    let cx = ((x1 + x2) / 2) - (length / 2);
    let cy = ((y1 + y2) / 2) - (dom.offsetHeight / 2);
    // angle
    let angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
    // make hr
    dom.setAttribute('style', `left:${cx}px; top:${cy}px; width:${length}px; transform:rotate(${angle}deg);`);
}

function getOffset(el) {
    let rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight
    };
}