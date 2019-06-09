let Canvas = $("#canvasTree").get(0);
let ctx = Canvas.getContext("2d");
ctx.font = "18pt Arial";
let treeX = 50; treeY = 80;
let arrClone = [];
let W = 20;
let context = ctx;
let canvasSave = $("#canvasSave").get(0);
let contx = canvasSave.getContext("2d");

let arr = [];

function Calculate(){
    let str = textValue = $("#textBox").val(); 
    arr = [];
    while(str.length > 0){
        let s = str[0];
        let o = str.match(new RegExp(`${s}`,"g") || []).length;
        arr.push({
            char: s,
            val: o
        });
        for(o; o > 0; o--)
        str = str.replace(s,'');
    }
    getCodes(arr);
    mySort(arr);
    $('#textArea').val(codingText(textValue,arr));
    $("#buttonSave").prop('disabled',false);
    context = ctx;
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);

    $("#tableInfo").find("tr:gt(0)").remove();
    for(let i = 0; i < arr.length; i++){
        $('#tableInfo').append(`<tr><td>${arr[i].char}</td><td>${arr[i].val}</td><td>${arr[i].code}</td></tr>`);
    }
    console.log(arrClone);
    
    
    anyFunctionDo(arrClone[0], {x:350, y:10}, Math.pow(maximum(arr), 2));
    anyFunctionDo1(arrClone[0]);
}
function getCodes(arr){
    arrClone = [...arr];

    while (arrClone.length > 1) {
        mySort(arrClone);
        res = {
            val: arrClone[0].val + arrClone[1].val,
            ch1: arrClone[0],
            ch2: arrClone[1]
        }
        arrClone.shift();
        arrClone[0] = res;
        res.ch1.num = '0';
        res.ch2.num = '1';
        res.ch1.parent = arrClone[0];
        res.ch2.parent = arrClone[0];
    }
    for (let i = 0; i < arr.length; i++) {
        let code = '';
        let ptr = arr[i];
        while(ptr.parent){
            code = ptr.num + code;
            ptr = ptr.parent;
        }
        arr[i].code = code;      
    }
}
function mySort(_arr){
    _arr.sort((a, b) => {
        return a.val - b.val;
    });
}

function maximum(_arr){
    m = 0;
    for(let i = 0; i<_arr.length;i++){
        if(_arr[i].code.length > m)
            m = _arr[i].code.length;
    }
    return m;
}

function codingText(text,arr){
    let str = "";
    for(let i = 0; i < text.length; i++){
        str +=  arr[getIndexCon(text[i],arr)].code;
    }
    return str;
}
function getIndexCon(ch,arr){
    for(let i = 0; i < arr.length; i++){
        if(arr[i].char == ch)
        {
            return i;
        }
    }
}
function anyFunctionDo(obj, pos, n) {
    
    obj.pos = pos;
    let getpos = function() {
        return this.parent ? {
            x: this.pos.x + this.parent.getPos().x,
            y: this.pos.y + this.parent.getPos().y,
        } : {
            x: this.pos.x,
            y: this.pos.y,
        }
    }
    
    obj.getPos = getpos;        
    
    const w = W;

    if(!obj.ch1.char) {        
        anyFunctionDo(obj.ch1, {x: w*n, y: 80},n/2);
    }
    if(!obj.ch2.char) {
        anyFunctionDo(obj.ch2, {x: -w*n, y: 80},n/2);
    }
    obj.ch1.getPos = getpos;
    obj.ch2.getPos = getpos;
    obj.ch1.pos = pos;
    obj.ch2.pos = pos;
}


function anyFunctionDo1(obj) {
    if(!obj.ch1.char) {
        anyFunctionDo1(obj.ch1);
    } 
    if(!obj.ch2.char) {
        anyFunctionDo1(obj.ch2);
    }


    if(obj.ch1.ch1) {
        draw(obj.ch1.getPos(), {x:obj.ch1.ch1.getPos().x, y: obj.ch1.ch1.getPos().y}, "0", obj.ch1.char);
    } else {
        if(obj.ch1.ch2) {
            draw(obj.ch1.getPos(), {x:obj.ch1.ch2.getPos().x, y: obj.ch1.ch2.getPos().y}, "0", obj.ch1.char);
        } else {
            draw(obj.ch1.getPos(), {x:obj.ch1.getPos().x + W, y: obj.ch1.getPos().y + 80}, "0", obj.ch1.char);
        }
    }
    if(obj.ch2.ch1) {
        draw(obj.ch2.getPos(), {x:obj.ch2.ch1.getPos().x, y: obj.ch2.ch1.getPos().y}, "1", obj.ch2.char);
    } else {
        if(obj.ch2.ch2) {
            draw(obj.ch2.getPos(), {x:obj.ch2.ch2.getPos().x, y: obj.ch2.ch2.getPos().y}, "1", obj.ch2.char);
        } else {
            draw(obj.ch2.getPos(), {x:obj.ch2.getPos().x - W, y: obj.ch2.getPos().y + 80}, "1", obj.ch2.char);
        }
    }
    
}

function draw(begin, end, code, char) {
    begin.x
    begin.y
    context.beginPath();
    context.moveTo(begin.x, begin.y);    
    context.lineTo(end.x, end.y );
    context.stroke();
    context.beginPath();
    context.arc(begin.x, begin.y, 5, 0, 2 * Math.PI);        
    context.fill();
    context.fillText(code,begin.x  +  (end.x - begin.x)/2 + ((code ==='1') ? -11 : 0), begin.y  +  (end.y - begin.y)/2);
    
    if(char){
        context.clearRect(end.x-15, end.y-15, 30,30);
        context.beginPath();
        context.arc(end.x, end.y, 15, 0, 2 * Math.PI);        
        context.stroke();
        context.fillText(char,end.x -7, end.y +7);
    }
}

function Save(){
    canvasSave.width = Math.pow(maximum(arr)+2, 2)*60;
    canvasSave.height = (maximum(arr) + 1) * 80;
    contx.clearRect(0, 0, canvasSave.width, canvasSave.height);

    contx.font = "18pt Arial";    
    context = contx;
    arrClone[0].pos.x = canvasSave.width/4;
    anyFunctionDo1(arrClone[0]);

    let image = getImage();
    saveImage(image);
    
}
function getImage(){
    let imageData = canvasSave.toDataURL();
    let image = new Image();
    image.src = imageData;
    return image;
} 
function saveImage(image) {
    let link = document.createElement("a");
 
    link.setAttribute("href", image.src);
    link.setAttribute("download", "Tree");
    link.click();
} 