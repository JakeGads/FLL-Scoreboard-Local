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
    fs.writeFile(teamFile, req.query['teams'], (err: any) => {
        if(err){
            console.log(err);
            res.sendStatus(400);
            return;
        }
    })
    res.sendStatus(200)
});

const upload = multer({ dest: 'tmp/csv/' });
app.use('/add-teams', upload.single('file'), function (req:any, res:any) {
    const fileRows: string[] = [];
    // open uploaded file
    csv.fromPath(req.file.path)
      .on("data", function (data: any) {
        fileRows.push(data); 
      })
      .on("end", function () {
        console.log(fileRows)
        fs.unlinkSync(req.file.path);   
        //process "fileRows" and respond
      })
});

app.get('/add-team'), (req: any, res: any) => {
    fs.readFile(teamFile, 'utf8', (err:any, data:any) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
          }
        else{
            fs.appendFile(teamFile, data.replace('}]', `}${req.query['team']}`, (err: any) => {
                if (err) {
                  console.log(err);
                }
            }));
            res.send(data);
            return;
        }
    })
};


app.listen(4201, '127.0.0.1', function() {
    console.log('API serving on 4201')
});