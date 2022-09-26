const container = document.getElementById('container');
const clockface = document.getElementById('clockface');
const hourCont = document.getElementById('hourCont');
const minCont = document.getElementById('minCont');
const redSnail = document.getElementById('redSnail');
const blueSnail = document.getElementById('blueSnail');
const digitalClock = document.getElementById('digitalClock');
let imgWH;
let spanFontSize;
let spanSize;
let timeContW = 0.35;
setClockDim();
window.addEventListener('load',spell);
window.addEventListener('load',spellTime);
window.addEventListener('load',digitalClock);
window.addEventListener('resize',setClockDim);

function setClockDim(){
	imgWH = Math.min(window.innerWidth, window.innerHeight)
	spanFontSize = imgWH/10;
	spanSize = spanFontSize;
	container.style.width = imgWH+'px';
	container.style.height = imgWH+'px';
	hourCont.style.width = imgWH*timeContW+'px';
	hourCont.style.height = imgWH+'px';
	hourCont.style.left = (imgWH/2)-(imgWH*timeContW/2)+'px';
	minCont.style.width = imgWH*timeContW+'px';
	minCont.style.height = imgWH+'px';
	minCont.style.left = (imgWH/2)-(imgWH*timeContW/2)+'px';
	redSnail.style.top = imgWH/4+'px';
	blueSnail.style.top = imgWH/8+'px';
	digitalClock.style.top = imgWH*0.547+'px';
	digitalClock.style.left = (imgWH/2)+'px';
	digitalClock.style.fontSize = spanFontSize*0.3+'px';
	digitalClock.style.letterSpacing = '0px';
	setNumbers()
}

function setNumbers() {
	const numberPos = [
  	 [imgWH/2,spanSize/2],[imgWH*0.7225,imgWH/8.675],[imgWH-imgWH/8.675,imgWH/3.575],[imgWH-spanSize/2,imgWH/2],[imgWH-imgWH/8.675,imgWH-imgWH/3.575],[imgWH*0.7225,imgWH-imgWH/8.675],[imgWH/2,imgWH-spanSize/2],[imgWH*0.2775,imgWH-imgWH/8.675],[imgWH/8.675,imgWH-imgWH/3.575],[spanSize/2,imgWH/2],[imgWH/8.675,imgWH/3.575],[imgWH*0.2775,imgWH/8.675]
  	]
	for(let i = 0; i < 12; i+=1){
		let n = 'n'+(i).toString();
		let numbers = document.getElementById(n);
		numbers.style.fontSize = spanFontSize+'px';
		numbers.style.width = spanSize+'px';
		numbers.style.left = numberPos[i][0]+'px';
		numbers.style.top = numberPos[i][1]+'px';
	}
}

function spell(){
	let count = 0;
	let interval = setInterval(function(){
		let numbers = document.getElementById('n'+count);
		numbers.style.opacity = 1;
		count++;
		if(count === 12){ 
			clearInterval(interval);
		}
	}, 50);
}

// Adapted from the following W3Schools example
// https://www.w3schools.com/graphics/tryit.asp?filename=trycanvas_clock_start
function time(){
	const now = new Date();
    let hour = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();
    
    hour=hour%12
    hour=(hour*Math.PI/6)+
    (min*Math.PI/(6*60))+
    (sec*Math.PI/(360*60));

    min=(min*Math.PI/30)+(sec*Math.PI/(30*60));

    return{ hour: hour, min: min }
};

function spellTime(){
	let whatTime = time();
	let hour = whatTime.hour;
	let min = whatTime.min;

    hourCont.style.animationTimingFunction = "linear";
    hourCont.style.WebkitTransitionDuration="1s";
    hourCont.style.webkitTransform = 'rotate('+hour+'rad)';

    minCont.style.animationTimingFunction = "linear";
    minCont.style.WebkitTransitionDuration="1s";
    minCont.style.webkitTransform = 'rotate('+min+'rad)';
}

setInterval(updateTime, 1000);
function updateTime(){
	hourCont.style.WebkitTransitionDuration="0s";
	minCont.style.WebkitTransitionDuration="0s";
    let whatTime = time();
	let hour = whatTime.hour;
	let min = whatTime.min;

    hourCont.style.transform = 'rotate('+hour+'rad)';
    minCont.style.transform = 'rotate('+min+'rad)'; 
}

setInterval(digitalClck, 1000);
function digitalClck(){
	const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    h = (h < 10) ? '0' + h : h;
    m = (m < 10) ? '0' + m : m;
    s = (s < 10) ? '0' + s : s;
    
    let digiTime = h+':'+m+':'+s;
    // let digiTime = '11:11:11';

    digitalClock.innerText = digiTime;
    digitalClock.textContent = digiTime;
}
