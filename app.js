const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");    //2차원 캔버스
const colors = document.getElementsByClassName ("jsColor");
const range = document.getElementById("jsRange");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c"; 
ctx.lineWidth = 2.5;    //선의 너비

let painting = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){  //마우스를 움직이는 동안 발생
        ctx.beginPath();    //마우스를 움직이는 곳 중 시작점
        ctx.moveTo(x, y);   //path 이동
    }else{          //마우스 드래그
        ctx.lineTo(x, y);   //path의 이전위치에서 지금위치까지 선을 만듦
        ctx.stroke();       //path를 만들고 선을 그음
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

function handleRangeClick(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach((color) => 
    color.addEventListener("click", handleColorClick)
);

if(range){
    range.addEventListener("click", handleRangeClick);
}