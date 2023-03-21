
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