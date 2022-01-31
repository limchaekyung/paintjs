const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");    //2차원 캔버스
const colors = document.getElementsByClassName ("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const reset = document.getElementById("jsReset");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";

ctx.strokeStyle = INITIAL_COLOR; 
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;    //선의 너비

// ctx.fillRect(50, 20, 100, 40);  //x좌표, y좌표, width, height

let painting = false;
let filling = false;

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
    ctx.fillStyle = color;
}

function handleRangeClick(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(event){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"
    }else{
        filling = true;
        mode.innerText = "Paint"
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event){   //마우스 우클릭 방지
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "Paint🎨";
    link.click();
}
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(reset){
    reset.addEventListener("click", () =>
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    );
}

Array.from(colors).forEach((color) => 
    color.addEventListener("click", handleColorClick)
);

if(range){
    range.addEventListener("click", handleRangeClick);
}

if(save){
    save.addEventListener("click", handleSaveClick);
}