# commands for table Creation
postgres=# \c BillEasy
You are now connected to database "BillEasy" as user "postgres".
BillEasy=# CREATE TABLE DEPARTMENT(
BillEasy(# ID SERIAL PRIMARY KEY,
BillEasy(# departmentName VARCHAR(20),
BillEasy(# employeeCount INTEGER
BillEasy(# );
CREATE TABLE
BillEasy=# CREATE TABLE EMPLOYEES(
BillEasy(# ID SERIAL PRIMARY KEY,
BillEasy(# name VARCHAR(20),
BillEasy(# email VARCHAR(20),
BillEasy(# joinDate DATE,
BillEasy(# deptId INTEGER,
BillEasy(# CONSTRAINT fk_deptId FOREIGN KEY (deptId) REFERENCES DEPARTMENT (ID)
BillEasy(# );
CREATE TABLE



# trigger Function

CREATE OR REPLACE FUNCTION update_department_count()
RETURNS TRIGGER
AS $$
BEGIN 
  UPDATE department
  SET employeecount = employeecount + 1
  WHERE department.id = NEW.deptid;
  RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER increment_department_count
  AFTER INSERT
  ON employees
  FOR EACH ROW
  EXECUTE PROCEDURE update_department_count();
