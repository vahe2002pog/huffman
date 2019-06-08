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

    $("#tableInfo").find("tr:gt(0)").remove();
    for(let i = 0; i < arr.length; i++){
        $('#tableInfo').append(`<tr><td>${arr[i].char}</td><td>${arr[i].val}</td><td>${arr[i].code}</td></tr>`);
    }
}

drawTree();
function getCodes(arr){
    let arrClone = [...arr];

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
function drawTree(arr){
    let Canvas = $("#canvasTree").get(0);
    let ctx = Canvas.getContext("2d");

    for(let i = 1;i<10;i++){
        ctx.beginPath();
        ctx.arc(700 + i*50, i*80, 15, 0, 2 * Math.PI);        
        ctx.moveTo(700 + i*50, i*80-15);        
        ctx.lineTo(700 + (i-1)*50+15, (i-1)*80-10 );
        ctx.stroke();
        
        ctx.beginPath();        
        ctx.arc(700 + (-i)*50, i*80, 15, 0, 2 * Math.PI);        
        ctx.moveTo(700 + (-i)*50, i*80-15);        
        ctx.lineTo(700 + ((-i)+1)*50, (i-1)*80-10 );
        ctx.stroke();
    }
    
}