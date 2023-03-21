const { Pool } = require('pg');
const dotenv = require('dotenv')
const { isValidBody, isValidName, isValidEmail } = require('../utils/validation');
dotenv.config()


const pool = new Pool({
    user: process.env.USER,
    host: "dpg-cgcjghndvk4htno1jr80-a",
    database: "billeasy_4fut",
    password: process.env.PASSWORD,
    port: 5432
})


// The API should be able to create a new employee, a new department, return data of the
// employee querying joins from the two tables and show a result set to a specific employee
// ID


const createDepart = async (req, res) => {
    try {

        let { departmentName, employeeCount } = req.body

        //validation for emptyBody
        if (!isValidBody(req.body)) {
            return res.status(400).send({ status: false, message: "Please Enter Some Input" });
        }

        //validation for departmentName
        if (!departmentName) {
            return res.status(400).send({ status: false, message: "departmentName Is Mandatory " });
        }
        if (!isValidName(departmentName)) {
            return res.status(400).send({ status: false, message: "departmentName should be alphabatical Order And String only" });
        }

        if (!employeeCount) {
            employeeCount = 0;
        }

        //create rows for department
        const query = 'INSERT INTO DEPARTMENT(departmentName,employeeCount) VALUES($1,$2)';
        const values = [departmentName, employeeCount];
        let data = await pool.query(query, values)
        return res.status(201).json({ status: true, message: "Department created successfully", data: data.rows[0] });


    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}



const createEmployee = async (req, res) => {
    try {

        let { name, email, joindate, deptid } = req.body

        //validation for emptyBody
        if (!isValidBody(req.body)) {
            return res.status(400).send({ status: false, message: "Please Enter Some Input" });
        }

        //validation for employee name
        if (!name) {
            return res.status(400).send({ status: false, message: "name Is Mandatory " });
        }
        if (!isValidName(name)) {
            return res.status(400).send({ status: false, message: "name should be alphabatical Order And String only" });
        }

        //validation for email
        if (!email) {
            return res.status(400).send({ status: false, message: "email Is Mandatory " });
        }
        if (!isValidEmail(email)) {
            return res.status(400).send({ status: false, message: "Invalid Email" });
        }

        if (!deptid) {
            return res.status(400).send({ status: false, message: "deptid Is Mandatory " });
        }

        if (!joindate) {
            return res.status(400).send({ status: false, message: "joindate Is Mandatory " });
        }

        // create employees row
        const query = 'INSERT INTO EMPLOYEES(name, email,joindate,deptid) VALUES($1, $2, $3,$4)';
        const values = [name, email, joindate, deptid];
        let data = await pool.query(query, values)
        return res.status(201).json({ status: true, message: "Employee created successfully", data: data.rows });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}




const getEmployeeData = async (req, res) => {
    let employeeId = req.params.employeeId
    try {
        const queryString = `SELECT e.name, d.departmentName AS department
            FROM employees e
            JOIN department d
            ON e.id = d.id
            WHERE e.id = $1`;
        const values = [employeeId];
        let data = await pool.query(queryString, values)
        return res.status(200).json({ status: true, message: "successfully", data: data.rows });

    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};



// Create a function in DB to return JSON of all employee details in a department based on
// the time they joined the company (time range filter along with department filter).


const getEmployeesByDepartment = async (req, res) => {
    try {
        const { departmentId, startDate, endDate } = req.body
        let data = await pool.query(
            'SELECT id, name, joindate FROM employees WHERE deptid = $1 AND joindate BETWEEN $2 AND $3 ORDER BY joindate DESC',
            [departmentId, startDate, endDate])
        return res.status(200).json({ status: true, message: "successfully", data: data.rows });

    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

module.exports = {
    createEmployee,
    createDepart,
    getEmployeeData,
    getEmployeesByDepartment
}