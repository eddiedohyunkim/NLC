// let formattedXml;
// const doc = document.implementation.createDocument(', ', null);
// create(xmlWriter);

// function create(later) {
// 	const svgElem = doc.createElement('svg');
// 	svgElem.setAttribute('xmlns','http://www.w3.org/2000/svg');
// 	svgElem.setAttribute('version','1.0');
// 	svgElem.setAttribute('style', 'position:fixed;');
// 	width = 1150;
// 	height = 210;
// 	svgElem.setAttribute('width',width);
// 	svgElem.setAttribute('height',height);

// 	const path = document.createElement('path');
// 	path.setAttribute('d', 'M 75 45     C 100 140, 300 100,    325 195');
// 	path.setAttribute('stroke', '#f0f');
// 	path.setAttribute('stroke-width', '2');
// 	path.setAttribute('fill', 'transparent');
// 	svgElem.appendChild(path);

	
// 	doc.appendChild(svgElem);
//  	later();
// } 

// function xmlWriter(){
// 	const heading = '<?xml version="1.0" encoding="UTF-8"?>'
// 	const s = new XMLSerializer();
// 	const str = heading + s.serializeToString(doc);
// 	const format = require('xml-formatter');
// 	formattedXml = format(str);
// 	console.log(formattedXml);
// 	print();
// }

// function print (){
// 	const container = document.getElementById('SVGcontainer');
// 	container.innerHTML = formattedXml;
// };






const wPixelPos = [ [1,1],[1,7],[3,6],[3,2],[5,7],[5,1] ];
const wLineOrder = [ [0,1],[1,2],[2,3],[2,4],[4,5] ];

const iPixelPos = [ [1,1], [3,1], [5,1], [1,7], [3,7], [5,7] ];
const iLineOrder = [ [0,1],[1,2],[1,4],[3,5] ];

const rPixelPos = [ [1,1], [5,1], [5,3], [1,3], [1,7], [5,7] ];
const rLineOrder = [ [0,1],[1,2],[2,3],[0,4],[3,5] ];

const ePixelPos = [ [1,1], [5,1], [1,4], [5,4], [1,7], [5,7] ];
const eLineOrder = [ [0,1],[2,3],[4,5],[0,4] ];

const dPixelPos = [ [1,1], [4,1], [5,2], [1,7], [4,7], [5,6] ];
const dLineOrder = [ [0,1],[2,5],[0,3],[3,4] ];

const wired = 'WIRED';

drawData();
function drawData(){
	for(var i=0; i<wired.length; i+=1){
		randomPink(wired[i]);
	}
	connectData();
}

function randomPink(letter){
	let pixel = document.createElement('div');
	pixel.className = `data ${letter}data`;
	let x = randomNum(5)+1;
	let y = randomNum(7)+1;
	pixel.style.gridColumn = x+'/'+(x+1);
	pixel.style.gridRow = y+'/'+(y+1);
	document.getElementById(`${letter}-grid`).appendChild(pixel);
}

function connectData(){
	let data = document.getElementsByClassName('data');
	for(var i=0; i<data.length-1; i+=1){
		connect(data[i], data[i+1], `DataLine${i}`)
	}
}


// const options = [1,3,7];
// const data = randomNum(7);
// console.log('This is the random number: '+data+" and closest one is: "+closest(data, options))



// https://www.gavsblog.com/blog/find-closest-number-in-array-javascript#:~:text=Find%20the%20closest%20value%20in%20array%20using%20reduce()&text=The%20easiest%20way%20to%20do,()%2C%20so%20lets%20use%20that.&text=With%20this%20function%20we%20check,and%20then%20return%20the%20winner.
// function closest(needle, haystack) {
//     return haystack.reduce((a, b) => {
//         let aDiff = Math.abs(a - needle);
//         let bDiff = Math.abs(b - needle);

//         if (aDiff == bDiff) {
//             return a > b ? a : b;
//         } else {
//             return bDiff < aDiff ? b : a;
//         }
//     });
// }


plotDots('W', wPixelPos);
plotDots('I', iPixelPos);
plotDots('R', rPixelPos);
plotDots('E', ePixelPos);
plotDots('D', dPixelPos);

function plotDots(letter, pos){
	for(var i=0; i<6; i+=1){
	let pixel = document.createElement('div');
	pixel.className = `pixels ${letter}pixels`;
	pixel.setAttribute('id', letter+(i+1));
	pixel.style.gridColumn = pos[i][0]+'/'+(pos[i][0]+1);
	pixel.style.gridRow = pos[i][1]+'/'+(pos[i][1]+1);
	document.getElementById(`${letter}-grid`).appendChild(pixel);
	}
}

drawline()
function drawline(){
	let wpixel = document.getElementsByClassName('Wpixels');
	for(var i=0; i<wLineOrder.length; i+=1){
		connect(wpixel[wLineOrder[i][0]], wpixel[wLineOrder[i][1]], `WL${i+1}`)
	}

	let ipixel = document.getElementsByClassName('Ipixels');
	for(var i=0; i<iLineOrder.length; i+=1){
		connect(ipixel[iLineOrder[i][0]], ipixel[iLineOrder[i][1]], `IL${i+1}`)
	}

	let rpixel = document.getElementsByClassName('Rpixels');
	for(var i=0; i<rLineOrder.length; i+=1){
		connect(rpixel[rLineOrder[i][0]], rpixel[rLineOrder[i][1]], `RL${i+1}`)
	}

	let epixel = document.getElementsByClassName('Epixels');
	for(var i=0; i<eLineOrder.length; i+=1){
		connect(epixel[eLineOrder[i][0]], epixel[eLineOrder[i][1]], `EL${i+1}`)
	}

	let dpixel = document.getElementsByClassName('Dpixels');
	for(var i=0; i<dLineOrder.length; i+=1){
		connect(dpixel[dLineOrder[i][0]], dpixel[dLineOrder[i][1]], `DL${i+1}`)
	}
}



function randomNum(max) {
  return Math.floor(Math.random() * max);
}
function connect(div1, div2, line) {
    var off1 = getOffset(div1);
    var off2 = getOffset(div2);
    var cont = getOffset(document.getElementById('big-container'));
    // bottom right
    var x1 = off1.left - cont.left + (off1.width/2);
	var y1 = off1.top - cont.top + (off1.height/2);
	// top right
	var x2 = off2.left - cont.left + (off2.width/2);
	var y2 = off2.top - cont.top  + (off2.height/2);

    // distance
    var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
    // center
    var cx = ((x1 + x2) / 2) - (length / 2);
    var cy = ((y1 + y2) / 2) - (3 /*line width*/ / 2);
    // angle
    var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
    // make hr
    let html = document.getElementById(line);
   	html.setAttribute('style', `left:${cx}px; top:${cy}px; width:${length}px; -moz-transform:rotate(${angle}deg); -webkit-transform:rotate(${angle}deg); -o-transform:rotate(${angle}deg); -ms-transform:rotate(${angle}deg); transform:rotate(${angle}deg);`);
}

function getOffset(el) {
    var rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight
    };
}