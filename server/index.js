const express = require('express');
const app= express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    database : "tulpbookingrooms"
})

app.get('/rooms' , (req, res) =>{
    db.query("SELECT * FROM rooms", (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.post('/creat', (req, res) =>{
    console.log("Request body:", req.body);
    
    const room_number = req.body.room_number;
    const capacity = req.body.capacity;
    const building = req.body.building;
    const floors = req.body.floors;
    const projector =req.body.projector;
    const visualizer = req.body.visualizer;
    const micophone = req.body.micophone;
    const computer =req.body.computer;

    db.query("INSERT INTO rooms (room_number, capacity, building, floors, projector,visualizer, micophone, computer) VALUES(?,?,?,?,?,?,?,?)",[room_number,capacity,building,floors,projector,visualizer,micophone,computer],
    (err,result) =>{
        if(err){
            console.log(err);
        } else{
            res.send("Valuse inserted");
        }
    }
    )
})
app.put('/update', (req,res) => {
    const room_number = req.body.room_number;
    const capacity = req.body.capacity;
    const projector =req.body.projector;
    const visualizer = req.body.visualizer;
    const micophone = req.body.micophone;
    const computer =req.body.computer;
    db.query("UPDATE rooms SET capacity=?, projector=?, visualizer=?, micophone=?, computer=? WHERE room_number=?",[capacity, projector, visualizer, micophone, computer, room_number], (err, result) =>{
        if (err) {
            console.error(err);       
        } else {
            res.send(result);
        } 
    });
})

app.delete('/delete/:room_number', (req, res) => {
    const room_number = req.params.room_number;
    db.query("DELETE FROM rooms WHERE room_number = ?", [room_number], (err, result) => {
        if (err) {
            console.error(err);
        } else {
            res.send(result);
        }
    });
});


app.listen('3001', () =>{
    console.log('server is running on port 3001');
})