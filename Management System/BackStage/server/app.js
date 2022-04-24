const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CRUD //
// #region INSERT
app.post('/insert', (request, response) => {
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.insertNewName(name);


    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
        
    console.log('result => ' + JSON.stringify(result))
});
// #endregion

// #region SELECT
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
})

app.get('/search/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.searchByName(name);

    //console.log('name => ' + name)

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
})
// #endregion

// #region UPDATE
app.patch('/update', (request, response) => {
    const { id, name } = request.body;

    console.log('id => ' + id)
    console.log('name => ' + name)

    const db = dbService.getDbServiceInstance();
    const result = db.updateNameById(id, name);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});
// #endregion

// #region DELETE
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.deleteRowById(id);
    console.log(db)

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});
// #endregion

app.listen(process.env.PORT, () => console.log('Server Running ~'));