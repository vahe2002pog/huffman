
function Calculate(){
    let str = textValue = $("#textBox").val();
    let arr = [];
    let l = 0;
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
        res.ch1.code = '0';
        res.ch2.code = '1';
        res.ch1.parent = arrClone[0];
        res.ch2.parent = arrClone[0];
    }

    let codes = [];
    for (let i = 0; i < arr.length; i++) {
        let code = '';
        let ptr = arr[i];
        while(ptr.parent){
            code = ptr.code + code;
            ptr = ptr.parent;
        }
        codes.push({
            char: arr[i].char,
            code: code
        })        
    }
}

function mySort(_arr){
    _arr.sort((a, b) => {
        return a.val - b.val;
    });
}
