-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: syq_db
-- ------------------------------------------------------
-- Server version	8.0.17

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
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `phone` char(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `comment` varchar(300) COLLATE utf8mb4_bin DEFAULT NULL,
  `create_time` char(20) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (2,'123','123','123','2019-12-22 17:46:49'),(3,'444','444','444','2019-12-22 17:48:49');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `name` char(50) COLLATE utf8mb4_bin DEFAULT NULL,
  `phone` char(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `email` char(50) COLLATE utf8mb4_bin DEFAULT NULL,
  `address` char(60) COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (0,'昆山三艺强包装材料有限公司','13915742342',NULL,'昆山某地22');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(50) DEFAULT NULL,
  `pics` varchar(300) DEFAULT NULL,
  `intro` varchar(300) DEFAULT NULL,
  `create_time` char(20) DEFAULT NULL,
  `modify_time` char(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device`
--

LOCK TABLES `device` WRITE;
/*!40000 ALTER TABLE `device` DISABLE KEYS */;
INSERT INTO `device` VALUES (3,'设备1','/uploads/2019/11/d1da2c92308720ea7f6fb107e1cd9ee6.png','设备1','2019-11-15 19:06:00','2019-11-15 19:06:00'),(4,'设备2','/uploads/2019/11/a5c6dd153f3f1428903dfb36ba37300c.png','设备2','2019-11-15 19:06:11','2019-11-15 19:06:11'),(5,'设备3','/uploads/2019/11/775f3e1b689aac2e6dae98a4192b2277.png','设备3','2019-11-15 19:06:23','2019-11-15 19:06:23'),(6,'设备4','/uploads/2019/11/86e6fc61ed4047365d0d0ae0b62b401e.png','设备4','2019-11-15 19:06:39','2019-11-15 19:06:39'),(7,'设备5','/uploads/2019/11/baa90100be16e182ea7dbe1c56e5f0f7.png','设备5','2019-11-15 19:06:50','2019-11-15 19:06:50');
/*!40000 ALTER TABLE `device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(50) COLLATE utf8mb4_bin DEFAULT NULL,
  `category_code` char(36) COLLATE utf8mb4_bin DEFAULT NULL,
  `pics` varchar(300) COLLATE utf8mb4_bin DEFAULT NULL,
  `intro` varchar(300) COLLATE utf8mb4_bin DEFAULT NULL,
  `create_time` char(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `modify_time` char(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (12,'说明书1','dfc1a4a6-17c5-4b2d-8ec8-97c9afc3d4ac','/uploads/2019/11/9357e2eca771320a067ed1479e1cd9ef.png','说明书1','2019-11-15 19:00:28','2019-11-15 19:00:28',1),(13,'说明书2','dfc1a4a6-17c5-4b2d-8ec8-97c9afc3d4ac','/uploads/2019/11/dc7c983c6609d8580f6ddeed5c462d6c.png','说明书2','2019-11-15 19:00:47','2019-11-15 19:00:47',1),(14,'说明书3','dfc1a4a6-17c5-4b2d-8ec8-97c9afc3d4ac','/uploads/2019/11/019085709d071235cfa5cc2e30dd73d8.png','说明书3','2019-11-15 19:01:00','2019-11-15 19:01:00',1),(15,'说明书1','dfc1a4a6-17c5-4b2d-8ec8-97c9afc3d4ac','/uploads/2019/11/35e8e9d4e9f930fdd43af2019ec6bba6.png','说明书1','2019-11-15 19:01:09','2019-11-15 19:01:09',1),(16,'单卡盒1','72ef1ece-02d6-4aad-845d-c9af10529532','/uploads/2019/11/a77231d8b85dac1d54e6f23deac22d14.png','单卡盒1','2019-11-15 19:01:38','2019-11-15 19:01:38',1),(17,'单卡盒1','72ef1ece-02d6-4aad-845d-c9af10529532','/uploads/2019/11/9357e2eca771320a067ed1479e1cd9ef.png','单卡盒1','2019-11-15 19:01:47','2019-11-15 19:01:47',1),(18,'单卡盒1','72ef1ece-02d6-4aad-845d-c9af10529532','/uploads/2019/11/905c03dd0da113e6db622f2aca2b88ba.png','单卡盒1','2019-11-15 19:01:56','2019-11-15 19:01:56',1),(19,'单卡盒1','72ef1ece-02d6-4aad-845d-c9af10529532','/uploads/2019/11/9cbe0cec5c07a8c6b846bad26dfd33cf.png','单卡盒1','2019-11-15 19:02:15','2019-11-15 19:02:15',1),(20,'单卡盒1','72ef1ece-02d6-4aad-845d-c9af10529532','/uploads/2019/11/29e1b224cbca60d8a7cf9426f0a6ca1c.png','单卡盒1','2019-11-15 19:02:32','2019-11-15 19:02:32',1),(21,'单卡盒1','72ef1ece-02d6-4aad-845d-c9af10529532','/uploads/2019/11/3dc68ecc3d11e77d1bf8b4ad8b798248.png','单卡盒1','2019-11-15 19:02:41','2019-11-15 19:02:41',1),(22,'单卡盒1','72ef1ece-02d6-4aad-845d-c9af10529532','/uploads/2019/11/1f0d3b44911b0c135507b2fa5c61bee7.png,/uploads/2019/11/9357e2eca771320a067ed1479e1cd9ef.png','单卡盒1','2019-11-15 19:03:07','2019-11-15 19:03:07',1),(23,'手提袋1','152e7bef-4589-44e3-93e2-07bc593047b1','/uploads/2019/11/1bb71e0fc72770c7b85db44d6bdd6ec2.png,/uploads/2019/11/a89f314764187fc869b00a038b986c9a.png','手提袋1','2019-11-15 19:04:56','2019-11-15 19:04:56',1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` char(36) COLLATE utf8mb4_bin NOT NULL,
  `category` char(30) COLLATE utf8mb4_bin NOT NULL,
  `create_time` char(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `modify_time` char(20) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (12,'72ef1ece-02d6-4aad-845d-c9af10529532','单卡盒','2019-11-15 16:47:03','2019-11-15 16:47:03'),(13,'dfc1a4a6-17c5-4b2d-8ec8-97c9afc3d4ac','说明书','2019-11-15 16:52:44','2019-11-15 18:59:26'),(14,'152e7bef-4589-44e3-93e2-07bc593047b1','手提袋','2019-11-15 19:03:53','2019-11-15 19:03:53');
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` char(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `password` char(32) COLLATE utf8mb4_bin DEFAULT NULL,
  `type` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (0,'hanyu','924ee5948e35bf8177168a6a73ecefe6',1),(1,'wsh888','924ee5948e35bf8177168a6a73ecefe6',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'syq_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-28 17:14:54
