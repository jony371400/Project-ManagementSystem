# Test IP
> http://localhost:5000/getAll

# Build
```
show databases;
use ylm;
CREATE TABLE Users (userName varchar(255),userNum int);
```

# CRUD
> INSERT
```
INSERT INTO Users (userName , userNum) VALUES ('Amy', 20);
NSERT INTO Names (id , name ) VALUES (2 , 'b' );
```

> Update
```
SET SQL_SAFE_UPDATES = 0;
UPDATE Users SET userName = 'Amy', userNum = 20 WHERE userName = 'Johnny';
```

> Delete
```
SET SQL_SAFE_UPDATES = 0;names
DELETE FROM Users WHERE userName='Amy';
DELETE FROM Names WHERE name='d';
```

> Read
SELECT * FROM Names; 
-- SELECT * FROM Users; 

# Change Password
```
SET SQL_SAFE_UPDATES = 0;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'asd0986458212';
```

# Reset Auto Num
```
ALTER TABLE Names AUTO_INCREMENT = 1;
```
