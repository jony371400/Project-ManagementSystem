const mysql = require('mysql');
const dotenv = require('dotenv');
const { response, json } = require('express');
let instance = null;
dotenv.config();

// #region Config
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DATABASE
});
// #endregion

// #region Connect
connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('MySQL Status : ' + connection.state);
});
// #endregion

class DbService {
    static getDbServiceInstance() {
        // console.log('instance => ' + JSON.stringify(instance))
        return instance ? instance : new DbService();
    }

    // CRUD //
    // #region INSERT
    async insertNewName(name) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO names (name, date) VALUES (?,?);";

                connection.query(query, [name, dateAdded], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });

            // console.log('id :: ' + insertId)
            // console.log('name :: ' + name)
            // console.log('date :: ' + dateAdded)

            return {
                id: insertId,
                name: name,
                dateAdded: dateAdded
            };
        } catch (error) {
            console.log(error);
        }
    }
    // #endregion

    // #region SELECT
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names;";

                connection.query(query, (err, results) => {
                    if (err) {
                        //console.log('err => ' + err.message)    
                        reject(new Error(err.message));
                    } else {
                        //console.log('results => ' + JSON.stringify(results))    
                        resolve(results);
                    }
                })
            });
            //console.log('response => ' + JSON.stringify(response))
            return response;
        } catch (error) {
            console.log('Error : ' + error);
        }
    }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names WHERE name = ? ;";

                connection.query(query, [name], (err, results) => {
                    if (err) {
                        //console.log('err => ' + err.message)
                        reject(new Error(err.message));
                    } else {
                        //console.log('results => ' + JSON.stringify(results))
                        resolve(results);
                    }
                })
            });
            //console.log('response => ' + JSON.stringify(response))
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    // #endregion

    // #region UPDATE
    async updateNameById(id, name) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE names SET name = ? WHERE id = ?";

                connection.query(query, [name, id], (err, result) => {
                    if (err) {
                        reject(new Error(err.message));
                    } else {
                        resolve(result.affectedRows);
                    }
                })
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    // #endregion

    // #region DELETE
    async deleteRowById(id) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM names WHERE id = ?";

                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    // #endregion
}

module.exports = DbService;