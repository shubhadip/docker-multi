const keys = require('./keys');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
app.use(cors())
app.use(bodyParser.json())
// pg
const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});

pgClient.on('error',()=>{
    console.log('lost pg connection')
})

pgClient.on('connect', ()=>{
	pgClient
		.query('CREATE TABLE IF NOT EXISTS values (number INT)')
		.catch(error=>console.log(error))
})


// redis
const redis = require('redis');

const redisClient = redis.createClient({
	host: keys.redisHost,
	port: keys.redisPort,
	retry_strategy: () => 1000
})

const pub = redisClient.duplicate();



// express

app.get('/',( req, res )=>{
	res.send('Hi')
})

app.get('/values/all', async ( req, res )=>{
	const values = await pgClient.query('select * from values');
	res.send(values.rows)
});

app.get('/values/current', async ( req, res )=>{
	redisClient.hgetall('values',(err, values)=>{
		res.send(values)
	})
});


app.post('/values', (req,res) =>{
	const index  = req.body.index;
	if(parseInt(index) > 20){
		return res.status(422).send('Unprocessable Entity')
	}
	redisClient.hset('values', index, 'Nothing yet');
	pub.publish('insert', index)
	pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);
	res.send({working: true})
})

app.listen(5000, ()=>{
	console.log('listening')
})