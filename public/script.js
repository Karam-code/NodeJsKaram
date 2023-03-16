var ip = document.getElementById("ip");
var btn = document.getElementById("btn");
var parent = document.getElementById("parent");
let uniqId=0;

btn.addEventListener("click", () => {
    let value = ip.value;
    if(value!==""){
    savetodo(value,function(){
        CreateNewTask(value);
    });
}
    ip.value = "";
    ip.focus();
});

function CreateNewTask(value) {
    var li = document.createElement("li");
    let deletetodo = document.createElement("p");
    let tododata = document.createElement("p");
    tododata.innerText = uniqId + " " + value;
    deletetodo.innerText = "X";
    li.setAttribute("id", `${uniqId}`);
    li.appendChild(tododata);
    li.appendChild(deletetodo);
    parent.appendChild(li);
    deletetodo.addEventListener("click", function () {
        let text = "Are you sure you want to delete this?";
        if (confirm(text) == true) {
            deletetodofun(this.parentNode.id);
        } 
        
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
        tododata.innerText = uniqId+" "+value;
        deletetodo.innerText ="X";
        deletetodo.setAttribute("data-id",`${uniqId}`);
        li.setAttribute("id", `${uniqId}`);
         li.appendChild(tododata);
         li.appendChild(deletetodo);
         parent.appendChild(li);
         deletetodo.addEventListener("click",()=>{
            deletetodofun(todos.id);

         });
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

        function deletetodofun(id){
            let getelementid = document.getElementById(`${id}`);
            console.log(getelementid);
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

