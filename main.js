const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000;

app.use(express.json());
app.use(express.static("public"))
app.get('/', (req, res) => {
    res.send("Hello Moto");
})
app.post("/savetodo", function (req, res) {
    fs.readFile("./data.txt", "utf-8", function (err, data) {
        let todos;
        if (data.length === 0) {
            todos = [];
        } else {
            todos = JSON.parse(data);
        }
        todos.push(req.body);
        fs.writeFile("./data.txt", JSON.stringify(todos), function (err, data) {

            res.end();
        });
    });
    // res.send();
})
//gettodo
app.get("/gettodo", function (req, res) {
    fs.readFile("./data.txt", "utf-8", function (err, data) {
        let todos;
        if (data.length === 0) {
            todos = [];
        } else {
            todos = JSON.parse(data);
        }
        res.json(todos);
    });
})
app.post("/deletetodo", function (req, res) {
    let index = req.body.id;
        console.log(index);
    fs.readFile("./data.txt", "utf-8", function (err, data) {

        let todos = JSON.parse(data);
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === index) {
                todos.splice(i, 1);
            }
        }
        fs.writeFile("./data.txt", JSON.stringify(todos), function (err, data) {
            res.end();
        });
    });
})


app.listen(port, () => {
    console.log("Server is running at 3000");
})
