const container = document.getElementById('container');
const clockface = document.getElementById('clockface');
const hourCont = document.getElementById('hourCont');
const minCont = document.getElementById('minCont');
const secCont = document.getElementById('secCont');
const allHands = document.getElementsByClassName('hands');
const redSnail = document.getElementById('redSnail');
const blueSnail = document.getElementById('blueSnail');
let imgWH;
const timeContW = 0.45;
setClockDim();
window.addEventListener('load',spellTime);
window.addEventListener('resize',setClockDim);

function setClockDim(){
	imgWH = Math.min(window.innerWidth, window.innerHeight)
	container.style.width = imgWH+'px';
	container.style.height = imgWH+'px';
	for(let i=0; i<allHands.length; i+=1){
		allHands[i].style.width = imgWH*timeContW+'px';
		allHands[i].style.height = imgWH+'px';
		allHands[i].style.left = (imgWH/2)-(imgWH*timeContW/2)+'px';
	}
	redSnail.style.top = imgWH/170+'px';
	blueSnail.style.top = imgWH/170+'px';
	graySnail.style.top = imgWH/170+'px';
}

function time(){
	const now = new Date();
    let hour = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();
    let milsec = now.getMilliseconds();

    hour = hour%12
    let hourdeg = (hour*Math.PI/6)+(min*Math.PI/(6*60))+(sec*Math.PI/(360*60));
    let mindeg = (min*Math.PI/30)+(sec*Math.PI/(30*60))+(milsec*Math.PI/(500*60*60));
    let secdeg = (sec*Math.PI/30)+(milsec*Math.PI/(500*60));

    return{ hour: hourdeg, min: mindeg, sec: secdeg }
};

function spellTime(){
	let whatTime = time();
	let hour = whatTime.hour;
	let min = whatTime.min;
	let sec = whatTime.sec+(Math.PI/30)+(10*Math.PI/(500*60));

	for(let i=0; i<allHands.length; i+=1){
		allHands[i].style.animationTimingFunction = "linear";
		allHands[i].style.WebkitTransitionDuration="1s";
	}
    hourCont.style.webkitTransform = 'rotate('+hour+'rad)';
    minCont.style.webkitTransform = 'rotate('+min+'rad)';
    secCont.style.webkitTransform = 'rotate('+sec+'rad)';
}

setTimeout(() => { setInterval(updateHourMin, 1) }, 1000);
function updateHourMin(){
	hourCont.style.WebkitTransitionDuration="0s";
	minCont.style.WebkitTransitionDuration="0s";

    let whatTime = time();
    let hour = whatTime.hour;
	let min = whatTime.min;
    hourCont.style.transform = 'rotate('+hour+'rad)';
    minCont.style.transform = 'rotate('+min+'rad)';    
}

setTimeout(() => { setInterval(updateSec, 1) }, 1000);
function updateSec(){
	secCont.style.WebkitTransitionDuration="0s";

	let whatTime = time();
	let sec = whatTime.sec;
	secCont.style.transform = 'rotate('+sec+'rad)';
}