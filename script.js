function Calculate(){
    let str =  $("#textBox").val();
    let arr;
    let l = 0;
    while(val.length > 0){
        arr[l] = str[0] + "," + str.match(new RegExp(`${str[0]}`,"g") || []).length;
        val.replace(str[0]);
    }
    console.log(arr);
}