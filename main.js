let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discound = document.getElementById("discound");
let totle = document.getElementById("totle");
let count = document.getElementById("count");
let categary = document.getElementById("categary");
let supmit = document.getElementById("supmit");
let search = document.getElementById("search");
let searchtitle = document.getElementById("searchtitle");
let searchcategray = document.getElementById("searchcategray");
let tbody = document.getElementsByTagName("tbody")[0];
let update = document.getElementById("update");
let delet = document.getElementsByClassName("delete");
let output = document.querySelector(".output");
let table = document.querySelector("table");
// let deletalldata = document.getElementById("deletall");
//console.log(table);
let mood = "create";
let temp;
// console.log (title,price,taxes,ads,totle,count,categary,search,searchtitle,searchcategray);

/*get total*/
function get_total(){
    let result;
    if(price.value !=''){
        result = +price.value + +taxes.value + +ads.value - +discound.value;
        totle.innerHTML = result ;
        totle.style.background = "#4caf50";
    }
    else {
        result = 0;
        totle.innerHTML = result ;
        totle.style.background = "#5806f0";
    }
    
}

/*creat product*/ 
let dataproduct = [];
if(localStorage.product !=null){
    dataproduct = JSON.parse(localStorage.product);
}

supmit.onclick =  function(){
     let newproduct = {
         titl : title.value,
         pric : price.value,
         taxe : taxes.value,
         ad : ads.value,
         dis : discound.value,
         totl : totle.innerHTML ,
         count :count.value,
         categ : categary.value,
     }
     //count 
     if(title.value !='' && price.value !='' && categary.value !='' && +count.value > 0)
     {
        title.style.border = "none";
        price.style.border = "none";
        categary.style.border = "none";
        count.style.border = "none";

        if(mood == "create")
        {
            // for(let i=0 ; i< +count.value   ; i++)
            // {
            //     dataproduct.push(newproduct);
            // }
            dataproduct.push(newproduct);
            // put the data in localStorage
            localStorage.product = JSON.stringify(dataproduct);
        }
        else 
        {
            dataproduct[temp]= newproduct;
            mood="create";
            supmit.innerHTML = "Create";
        }
   
        clear_data();
     }
     else if(title.value =='') {
         title.style.border = "1px solid red";
         title.focus();
     }
     else if(price.value =='') {
        price.style.border = "1px solid red";
        title.style.border = "none";
        categary.style.border = "none";
        count.style.border = "none";
        price.focus();
     }
     else if(count.value =='' || +count.value <= 0) {
        count.style.border = "1px solid red";
        title.style.border = "none";
        price.style.border = "none";
        categary.style.border = "none";
        count.focus();
     }
     else if(categary.value =='') {
        categary.style.border = "1px solid red";
        title.style.border = "none";
        price.style.border = "none";
        count.style.border = "none";
        categary.focus();
     }
     
     
     //localStorage.clear();
     read_data();
     
 }

 //clear product

 function clear_data() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discound.value = '';
    totle.innerHTML = '';
    count.value = '';
    categary.value ='';
    totle.style.background = "#5806f0";
 }

 //Read table
 let deletall = document.createElement ("button");
 table.before (deletall);

 function read_data(){
     tbody.innerHTML=` `;
    for(let i=0 ;i <dataproduct.length ; i++){
        tbody.innerHTML += `
        <tr>
            <td>${i+1}</td>
            <td>${dataproduct[i].titl}</td>
            <td class="hiden">${dataproduct[i].pric}</td>
            <td class="hiden">${dataproduct[i].taxe}</td>
            <td class="hiden">${dataproduct[i].ad}</td>
            <td class="hiden">${dataproduct[i].dis}</td>
            <td>${dataproduct[i].totl}</td>
            <td class="hiden">${dataproduct[i].categ}</td>
            <td>${dataproduct[i].count}</td>
            <td><button onclick = "updatadata(${i})" class="update">update</button></td>
            <td><button onclick = "out_one(${i})" class="delete">Out_One</button></td>
        </tr>
    `;
    deletall.innerHTML = `Delete All ( ${dataproduct.length} )`;
    }

    
    if(dataproduct.length > 0 )
    {
        deletall.style.display = "block";
    }
    else 
    {
        deletall.style.display = "none";
    }
    
 }

 //out_one button 
function deletedata(x) {
    dataproduct.splice(x , 1);
    // put the data in localStorage
    localStorage.product = JSON.stringify(dataproduct);
    // read_data();  
}
function out_one(x) {
    if(+dataproduct[x].count == 1)
    {
        deletedata(x);
    }
    else {
        dataproduct[x].count--;
        localStorage.product = JSON.stringify(dataproduct);
    }
    read_data();
}

//delet all data
deletall.onclick = function (){
    let choose = prompt("are you want delet all data ? Y/N");
    if(choose =='Y' || choose== 'y')
    {
        localStorage.clear();
        dataproduct=[];
        read_data()
    }
}


//updata button
function updatadata(i) {
    
    title.value = dataproduct[i].titl;
    price.value = dataproduct[i].pric;
    taxes.value = dataproduct[i].taxe;
    ads.value = dataproduct[i].ad;
    discound.value = dataproduct[i].dis;
    totle.innerHTML = dataproduct[i].totl;
    count.value = dataproduct[i].count;
    categary.value =dataproduct[i].categ;
    totle.style.background = "#4caf50";
    //deletedata(i);
    mood = "updata";
    temp=i;
    supmit.innerHTML = "Updata";
    read_data();

    scroll({
        top:0,
        behavior : "smooth"
    });
}

//search function
let moodsearch = "title";
function searchitem (){
    if(search.value !=''){
        tbody.innerHTML=` `;
        for(let i=0 ;i <dataproduct.length ; i++){
            let str;
            if(moodsearch === "title"){
                //to search with lower or upper
                str = dataproduct[i].titl.toLowerCase() ;       
            }
            else
            {
                //to search with lower or upper
                str = dataproduct[i].categ.toLowerCase() ;
            }
            //to search with lower or upper
            if(str.includes(search.value.toLowerCase())){
                tbody.innerHTML += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataproduct[i].titl}</td>
                    <td class="hiden">${dataproduct[i].pric}</td>
                    <td class="hiden">${dataproduct[i].taxe}</td>
                    <td class="hiden">${dataproduct[i].ad}</td>
                    <td class="hiden">${dataproduct[i].dis}</td>
                    <td>${dataproduct[i].totl}</td>
                    <td class="hiden">${dataproduct[i].categ}</td>
                    <td>${dataproduct[i].count}</td>
                    <td><button onclick = "updatadata(${i})" class="update">update</button></td>
                    <td><button onclick = "out_one(${i})" class="delete">Out_One</button></td>
                </tr>
                `;
            }
        }
    }else
    {
        search.style.border = "1px solid red";
        setTimeout(() => {
            search.style.border = "none";
        }, 3000);
        read_data();
    }
}

function SearchByTitle() {
    moodsearch = "title";
    search.placeholder = "Search by Title";
    search.focus();
    searchitem ();
}

//search by categry
function SearchByCategray() {
    moodsearch = "categary";
    search.placeholder = "Search by Categary";
    search.focus();
    searchitem ();
}

read_data();