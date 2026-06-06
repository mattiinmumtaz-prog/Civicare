-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.4.3 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for civicare
CREATE DATABASE IF NOT EXISTS `civicare` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `civicare`;

-- Dumping structure for table civicare.chatbot_messages
CREATE TABLE IF NOT EXISTS `chatbot_messages` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `sent_at` datetime(6) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  `message` text COLLATE utf8mb4_general_ci NOT NULL,
  `sender` enum('ADMIN','BOT','USER') COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7b4xj26r6rgyoq77u8vd4gskr` (`user_id`),
  CONSTRAINT `FK7b4xj26r6rgyoq77u8vd4gskr` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table civicare.chatbot_messages: ~0 rows (approximately)

-- Dumping structure for table civicare.chatbot_service
CREATE TABLE IF NOT EXISTS `chatbot_service` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `message` text COLLATE utf8mb4_general_ci,
  `sender` enum('BOT','USER') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKe97ge42tllnhbkptlg9gbeibu` (`user_id`),
  CONSTRAINT `FKe97ge42tllnhbkptlg9gbeibu` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table civicare.chatbot_service: ~0 rows (approximately)

-- Dumping structure for table civicare.complaints
CREATE TABLE IF NOT EXISTS `complaints` (
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  `deskripsi` text COLLATE utf8mb4_general_ci NOT NULL,
  `file_path` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `judul` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('DITOLAK','PENDING','PROSES','SELESAI') COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK83j5gqkd7ku4vc908g4rtmglr` (`user_id`),
  CONSTRAINT `FK83j5gqkd7ku4vc908g4rtmglr` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table civicare.complaints: ~3 rows (approximately)
INSERT INTO `complaints` (`created_at`, `id`, `updated_at`, `user_id`, `deskripsi`, `file_path`, `judul`, `status`) VALUES
	('2026-05-18 17:16:54.572039', 4, '2026-05-19 09:48:29.498620', 4, '.', NULL, 'jalan rusak', 'PENDING'),
	('2026-05-18 17:22:03.045505', 5, '2026-05-18 22:15:59.002642', 4, '.', NULL, 'banyak sampah', 'PROSES'),
	('2026-05-19 09:30:57.459867', 6, '2026-05-19 09:30:57.459867', 4, '.', NULL, 'sampah berserakan', 'PENDING');

-- Dumping structure for table civicare.services
CREATE TABLE IF NOT EXISTS `services` (
  `tiket` int DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `deskripsi` text COLLATE utf8mb4_general_ci,
  `nama_layanan` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table civicare.services: ~0 rows (approximately)

-- Dumping structure for table civicare.service_history
CREATE TABLE IF NOT EXISTS `service_history` (
  `tanggal` date NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `request_id` bigint NOT NULL,
  `keterangan` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcswvkmblw4iisylx0h49tg85k` (`request_id`),
  CONSTRAINT `FKcswvkmblw4iisylx0h49tg85k` FOREIGN KEY (`request_id`) REFERENCES `service_requests` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table civicare.service_history: ~0 rows (approximately)

-- Dumping structure for table civicare.service_requests
CREATE TABLE IF NOT EXISTS `service_requests` (
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `service_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `status` enum('DITOLAK','PENDING','PROSES','SELESAI') COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKlw93ns1xph1x18mxh5p4ukb2g` (`service_id`),
  KEY `FKdnrpkrvtepdqqcxg1nqiq5edt` (`user_id`),
  CONSTRAINT `FKdnrpkrvtepdqqcxg1nqiq5edt` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKlw93ns1xph1x18mxh5p4ukb2g` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table civicare.service_requests: ~0 rows (approximately)

-- Dumping structure for table civicare.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` enum('admin','masyarakat','karyawan') COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table civicare.user: ~2 rows (approximately)
INSERT INTO `user` (`id`, `nama`, `email`, `password`, `role`) VALUES
	(1, 'Admin', 'admin@gmail.com', '123', 'admin'),
	(2, 'Dadang', 'dadang@gmail.com', '123', 'masyarakat');

-- Dumping structure for table civicare.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('ADMIN','KARYAWAN','MASYARAKAT') COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table civicare.users: ~2 rows (approximately)
INSERT INTO `users` (`id`, `email`, `nama`, `password`, `role`) VALUES
	(4, 'dadang@gmail.com', 'Dadang', '$2a$10$n.ZZNc7iWAuoCVFZqHz96un..FsCcN56ubiGqB3xTVBaYw4u19trq', 'MASYARAKAT'),
	(5, 'admin@gmail.com', 'Admin', '$2a$10$61EtSF7zj3//Y9XV8m1kvu24geLZ7fuLe8qFjmVHmKz6mkAnkMdP6', 'ADMIN');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
