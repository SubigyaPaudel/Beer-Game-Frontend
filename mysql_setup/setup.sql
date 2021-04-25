CREATE DATABASE beergame4;
CREATE DATABASE test_beergame4;

CREATE USER "username"@"localhost" IDENTIFIED BY "Pass@123456789";

USE beergame4;
GRANT ALL PRIVILEGES ON beergame4.* TO "username"@"localhost";

USE test_beergame4;
GRANT ALL PRIVILEGES ON test_beergame4.* TO "username"@"localhost";
