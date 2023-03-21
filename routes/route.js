const express = require('express');
const { createEmployee, createDepart,  getEmployeeData, getEmployeesByDepartment } = require('../controllers/employee.js');

const router = express.Router();



router.post("/createDepa",createDepart)
router.post("/createEmp", createEmployee)
router.get("/getbyId/:employeeId",getEmployeeData)
router.get("/getEmployeesByDepartment",getEmployeesByDepartment)

module.exports=router