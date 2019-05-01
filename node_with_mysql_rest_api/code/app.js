const express = require('express');
var bodyParser = require("body-parser");
var mysql = require('mysql');
var stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const webSocketServer = require('ws').Server
const wss = new webSocketServer({ port: 9090 })

const app = express();


/* body parser for post */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('Welcome Test NODE APP');
});

/* mySql connection */
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_with_mysql_rest_api'
})

/* get hotels list */

app.get('/hotels', async (req, res) => {
    let queryResult = 'SELECT * FROM `hotels`';

    connection.query(queryResult, function (err, rows, fields) {
        if (err) {
            res.status(400).send({ "success": false, body: { "err": "err while fetching data" } });
            return;
        }
        res.status(200).send({ "success": true, body: { "data": rows } });
    })
});

/* get hotel by id */

app.get('/hotels/:id', (req, res) => {
    let queryResult = 'SELECT * FROM `hotels` WHERE id=' + req.params.id;
    connection.query(queryResult, function (err, rows, fields) {
        if (err) {
            res.status(400).send({ "success": false, body: { "err": "err while fetching data" } });
            return;
        }
        res.status(200).send({ "success": true, body: { "data": rows } });
    })
});

/* create new hotel  */

app.post('/hotels', async (req, res) => {

    let queryResult = "INSERT INTO `hotels`(`name`, `phone`, `place`) VALUES ('" + req.body.name + "','" + req.body.phone + "','" + req.body.place + "')";

    connection.query(queryResult, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.status(400).send({ "success": false, body: { "err": "err while fetching data" } });
            return;
        }
        res.status(201).send({ "success": true, body: { "data": "new record inserted successfully" } });
    })
});


/* Stripe payment payment method by Using CARD */
app.post('/stripe/newPayment/:paymentMethod', async (req, res) => {

    stripe.paymentMethods.create({
        type: req.params.paymentMethod,
        card: {
            number: req.body.cardNo,
            exp_month: req.body.expMnth,
            exp_year: req.body.expYr,
            cvc: req.body.cardCvc
        }
    }, function (err, token) {
        if (err) {
            console.log(err);
            res.status(400).send({ "success": false, body: { "err": "err while paying . please try again after some time" } });
            return;
        }
        res.status(201).json({ "success": true, body: { "data": `payment successfull. refrence Id : ${JSON.stringify(token)}` } });
    });
});


/* Web Socket Connection get the Chatroom */

let clients = []

wss.on('connection', (connection) => {
    clients.push(connection)
    broadcast({ username: 'admin', message: "A User Enter into ChatRoom" })
    connection.on('message', (message) => {
        console.log(message)
        const data = JSON.parse(message)
        broadcast(data)
    })
})
setInterval(cleanUp, 100)

// Broad cast from every one 
function broadcast(message) {
    const data = JSON.stringify(message)
    clients.forEach(client => client.send(data))
}

// Any User Left The Room Get the Message
function cleanUp() {
    const clientsLeaving = clients.filter(client => client.readyState === client.CLOSED)
    clients = clients.filter(client => client.readyState !== client.CLOSED)
    clientsLeaving.forEach(client => broadcast({ username: "admin", message: "A USERS HAS LEFT THE ROOM" }))
}

const port = 3035;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))