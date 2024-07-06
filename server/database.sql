-- MySQL dump 10.13  Distrib 5.7.44, for Linux (x86_64)
--
-- Host: localhost    Database: taskmanagement
-- ------------------------------------------------------
-- Server version	5.7.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accessToken`
--

DROP TABLE IF EXISTS `accessToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accessToken` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `loggedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `accessToken_pk2` (`token`),
  KEY `accessToken_user_id_fk` (`userId`),
  CONSTRAINT `accessToken_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accessToken`
--

LOCK TABLES `accessToken` WRITE;
/*!40000 ALTER TABLE `accessToken` DISABLE KEYS */;
/*!40000 ALTER TABLE `accessToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `userId` int(11) NOT NULL,
  `taskId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comment_task_id_fk` (`taskId`),
  KEY `comment_user_id_fk` (`userId`),
  CONSTRAINT `comment_task_id_fk` FOREIGN KEY (`taskId`) REFERENCES `task` (`id`),
  CONSTRAINT `comment_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `taskId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `file_task_id_fk` (`taskId`),
  CONSTRAINT `file_task_id_fk` FOREIGN KEY (`taskId`) REFERENCES `task` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pendingEmail`
--

DROP TABLE IF EXISTS `pendingEmail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pendingEmail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `expiresAt` datetime DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pendingEmail_pk2` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pendingEmail`
--

LOCK TABLES `pendingEmail` WRITE;
/*!40000 ALTER TABLE `pendingEmail` DISABLE KEYS */;
/*!40000 ALTER TABLE `pendingEmail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `selectedTask`
--

DROP TABLE IF EXISTS `selectedTask`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `selectedTask` (
  `taskId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  KEY `selectedTask_task_id_fk` (`taskId`),
  KEY `selectedTask_user_id_fk` (`userId`),
  CONSTRAINT `selectedTask_task_id_fk` FOREIGN KEY (`taskId`) REFERENCES `task` (`id`),
  CONSTRAINT `selectedTask_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `selectedTask`
--

LOCK TABLES `selectedTask` WRITE;
/*!40000 ALTER TABLE `selectedTask` DISABLE KEYS */;
INSERT INTO `selectedTask` VALUES (2,22);
/*!40000 ALTER TABLE `selectedTask` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `dueDate` datetime NOT NULL,
  `priority` int(11) NOT NULL DEFAULT '1',
  `status` varchar(255) DEFAULT NULL,
  `taskGroupId` int(11) NOT NULL,
  `managerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `task_taskGroup_id_fk` (`taskGroupId`),
  KEY `task_user_id_fk` (`managerId`),
  CONSTRAINT `task_taskGroup_id_fk` FOREIGN KEY (`taskGroupId`) REFERENCES `taskGroup` (`id`),
  CONSTRAINT `task_user_id_fk` FOREIGN KEY (`managerId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (2,'Bash script','Develop bash script for project deploying','2024-07-22 00:00:00',7,'In Progress',4,17);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taskGroup`
--

DROP TABLE IF EXISTS `taskGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taskGroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taskGroup`
--

LOCK TABLES `taskGroup` WRITE;
/*!40000 ALTER TABLE `taskGroup` DISABLE KEYS */;
INSERT INTO `taskGroup` VALUES (1,'Grupa zadataka 1'),(2,'Grupa zadataka 2'),(3,'Grupa zadataka 3'),(4,'Scripts');
/*!40000 ALTER TABLE `taskGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `birthday` date DEFAULT NULL,
  `userRoleId` int(11) NOT NULL,
  `verifiedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_pk2` (`username`),
  UNIQUE KEY `user_pk3` (`email`),
  KEY `user_userRole_id_fk` (`userRoleId`),
  CONSTRAINT `user_userRole_id_fk` FOREIGN KEY (`userRoleId`) REFERENCES `userRole` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (16,'test','21232f297a57a5a743894a0e4a801fc3','Test','Testovic','06012345','d.neca99@gmail.com','1999-07-18',2,'2023-05-15 18:51:06'),(17,'test2','21232f297a57a5a743894a0e4a801fc3','John','Doe','06012346','e.johnson98@gmail.com','1998-11-22',1,'2023-05-15 18:52:06'),(18,'test3','21232f297a57a5a743894a0e4a801fc3','Smit','Smith','06012347','s.smith77@yahoo.com','1997-02-13',1,'2023-05-15 18:53:06'),(19,'test4','21232f297a57a5a743894a0e4a801fc3','Alice','Brown','06012348','a.brown65@hotmail.com','1996-08-30',1,'2023-05-15 18:54:06'),(20,'test5','21232f297a57a5a743894a0e4a801fc3','Bro','Jones','06012349','b.jones88@gmail.com','1995-05-25',1,'2023-05-15 18:55:06'),(21,'test6','21232f297a57a5a743894a0e4a801fc3','Carl','Davis','06012350','c.davis99@outlook.com','1994-12-10',14,'2023-05-15 18:56:06'),(22,'test7','21232f297a57a5a743894a0e4a801fc3','David','Miller','06012351','d.miller22@gmail.com','1993-03-15',14,'2023-05-15 18:57:06'),(23,'test8','21232f297a57a5a743894a0e4a801fc3','Emilly','Wilson','06012352','e.wilson33@yahoo.com','1992-09-05',1,'2023-05-15 18:58:06'),(24,'test9','21232f297a57a5a743894a0e4a801fc3','Filip','More','06012353','f.moore77@hotmail.com','1991-01-22',1,'2023-05-15 18:59:06'),(25,'test10','21232f297a57a5a743894a0e4a801fc3','George','Taylor','06012354','g.taylor88@gmail.com','1990-06-18',1,'2023-05-15 19:00:06'),(26,'test11','21232f297a57a5a743894a0e4a801fc3','Harly','Anderson','06012355','h.anderson99@outlook.com','1989-04-27',1,'2023-05-15 19:01:06'),(27,'test12','21232f297a57a5a743894a0e4a801fc3','Thomas','Ibric','06012356','i.thomas22@gmail.com','1988-11-14',1,'2023-05-15 19:02:06'),(28,'test13','21232f297a57a5a743894a0e4a801fc3','John','Jackson','06012357','j.jackson33@yahoo.com','1987-07-19',1,'2023-05-15 19:03:06'),(29,'test14','21232f297a57a5a743894a0e4a801fc3','Kaly','White','06012358','k.white77@hotmail.com','1986-10-11',1,'2023-05-15 19:04:06'),(30,'test15','21232f297a57a5a743894a0e4a801fc3','Harris','L','06012359','l.harris88@gmail.com','1985-02-03',1,'2023-05-15 19:05:06');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userRole`
--

DROP TABLE IF EXISTS `userRole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userRole` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userRole_pk` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userRole`
--

LOCK TABLES `userRole` WRITE;
/*!40000 ALTER TABLE `userRole` DISABLE KEYS */;
INSERT INTO `userRole` VALUES (2,'Admin'),(14,'Izvrsilac'),(1,'Rukovodilac');
/*!40000 ALTER TABLE `userRole` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-06 15:23:47
