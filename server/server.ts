// use request to avoid a ts-node-dev error
const express = require( "express" );
const fs = require('fs');

const multer = require('multer');
const csv = require('fast-csv');

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

app.use(express.json());

app.get('/getTeams', (req: any, res: any) => {
    // EXPECTED INPUT: NONE
    fs.readFile(teamFile, 'utf8', (err:any, data:any) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
          }
        else{
            res.send(data);
            return;
        }
    })
});

app.put('/saveTeams', (req: any, res: any) => {
    let write = req.body['body'].replaceAll("\"", '').replaceAll("\'", "\"").replaceAll("},", "},\n\t").replaceAll("}]", "}\n]").replaceAll("[{", "[\n\t{");
    fs.writeFile(teamFile, write, (err: any) => {
        if(err){
            console.log(err);
            res.sendStatus(400);
            return;
        }
    });
    console.log('success')
    res.sendStatus(200);
});

const upload = multer({ dest: 'tmp/csv/' });
app.use('/addTeams', upload.single('file'), (req:any, res:any) => {
    
    let json_read = fs.readFile(req.file.path, 'utf8', (err:any, data:any) => {
        let json_read = '['
        let rows = data.replaceAll('\r', '').split('\n') 
        rows.forEach((row: string) => {
            let team = row.split(',')
            if(isNaN(Number(team[0]))){
                json_read += `{"name":"${team[1]}","num":${team[0]}}`
            } else {
                json_read += `{"name":"${team[1]}","num":${team[0]}}`
            }
       });
       json_read += ']';
       return json_read;
    });

    let all: any;

    fs.readFile(teamFile, 'utf8', (err: any, data: any) => {
        all = JSON.parse(data);
    });
    
    console.log(`json ${json_read}`);
    console.log(`all ${all}`);

    // fs.writeFile(teamFile, JSON.stringify(all), (err: any) => {
    //     if(err){
    //         console.error(err);
    //     }
    // });

});

app.get('/addTeam', (req: any, res: any) => {
    console.log('adding a team')
    fs.readFile(teamFile, 'utf8', (err:any, data:any) => {
        if (err) {
            console.error(`ERROR: ${err}`);
            res.send(err);
            return;
          }
        else{
            let temp = JSON.parse(data);
            temp.push(JSON.parse(req.query['team']))
            fs.writeFile(teamFile, JSON.stringify(temp), (err: any) => {
                if (err) {
                  console.log(err);
                }
            });
            res.send(temp);
            return;
        }
    }); 
});

app.get('/clearTeams', (req: any, res: any) => {
    fs.writeFile(teamFile, '', (err: any) => {
        if(err){
            console.log(err);
            res.sendStatus(400);
            return;
        }
    });
})

app.listen(4201, '127.0.0.1', function() {
    console.log('API serving on 4201')
});