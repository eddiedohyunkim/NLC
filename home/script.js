const text = {
    name: 'Eddie Kim—',
    title: 'Next Level Coding Fall 2022 Talia Cotton',
    project: [
        ['Project 1: You show-off!', 'https://eddiedohyunkim.github.io/nlc/findeddie/'],
        ['Project 2: Editorial Illustration', 'https://eddiedohyunkim.github.io/nlc/slow-moving-crisis/'],
        ['Project 3: Periodical Logo', 'https://eddiedohyunkim.github.io/nlc/periodical-logo/'],
        ['Intermission: Cookies', '']
    ]
}
let fonts;
const url = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAsv81hZA0Wg-tEZj1lrqKrQNyUUSyJdvk"
fetch(url)
    .then(function(response){return response.json();})
    .then(function(json){googleFonts(json);})

function googleFonts(data) {
    fonts = data;
    console.log(fonts);
    for(let i=0; i<fonts.items.length; i+=1){
        setFontLink(i)
    }

    createSpan(text.name, 'titleCont0')
    createSpan(text.title, 'titleCont1')
    for(let i=0; i<text.project.length; i+=1){
        createSpan(text.project[i][0], `projCont${i}`,text.project[i][1])
    }
}

function createSpan(item, cont, link){
    for(let i=0; i<item.length; i+=1){
        let span = document.createElement('span');
        span.innerHTML = item[i];

        let choose = fonts.items[random(fonts.items.length)];
        span.style.fontFamily = choose.family+", " + choose.category;
        // span.style.backgroundColor = `rgb(${random(256)},${random(256)},${random(256)})`;
        let duration = 5;
        span.addEventListener('mouseover', event => {span.style.fontFamily=fonts.items[random(fonts.items.length)].family});

        // let div = document.getElementById('titleCont1');
        // div.addEventListener('touchstart', change);
        // div.addEventListener('touchmove', change);

        if(link){
            let a = document.createElement('a');
            a.href = link;
            a.target = '_blank';
            a.className = 'a_blue';
            document.getElementById(cont).appendChild(a).appendChild(span);
        }else{
            document.getElementById(cont).appendChild(span);    
        }
        
    } 
}

function setFontLink(num){
    let font = fonts.items[num];
    let fontLink = document.createElement("link");
    fontLink.setAttribute("rel", "stylesheet");
    fontLink.setAttribute("href", "https://fonts.googleapis.com/css?family=" + font.family);
    document.head.appendChild(fontLink);
}

function random(num){
    return Math.floor(Math.random()*num);
}
