const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'bpim7s1cby7yb5qqdugc-mysql.services.clever-cloud.com',
    user: 'u59wfct15vivtlxr',
    password: 'hhnWnlgmUsH0D0EK9QGX',
    database: 'bpim7s1cby7yb5qqdugc'
})
//create table at initial stage
connection.query(
    `CREATE TABLE IF NOT EXISTS form1(
        id INTEGER PRIMARY KEY ,
        name VARCHAR(20),
         DOB VARCHAR(35) ,
        Nationality VARCHAR(10),
        Marital_st VARCHAR(20),
        Education VARCHAR(17)
    );`,
    function(err,results){
        if(err)
        console.log(new Error(err))
        else
        console.log("Table created successfully")
      //  connection.close()//But dont't close connection for deployment
    }
    
    )
    
function getAllPersons () {

    return new Promise (function(resolve, reject) {
        connection.query(
            `SELECT * FROM form1`,
            function(err, rows, cols) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)//every row conatin object haoving property ==name,age,city
                }
            }
        )
    })
}

function addNewPerson(id,name,DOB,Nationality,Marital_st,Education) {

    return new Promise (function(resolve, reject) {
        connection.query(
            `INSERT INTO form1 (id,name,DOB,Nationality,Marital_st,Education) VALUES (?, ?, ?,?,?,?)`,
            [id,name,DOB,Nationality,Marital_st,Education],
           function(err, results) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            }
        )
    })
}

exports = module.exports = {
    getAllPersons,
    addNewPerson,
    connection
}

