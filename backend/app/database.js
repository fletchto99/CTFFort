const postgres = require('pg');
const Promise = require('promise');

let state = {
    connection: null
};

module.exports = {
    connect(connection, schema) {
        return new Promise((resolve, reject) => {
            state.connection = new postgres.Client(connection);
            state.connection.connect((error) => {
                if (error) {
                    console.log(`Error connecting to database: ${error}`);
                    reject(error)
                } else {
                    if (schema) {
                        state.connection.query(`set search_path=${schema}`);
                    }
                    console.log("Connection to database successful!");
                    resolve();
                }
            });
        });
    },

    query(params) {
        return new Promise((resolve, reject) => {
            state.connection.query({
                text: params.text,
                values: params.values
            }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows);
                }
            })
        });
    }
};