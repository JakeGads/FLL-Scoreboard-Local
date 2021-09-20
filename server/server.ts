// use request to avoid a ts-node-dev error
const express = require( "express" );
const fs = require('fs');
const app = express();

const teamFile = 'server/Teams.json'


app.use(
    (req: any, res: any, next: any) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');

        if('OPTIONS' === req.method){
            res.sendStatus(200);
        } else {
            console.log(`${req.ip} ${req.method} ${req.url}`);
            next();
        }
    }
)

app.use(express.json())

app.get('/getTeams', (req: any, res: any) => {
    fs.readFile(teamFile, 'utf8', (err:any, data:any) => {
        if (err) {
            console.error(err)
            res.send(err)
            return
          }
        res.send(data)
    })
})

app.put('/saveTeams', (req: any, res: any) => {
    fs.writeFile(teamFile, req.query['teams'], (err: any) => {
        if(err){
            console.log(err)
            res.sendStatus(400)
        }
        else{
            console.log(req.query['teams'])
            console.log('Write Successful')
        }
    })
    res.sendStatus(200)
})

app.listen(4201, '127.0.0.1', function() {
    console.log('API serving on 4201')
});