const auth = '563492ad6f917000010000016536199d8d8a4160bc6bb0af7df478e6';
const amount = '80';
const query = '"asian%20male"%20face';
const image = document.querySelector('img');
const title = document.getElementById('top');
const caption = document.getElementById('bottom');
const imageCont = document.getElementById('imgCont')
let pexelsArr = [];
let interval;

call(1)
call(2)
function call(page){
	fetch(`https://api.pexels.com/v1/search/?page=${page}&per_page=${amount}&query=${query}&orientation=landscape`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: auth
		}
	})
	.then(function(response){return response.json();})
	.then(function(json){getImgSrc(json);})
}

function getImgSrc(data) {
	for(let i=0; i<data.photos.length; i+=1){
		let photoSrc = {'src': data.photos[i].src.original,'photographer': data.photos[i].photographer, 'alt': 'wrong'}
		pexelsArr.push(photoSrc);
	}
	for(let j=0; j<2; j+=1){
		let eddie = {'src': 'assets/eddie_large.jpg','photographer': 'Kuan Hsieh', 'alt': 'correct'}
		pexelsArr.push(eddie);
	}
	if(pexelsArr.length<84){
		changeImg(pexelsArr);
	}
	console.log(pexelsArr)
	
}

function changeImg() {
  // check if an interval has already been set up
  if (!interval) {
    interval = setInterval(flashImg, 2000);
  }
}

function findEddieTitle(){
	title.innerHTML = 'Find Eddie';
	title.style.color = '#fff';
}

function flashImg(){
	findEddieTitle();
	let random = Math.floor(Math.random()*pexelsArr.length);
	image.setAttribute('src', pexelsArr[random].src );
	image.setAttribute('alt', pexelsArr[random].alt );
	image.addEventListener('load', (event) => {
		caption.innerHTML = 'photo by ' + pexelsArr[random].photographer;
	});
}

window.addEventListener('click', decision);
function decision() {
	clearInterval(interval);
	// release our intervalID from the variable
	interval = null;
	if(image.alt==='correct'){
		title.innerHTML = 'You found Eddie, good job';
		imageCont.style.backgroundColor='#00aaFF';
		image.style.mixBlendMode = 'multiply';
	}else{
		title.innerHTML = 'This is not Eddie, <a href="./index.html">try again<a>';
		imageCont.style.backgroundColor='#ff0000';
		image.style.mixBlendMode = 'multiply';
	}
}

// adjust image size when window resize
image.onload = function(){imgAdjst()};
window.addEventListener('resize', imgAdjst);

function imgAdjst(){
	let winW = window.innerWidth;
	let winH = window.innerHeight;
	let imgW = image.clientWidth;
	let imgH = image.clientHeight;
	image.style.width = '100vw';
	if((imgW/imgH)>(winW/winH)){
		image.setAttribute('style', 'height:100vh; width:auto; mix-blend-mode:multiply;');
		image.style.marginLeft = Math.floor((image.clientWidth-winW)/2*(-1))+'px';
	}else{
		image.setAttribute('style', 'width:100vw; height:auto; mix-blend-mode:multiply;');
		image.style.marginTop = Math.floor((image.clientHeight-winH)/2*(-1))+'px';
	}
}

