let Canvas = $("#canvasTree").get(0);
let ctx = Canvas.getContext("2d");
ctx.font = "18pt Arial";
let treeX = 50; treeY = 80;
let arrClone = [];
let W = 20;

function Calculate(){
    let str = textValue = $("#textBox").val(); 
    let arr = [];
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

    ctx.clearRect(0, 0, Canvas.width, Canvas.height);

    $("#tableInfo").find("tr:gt(0)").remove();
    for(let i = 0; i < arr.length; i++){
        $('#tableInfo').append(`<tr><td>${arr[i].char}</td><td>${arr[i].val}</td><td>${arr[i].code}</td></tr>`);
        //drawTree(arr[i].code,arr[i].char,0,0);
    }
    console.log(arrClone);
    /////////////////////////////////////////////////////////////////
    W = 350 / Math.pow(maximum(arr), 2);
    W = W < 15 ?  15 : W;
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
function getNum(code){
    let ch = code[0];
    let m = 0;
    for (let i = 1; i < code.length; i++) {
        if(code[i] != ch){
            m++;
            ch = code[i];
        }      
    }
    return m;
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
    // else {
    //     let m = getNum(obj.ch1.code);
    //     pos.x -= w*m;
    // }
    if(!obj.ch2.char) {
        anyFunctionDo(obj.ch2, {x: -w*n, y: 80},n/2);
    }
    // else {
    //     let m = getNum(obj.ch2.code);
    //     pos.x += w*m;
    // }
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
    ctx.beginPath();
    ctx.moveTo(begin.x, begin.y);    
    ctx.lineTo(end.x, end.y );
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(begin.x, begin.y, 5, 0, 2 * Math.PI);        
    ctx.fill();
    ctx.fillText(code,begin.x  +  (end.x - begin.x)/2 + ((code ==='1') ? -11 : 0), begin.y  +  (end.y - begin.y)/2);
    
    if(char){
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(end.x, end.y, 15, 0, 2 * Math.PI);        
        ctx.fill();
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(end.x, end.y, 15, 0, 2 * Math.PI);        
        ctx.stroke();
        ctx.fillText(char,end.x -7, end.y +7);
    }
}