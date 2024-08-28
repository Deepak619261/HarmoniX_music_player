console.log("welcome to the js part of my project")

let songindex=0;
let audioElement=new Audio('song/0.mp3');
let masterplay=document.getElementById('masterplay');
let myprgressbar=document.getElementById('myprogressBar');
let gif=document.getElementById('gif');
let songitems=Array.from(document.getElementsByClassName('songItem'));
let mastersongName=document.getElementById('mastersongName');

let songs=[
    {songName:"Dost Banke  by Gurnazar, Rahat Fateh Ali Khan",filePath:"song/0.mp3",coverPath: "covers/1.jpg"},
    {songName:"Ishq (From Lost;Found)",filePath:"song/1.mp3",coverPath: "covers/2.jpg"},
    {songName:"Samjhawan Humpty Sharma Ki Dulhania",filePath:"song/2.mp3",coverPath: "covers/3.jpg"},
    {songName:"tujhe bhula diya - mohit",filePath:"song/3.mp3",coverPath: "covers/4.jpg"},
    {songName:" Aasa Kooda from Think Indie  ",filePath:"song/4.mp3",coverPath: "covers/5.jpg"},
    {songName:"Soulmate - arijit singh ft badshah",filePath:"song/5.mp3",coverPath: "covers/6.jpg"},

];


songitems.forEach((Element,i)=>{
    console.log(Element,i);
    Element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    Element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})


//  handle play and pause events 
 masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause');
        masterplay.classList.add('fa-play');
        gif.style.opacity=0;
        
    }
 })


// listen to events 
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myprgressbar.value=progress;
})

myprgressbar.addEventListener('change',()=>{
    audioElement.currentTime=myprgressbar.value * audioElement.duration/100;
})

const makeallplays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element)=>{
        Element.classList.remove('fa-pause');
        Element.classList.add('fa-play');
    })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element)=>{
    Element.addEventListener('click',(e)=>{
        makeallplays();
        songindex=parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src=`song/${songindex}.mp3`;
        mastersongName.innerText=songs[songindex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songindex>=5){
        songindex=0;
    }
    else{
        songindex+=1;
    }
    audioElement.src=`song/${songindex}.mp3`;
    mastersongName.innerText=songs[songindex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songindex<=0){
        songindex=0;
    }
    else{
        songindex-=1;
    }
    audioElement.src=`song/${songindex}.mp3`;
    mastersongName.innerText=songs[songindex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');

})
