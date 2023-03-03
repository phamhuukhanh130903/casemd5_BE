import express from "express";
// import {router} from "./src/router/router"
import bodyParser from "body-parser";
import { AppDataSource } from "./src/data-soure";
import cors from "cors";

const app = express();

AppDataSource.initialize().then(() => {console.log('database connected');
});
app.use(cors());
app.use(express.static('./public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('', router);

app.listen(3000, () => {
    console.log('Server is running on port 8000');
})