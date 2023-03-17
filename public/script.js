var ip = document.getElementById("ip");
var btnAdd = document.getElementById("btn");
var editedSaveBtn = document.getElementById("btn2");
var ul = document.getElementById("parent");
let uniqId=0;
var idofeditElenment;
editedSaveBtn.style.display = "none";

/* Adding To do*/
btnAdd.addEventListener("click", () => {
    let value = ip.value;
    if(value!=="")
    {
    savetodo(value,function(){
        var li = document.createElement("li");
        let deletetodo = document.createElement("p");
        let tododata = document.createElement("p");
        let Edittodo = document.createElement("p");
       
        tododata.innerText = uniqId+" "+value;
        deletetodo.innerText ="X";
        li.setAttribute("id", `${uniqId}`);
        
        tododata.setAttribute("id", `tododata${uniqId}`);
        Edittodo.setAttribute("id",`Edit_${uniqId}`);  //getEle
        var img = document.createElement("img");
        img.setAttribute("id",`img_${uniqId}`);

        img.src = "https://cdn-icons-png.flaticon.com/512/12/12912.png?w=740&t=st=1679031984~exp=1679032584~hmac=8a6154325fe421cbb4093dcdecaf684942af407b264cffac55779b84f183c9a1";
        Edittodo.appendChild(img);
         li.appendChild(tododata);
        li.appendChild(Edittodo);
         li.appendChild(deletetodo);
         ul.appendChild(li);
         
        deletetodo.addEventListener("click",function(){
            let text = "Are you sure you want to delete this?";
        if (confirm(text) == true) {
            deletetodofun(this.parentNode.id)
        }
        });
        EditEventHandler(Edittodo);

       });
}
    ip.value = "";
    ip.focus();
});

function EditEventHandler(Edittodo) {
    Edittodo.addEventListener("click", () => {
        idofeditElenment = event.target.id.split('_')[1];
        btnAdd.style.display = "none";
        ip.value = document.getElementById("tododata" + idofeditElenment).innerText;
        editedSaveBtn.style.display = "block";
    });
}

 function savetodo(value,callback ){
    var request=new XMLHttpRequest();
    request.open("POST","/savetodo");
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({
        id:uniqId+=1,
        task:value,
        isread:false
    }));
    request.addEventListener("load",function(){
        if(request.status===200){
        callback();
        }
    });
 }
    // get to do on load
    gettodo(function(todos){
        todos.forEach(function(todos) {
            let value=todos.task;
            uniqId=todos.id;
        var li = document.createElement("li");
        let deletetodo = document.createElement("p");
        let tododata = document.createElement("p");
        let Edittodo = document.createElement("p");
        var img = document.createElement("img");
        img.src = "https://cdn-icons-png.flaticon.com/512/12/12912.png?w=740&t=st=1679031984~exp=1679032584~hmac=8a6154325fe421cbb4093dcdecaf684942af407b264cffac55779b84f183c9a1";
        img.setAttribute("id", `img_${uniqId}`)
        Edittodo.appendChild(img);
        tododata.innerText =value;
        deletetodo.innerText ="X";
        li.setAttribute("id", `${uniqId}`);
        tododata.setAttribute("id", `tododata${uniqId}`);

         li.appendChild(tododata);
         li.appendChild(Edittodo);
         li.appendChild(deletetodo);
         ul.appendChild(li);

         deletetodo.addEventListener("click",()=>{
            let text = "Are you sure you want to delete this?";
            if (confirm(text) == true) {
            deletetodofun(todos.id);
            }
         });
         EditEventHandler(Edittodo);
        //   Edittodo.addEventListener("click",()=>{
        //     btnAdd.style.display = "none"; //block style.visibility='hidden','visible';
        //     editedSaveBtn.style.display = "block";
        //     ip.value = document.getElementById("tododata"+todos.id).innerText;
        //     idofeditElenment= parseInt(todos.id)
        //  });     
        }); 
    });
    function gettodo(callback){
        var request=new XMLHttpRequest();
        request.open("get","/gettodo");
        request.send();
         request.addEventListener("load",function(){
              callback(JSON.parse(request.responseText));    
        });
     }
                    //   function for Delete Todo
        function deletetodofun(id){
            let getelementid = document.getElementById(`${id}`);
           // console.log(getelementid+"id is ",id);
            let req=new XMLHttpRequest();
               req.open("post","/deletetodo");
               req.setRequestHeader('Content-Type', 'application/json');
               req.send(JSON.stringify({id:id}));
               req.addEventListener("load",function(){
                if(req.status===200){
                    getelementid.remove();
                    }
               })
           }

        //   function for edit Todo



        editedSaveBtn.addEventListener("click",()=>{
            
            edittodofun(idofeditElenment,ip.value);
            editedSaveBtn.style.display = "none";
            btnAdd.style.display = "block";
        })

      function edittodofun(id,data){
      //  let id = document.getElementById(`${id}`);
        
        let req=new XMLHttpRequest();
           req.open("post","/edittodo");
           req.setRequestHeader('Content-Type', 'application/json');
           req.send(JSON.stringify({id:id,value:data}));
           
           req.addEventListener("load",function(){
            if(req.status===200){
                // ip.value = document.getElementById("tododata"+id)
              //  console.log(id+"<    id in edit Function  .",id, "-" +document.getElementById("tododata"+id).innerText);
                document.getElementById("tododata"+id).innerText=ip.value;
                //ip.value = "";
                }
           })
        }

