const configDB = require('../config/database');
const { port } = require('../config/express');
const { MongoClient } = require('mongodb');
const Express = require('express');
const route = require('../routes/index');
const cors = require('cors');

process.app = app = {};
app.configDB = configDB;


module.exports.startApp = async function (callback) {
    try {
        initComponent();
        await startDB();
        await startWeb();
        callback();
    } catch (e) {
        console.error(e);
    }
}

function initComponent() {
    app.BaseModel = require('../BmApp/baseModel');
}

async function startDB() {
    return new Promise((resolve, reject) => {
        // tao 1 bien chua dia chi uri cua mongoserver
        const uri = configDB.uri;
        // tao 1 mongoclient voi uri de ket noi toi mongoserver
        const client = new MongoClient(uri);

        // thuc hien ket noi toi database bang phuong thuc connect cua mongoclient
        client.connect().then(() => {
            console.log('connect database success!!');
            const db = client.db(configDB.database);
            app.db = db;
            resolve()
        })
            .catch((err) => {
                reject(err);
            })
    })
}

async function startWeb() {
    return new Promise((resolve, reject) => {
        // tao 1 doi tuong expree
        const express = Express();
        // gan doi tuong vao bien toan cuc
        app.express = express;

        // Áp dụng Cors cho tất cả các routes
        express.use(cors());

        // set dung view engine
        express.set('view engine', 'ejs');
        express.set('views', './views');

        // router static
        express.use(Express.static('./static'));
        express.use(Express.urlencoded({ extended: true }));
        express.use(Express.json());

        route(express);

        const server = express.listen(port, () => { console.log(`App Express listening on port ${port}`) });
        resolve(server);
    })
}