const wired = 'WIRED';
let dataArray;

drawData();
// setInterval(drawData, 1000)
function drawData(){
	dataArray = [];
	for(var i=0; i<wired.length; i+=1){
		plotData(wired[i]);
	}
	connectData();
}

function plotData(letter){
	let pixel = document.getElementsByClassName(`${letter}data`)[0];
	let x = randomNum(5)+1;
	let y = randomNum(7)+1;
	dataArray.push([x,y])
	pixel.style.gridColumn = x+'/'+(x+1);
	pixel.style.gridRow = y+'/'+(y+1);
}

function connectData(){
	let data = document.getElementsByClassName('data');
	for(var i=0; i<data.length-1; i+=1){
		connect(data[i], data[i+1], `DataLine${i}`)
	}
}


/*—————————————————————————————————————— Draw Letter ——————————————————————————————————————*/
let posW = [ [1,1], [1,7], [3,6], [3,2], [5,7], [5,1] ];
const orderW = [ [0,1],[1,2],[2,3],[2,4],[4,5] ];

let posI = [ [1,1], [3,1], [5,1], [1,7], [3,7], [5,7] ];
const orderI = [ [0,1],[1,2],[1,4],[3,4],[4,5] ];

let posR = [ [1,1], [5,1], [5,3], [1,3], [1,7], [5,7] ];
const orderR = [ [0,1],[1,2],[2,3],[0,3],[3,4],[3,5] ];

let posE = [ [1,1], [5,1], [1,4], [5,4], [1,7], [5,7] ];
const orderE = [ [0,1],[0,2],[2,3],[4,5],[2,4] ];

let posD = [ [1,1], [4,1], [5,2], [1,7], [4,7], [5,6] ];
const orderD = [ [0,1],[1,2],[2,5],[0,3],[3,4],[4,5] ];

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
	
	//execptions for letter D
	if (letter==posD){
		if((data===posD[2])||(data===posD[5])){
			posD[1][0]=posD[2][0]-1;
			posD[4][0]=posD[5][0]-1;
		}else{
			posD[2][0]=posD[1][0]+1;
			posD[2][1]=posD[1][1]+1;
			posD[5][0]=posD[4][0]+1;
			posD[5][1]=posD[4][1]-1;
		}
	}
	//execptions for letter W
	if (letter==posW){}
}

changePos(dataArray[0], posW);
changePos(dataArray[1], posI);
changePos(dataArray[2], posR);
changePos(dataArray[3], posE);
changePos(dataArray[4], posD);

drawLetter('W', orderW, posW, 0);
drawLetter('I', orderI, posI, 1);
drawLetter('R', orderR, posR, 2);
drawLetter('E', orderE, posE, 3);
drawLetter('D', orderD, posD, 4);

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
	round(letter, dataArray[num]);
}

function round(letter, data){ document.getElementById(`${letter}-${data}`).style.borderRadius = '100%'; }


/*—————————————————————————————————————— SVG ——————————————————————————————————————*/
let formattedXml;
const doc = document.implementation.createDocument(', ', null);
setSVG();

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
   	dom.setAttribute('style', `left:${cx}px; top:${cy}px; width:${length}px; -moz-transform:rotate(${angle}deg); -webkit-transform:rotate(${angle}deg); -o-transform:rotate(${angle}deg); -ms-transform:rotate(${angle}deg); transform:rotate(${angle}deg);`);
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