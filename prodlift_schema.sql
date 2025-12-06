-- ProdLift Database Schema for MySQL
-- Generated for migration from PostgreSQL

-- Create categories table
CREATE TABLE IF NOT EXISTS `categories` (
  `id` varchar(36) NOT NULL DEFAULT (UUID()),
  `name` text NOT NULL,
  `slug` text NOT NULL,
  `description` text,
  `icon` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_slug_unique` (`slug`(255))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create products table
CREATE TABLE IF NOT EXISTS `products` (
  `id` varchar(36) NOT NULL DEFAULT (UUID()),
  `code` text NOT NULL,
  `name` text NOT NULL,
  `slug` text NOT NULL,
  `description` text,
  `specifications` text,
  `category_id` varchar(36),
  `image` text,
  `featured` boolean DEFAULT false,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_slug_unique` (`slug`(255)),
  KEY `products_category_id_idx` (`category_id`),
  CONSTRAINT `products_category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create inquiries table
CREATE TABLE IF NOT EXISTS `inquiries` (
  `id` varchar(36) NOT NULL DEFAULT (UUID()),
  `name` text NOT NULL,
  `email` text NOT NULL,
  `phone` text,
  `company` text,
  `subject` text NOT NULL,
  `message` text NOT NULL,
  `product_id` varchar(36),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `inquiries_product_id_idx` (`product_id`),
  CONSTRAINT `inquiries_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create elevator_configurations table
CREATE TABLE IF NOT EXISTS `elevator_configurations` (
  `id` varchar(36) NOT NULL DEFAULT (UUID()),
  `session_id` text NOT NULL,
  `cabin_type` text,
  `capacity` int,
  `floors` int,
  `door_type` text,
  `finish_material` text,
  `lighting` text,
  `control_panel` text,
  `additional_features` text,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create platform_configurations table
CREATE TABLE IF NOT EXISTS `platform_configurations` (
  `id` varchar(36) NOT NULL DEFAULT (UUID()),
  `session_id` text NOT NULL,
  `platform_type` text,
  `capacity` int,
  `travel_height` int,
  `indoor` boolean DEFAULT true,
  `ramp_type` text,
  `safety_features` text,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create users table
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) NOT NULL DEFAULT (UUID()),
  `username` text NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`(255))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create pdfs table
CREATE TABLE IF NOT EXISTS `pdfs` (
  `id` varchar(36) NOT NULL DEFAULT (UUID()),
  `name` text NOT NULL,
  `filename` text NOT NULL,
  `url` text NOT NULL,
  `product_id` varchar(36),
  `type` text NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `pdfs_product_id_idx` (`product_id`),
  CONSTRAINT `pdfs_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
