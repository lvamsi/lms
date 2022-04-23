-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: project library
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book_pub_mapping`
--

DROP TABLE IF EXISTS `book_pub_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_pub_mapping` (
  `BID` char(6) NOT NULL,
  `PID` varchar(10) NOT NULL,
  `ISBN` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`BID`,`PID`),
  KEY `ISBN` (`ISBN`,`PID`),
  CONSTRAINT `book_pub_mapping_ibfk_1` FOREIGN KEY (`ISBN`, `PID`) REFERENCES `books` (`ISBN`, `PID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_pub_mapping`
--

LOCK TABLES `book_pub_mapping` WRITE;
/*!40000 ALTER TABLE `book_pub_mapping` DISABLE KEYS */;
INSERT INTO `book_pub_mapping` VALUES ('01','1197','01'),('02','1197','02'),('03','1297','03'),('004','1297','04'),('005','1297','05'),('006','1197','06'),('007','1197','07'),('008','1297','08'),('009','1197','09'),('010','1197','10');
/*!40000 ALTER TABLE `book_pub_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `ISBN` varchar(10) NOT NULL,
  `PID` varchar(10) NOT NULL,
  `BOOKTITLE` varchar(100) NOT NULL,
  `BOOKDESC` varchar(12) NOT NULL,
  `CATEGORY` varchar(20) NOT NULL,
  `PUBLISHERID` varchar(6) NOT NULL,
  `PERDAYCHARGE` varchar(5) NOT NULL,
  `AUTHORNAME` char(100) DEFAULT NULL,
  PRIMARY KEY (`ISBN`,`PID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES ('01','1197','I am No Messiah','A101','Autobiography','3409','10','Meena Iyer'),('010','1197','Habba Khatoon','F311','Fiction','3409','10','Kajal Suri'),('02','1197','Elephant in the Womb','M090','Metaphorical Idiom','3409','15','Kalki Koechlin'),('03','1297','Life in the Clock Tower Valley','F311','Fiction','5412','10','Shakoor Rather'),('04','1297','The Braille edition of the book Exam Warriors','E678','Educational','5412','15','PM Narendra Modi'),('05','1297','Whereabouts','N400','Novel','5412','15','Jhumpa Lahiri'),('06','1197','The Christmas Pig','N400','Novel','3409','10','JK Rowling'),('07','1197','The Bench','L277','Literature','3409','15','Meghan Markle'),('08','1297','Sach Kahun Toh','A101','Autobiography','5412','10','Neena Gupta'),('09','1197','Home in the World','A101','Autobiography','3409','10','Amartya Sen');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card`
--

DROP TABLE IF EXISTS `card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card` (
  `CID` char(6) NOT NULL,
  `CARDSTATUS` varchar(12) NOT NULL,
  `CARDISSUEDATE` varchar(12) NOT NULL,
  `CARDEXPIRYDATE` varchar(12) NOT NULL,
  `ISBN` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`CID`),
  KEY `EMPNO` (`CID`,`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card`
--

LOCK TABLES `card` WRITE;
/*!40000 ALTER TABLE `card` DISABLE KEYS */;
INSERT INTO `card` VALUES ('201','ACTIVE','01/01/2021','01/01/2025','01'),('202','ACTIVE','01/01/2021','01/01/2025','02'),('203','ACTIVE','01/01/2021','01/01/2025','03'),('204','INACTIVE','01/01/2020','01/01/2022','04'),('205','ACTIVE','01/01/2021','01/01/2025','05'),('206','ACTIVE','01/01/2021','01/01/2025','06'),('207','INACTIVE','01/01/2019','01/01/2022','07'),('208','ACTIVE','01/01/2021','01/01/2025','08'),('209','ACTIVE','01/01/2021','01/01/2025','09'),('210','ACTIVE','01/01/2021','01/01/2025','010');
/*!40000 ALTER TABLE `card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emp_book_card_relation`
--

DROP TABLE IF EXISTS `emp_book_card_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emp_book_card_relation` (
  `EMPNO` char(6) NOT NULL,
  `CID` varchar(6) NOT NULL,
  `ISBN` varchar(10) NOT NULL,
  `ISSUEDATE` varchar(12) NOT NULL,
  `RETURNDATE` varchar(12) NOT NULL,
  `PID` varchar(10) NOT NULL,
  PRIMARY KEY (`EMPNO`,`CID`,`ISBN`),
  KEY `ISBN` (`ISBN`,`PID`),
  CONSTRAINT `emp_book_card_relation_ibfk_1` FOREIGN KEY (`EMPNO`) REFERENCES `employee` (`EMPNO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emp_book_card_relation`
--

LOCK TABLES `emp_book_card_relation` WRITE;
/*!40000 ALTER TABLE `emp_book_card_relation` DISABLE KEYS */;
INSERT INTO `emp_book_card_relation` VALUES ('1','201','01','02/04/2021','01/05/2021','1197'),('10','210','010','31/01/2022','09/02/2022','1197'),('2','202','02','17/10/2021','15/11/2021','1197'),('3','203','03','10/09/2021','30/10/2021','1297'),('4','204','04','05/05/2021','31/05/2021','1297'),('5','205','05','03/03/2021','04/04/2021','1297'),('6','206','06','25/02/2021','17/03/2021','1197'),('7','207','07','06/11/2021','26/11/2021','1197'),('8','208','08','01/02/2022','14/02/2022','1297'),('9','209','09','07/01/2022','08/02/2022','1197');
/*!40000 ALTER TABLE `emp_book_card_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emp_role_mapping`
--

DROP TABLE IF EXISTS `emp_role_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emp_role_mapping` (
  `EMPNO` char(6) NOT NULL,
  `ROLEID` char(6) NOT NULL,
  `ROLESTARTDATE` varchar(12) NOT NULL,
  `ROLEENDDATE` varchar(12) NOT NULL,
  PRIMARY KEY (`EMPNO`,`ROLEID`),
  KEY `ROLEID` (`ROLEID`),
  CONSTRAINT `emp_role_mapping_ibfk_2` FOREIGN KEY (`ROLEID`) REFERENCES `roles` (`ROLEID`),
  CONSTRAINT `emp_role_mapping_ibfk_3` FOREIGN KEY (`EMPNO`) REFERENCES `employee` (`EMPNO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emp_role_mapping`
--

LOCK TABLES `emp_role_mapping` WRITE;
/*!40000 ALTER TABLE `emp_role_mapping` DISABLE KEYS */;
INSERT INTO `emp_role_mapping` VALUES ('1','1','01/01/1970','01/01/2030'),('10','3','02/05/1971','02/05/2031'),('2','3','01/01/1970','01/01/2030'),('3','3','03/07/1970','03/07/2030'),('4','3','03/07/1970','03/07/2030'),('5','3','02/05/1971','02/05/2031'),('6','3','02/05/1971','02/05/2031'),('7','3','02/05/1971','02/05/2031'),('8','3','02/05/1971','02/05/2031'),('9','3','02/05/1971','02/05/2031');
/*!40000 ALTER TABLE `emp_role_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `EMPNO` char(6) NOT NULL,
  `FIRSTNAME` varchar(12) NOT NULL,
  `LASTNAME` varchar(15) NOT NULL,
  `PHNO` varchar(10) NOT NULL,
  `ADDID` varchar(100) NOT NULL,
  `MANAGERID` char(6) DEFAULT NULL,
  `ROLEID` char(6) DEFAULT NULL,
  `USERID` varchar(15) NOT NULL,
  `PASSWORD` varchar(15) NOT NULL,
  PRIMARY KEY (`EMPNO`),
  KEY `ROLEID` (`ROLEID`),
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`ROLEID`) REFERENCES `roles` (`ROLEID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('1','SHAWN','M','9010','CHENNAI,TAMILNADU','101','3','shawn1','shawn12'),('10','ASHLEY','H','3291','HYDERABAD,TELANGANA','102','3','ash34','ash34'),('2','DAVID','C','3436','HYDERABAD,TELANGANA','102','3','david@1','David@1'),('3','ASHWIN','B','7896','KOLKATA,WEST BENGAL','101','3','Ab7','AB@7'),('4','LEO','R','2568','GUWAHATI,ASSAM','101','3','leo99','leo99'),('5','RICHARD','A','4590','AMRITSAR,PUNJAB','102','3','RA77','RA37'),('6','AGNES','G','3786','BANGALORE,KARNATAKA','102','3','agnes09','agnes09'),('7','REENA','L','6782','MYSORE,KARNATAKA','101','3','Ree67','Ree67'),('8','RAHEEM','M','7865','SURAT,GUJARAT','101','3','Rmd8','Rmd8'),('9','SUNDER','P','9002','BANDRA,MUMBAI','102','3','SP5','SP5');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `MID` char(6) NOT NULL,
  `CID` varchar(10) NOT NULL,
  `ADDID` varchar(100) NOT NULL,
  `FIRSTNAME` varchar(10) DEFAULT NULL,
  `LASTNAME` varchar(10) DEFAULT NULL,
  `PHNO` varchar(10) DEFAULT NULL,
  `USERID` varchar(15) NOT NULL,
  `PASSWORD` varchar(15) NOT NULL,
  PRIMARY KEY (`MID`,`ADDID`,`CID`),
  KEY `CID` (`CID`),
  CONSTRAINT `members_ibfk_1` FOREIGN KEY (`CID`) REFERENCES `card` (`CID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES ('1011','201','HYDERABAD,TELANGANA','PETER','P','3440','peterp','peter@12'),('1012','202','NOIDA,DELHI','TANMAY','B','7822','TanmayB','TanB27'),('1013','203','BANGALORE,KARNATAKA','TARA','E','2340','TARA3','TARA3'),('1014','204','MYSORE,KARNATAKA','EDEN','G','7865','Eden09','Eden09'),('1015','205','KOLKATA,WEST BENGAL','STEVE','B','8965','SteveB5','SteveB5'),('1016','206','SURAT,GUJRAT','BOB','K','2341','bob65','bob65'),('1017','207','HYDERABAD,TELANGANA','ROBERT','E','8972','robert43','robert43'),('1018','208','NOIDA,DELHI','TERRANCE','C','7653','tc78','tc78'),('1019','209','AMRITSAR,PUNJAB','AUSTIN','M','0981','aus45','aus45'),('1020','210','KOLKATA,WEST BENGAL','ROCK','S','2678','rocks77','rock77');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publishers`
--

DROP TABLE IF EXISTS `publishers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publishers` (
  `PID` varchar(10) NOT NULL,
  `PNAME` varchar(100) DEFAULT NULL,
  `PLACE` varchar(100) DEFAULT NULL,
  `BID` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`PID`),
  KEY `BID` (`BID`,`PID`),
  CONSTRAINT `publishers_ibfk_1` FOREIGN KEY (`BID`, `PID`) REFERENCES `book_pub_mapping` (`BID`, `PID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publishers`
--

LOCK TABLES `publishers` WRITE;
/*!40000 ALTER TABLE `publishers` DISABLE KEYS */;
INSERT INTO `publishers` VALUES ('1197','SSR ENTERPRISES','NOIDA','01'),('1297','ARNOLD GROUP','BANGALORE','010');
/*!40000 ALTER TABLE `publishers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `ROLEID` char(6) NOT NULL,
  `ROLENAME` varchar(12) NOT NULL,
  `ROLEREGISTERDATE` varchar(12) NOT NULL,
  PRIMARY KEY (`ROLEID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('1','ADMIN','01/01/1970'),('2','MEMBER','03/07/1970'),('3','EMPLOYEE','02/05/1971');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-03 22:01:04
