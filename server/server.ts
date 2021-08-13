const express = require( "express" );
const app = express();

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

const routes = express.Router();

routes.get('/', (req: any, res: any) => res.send({hello: 'world'}));
routes.get('/apitest', (req: any, res: any) => res.send([]));

app.use(express.json())

app.listen(4201, '127.0.0.1', function() {
    console.log('API serving on 4201')
});