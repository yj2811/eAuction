-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 10, 2023 at 12:48 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eAuction`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `addressId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `postalCode` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`addressId`, `userId`, `address`, `city`, `state`, `country`, `postalCode`) VALUES
(1, 36, 'RNA Classic', 'Mumbai', 'Maharashtra', 'India', '576104');

-- --------------------------------------------------------

--
-- Table structure for table `auction`
--

CREATE TABLE `auction` (
  `auctionId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `emdAmount` decimal(10,2) DEFAULT NULL,
  `startBidAmount` decimal(10,2) NOT NULL,
  `minIncrementValue` decimal(10,2) NOT NULL,
  `currentBidAmount` decimal(10,2) DEFAULT NULL,
  `availableQty` int(10) NOT NULL,
  `auctionState` varchar(20) NOT NULL,
  `winnerId` int(11) DEFAULT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auction`
--

INSERT INTO `auction` (`auctionId`, `productId`, `startDate`, `endDate`, `emdAmount`, `startBidAmount`, `minIncrementValue`, `currentBidAmount`, `availableQty`, `auctionState`, `winnerId`, `status`) VALUES
(26, 65, '2023-03-02 23:11:00', '2023-03-02 23:20:00', NULL, '200.00', '10.00', '230.00', 1, 'closed', 40, 'approved'),
(27, 66, '2023-07-01 23:16:00', '2023-08-01 23:16:00', '40.00', '4000.00', '200.00', NULL, 1, 'upcoming', NULL, 'approved'),
(28, 73, '2023-03-02 23:18:00', '2023-07-31 23:18:00', '50.00', '4000.00', '100.00', '4300.00', 1, 'live', NULL, 'approved'),
(29, 63, '2023-03-02 23:25:00', '2023-03-02 23:35:00', NULL, '3000.00', '200.00', '3600.00', 1, 'closed', 39, 'approved'),
(30, 64, '2023-07-01 23:28:00', '2023-08-01 23:28:00', '40.00', '18000.00', '1000.00', NULL, 1, 'upcoming', NULL, 'approved'),
(31, 70, '2023-03-02 23:36:00', '2023-07-31 23:36:00', '50.00', '150.00', '30.00', '210.00', 1, 'live', NULL, 'approved'),
(32, 71, '2023-03-02 23:37:00', '2023-07-31 23:37:00', '30.00', '700.00', '100.00', '900.00', 1, 'live', NULL, 'approved'),
(33, 72, '2023-03-02 23:37:00', '2023-07-31 23:37:00', '40.00', '450000.00', '5000.00', '460000.00', 1, 'live', NULL, 'approved'),
(34, 61, '2023-03-02 23:44:00', '2023-03-02 23:48:00', NULL, '40000.00', '1000.00', '42000.00', 1, 'closed', 37, 'approved'),
(35, 62, '2023-03-02 23:46:00', '2023-03-02 23:50:00', NULL, '25000.00', '2000.00', '29000.00', 1, 'closed', 39, 'approved'),
(36, 68, '2023-07-01 23:49:00', '2023-08-01 23:49:00', '40.00', '3500.00', '100.00', NULL, 1, 'upcoming', NULL, 'approved'),
(37, 67, '2023-03-02 23:50:00', '2023-07-31 23:50:00', '50.00', '3800.00', '100.00', '4100.00', 1, 'live', NULL, 'approved'),
(38, 69, '2023-03-02 23:50:00', '2023-07-31 23:50:00', '30.00', '400.00', '50.00', '600.00', 1, 'live', NULL, 'approved'),
(39, 74, '2023-03-03 00:01:00', '2023-07-31 00:01:00', '40.00', '1800.00', '100.00', NULL, 1, 'live', NULL, 'pending'),
(40, 75, '2023-03-03 00:02:00', '2023-07-31 00:02:00', '50.00', '700.00', '50.00', NULL, 1, 'live', NULL, 'pending'),
(42, 83, '2023-07-01 17:32:00', '2023-08-01 17:32:00', '30.00', '2500.00', '300.00', NULL, 1, 'upcoming', NULL, 'approved'),
(43, 84, '2023-07-01 17:36:00', '2023-08-01 17:36:00', '40.00', '3000.00', '100.00', NULL, 1, 'upcoming', NULL, 'approved');

-- --------------------------------------------------------

--
-- Table structure for table `bid`
--

CREATE TABLE `bid` (
  `bidId` int(11) NOT NULL,
  `buyerId` int(11) NOT NULL,
  `auctionId` int(11) NOT NULL,
  `bidPricePerUnit` decimal(10,2) NOT NULL,
  `bidQty` int(10) NOT NULL,
  `bidAmount` decimal(10,2) DEFAULT NULL,
  `bidDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bid`
--

INSERT INTO `bid` (`bidId`, `buyerId`, `auctionId`, `bidPricePerUnit`, `bidQty`, `bidAmount`, `bidDate`) VALUES
(15, 37, 26, '210.00', 1, '210.00', '2023-03-02 23:12:59'),
(16, 39, 26, '220.00', 1, '220.00', '2023-03-02 23:13:31'),
(17, 40, 26, '230.00', 1, '230.00', '2023-03-02 23:15:05'),
(18, 37, 28, '4100.00', 1, '4100.00', '2023-03-02 23:19:41'),
(19, 39, 28, '4200.00', 1, '4200.00', '2023-03-02 23:20:14'),
(20, 40, 28, '4300.00', 1, '4300.00', '2023-03-02 23:20:48'),
(21, 37, 29, '3000.00', 1, '3000.00', '2023-03-02 23:26:04'),
(22, 39, 29, '3600.00', 1, '3600.00', '2023-03-02 23:26:28'),
(23, 40, 29, '3400.00', 1, '3400.00', '2023-03-02 23:26:55'),
(24, 40, 31, '150.00', 1, '150.00', '2023-03-02 23:41:10'),
(25, 39, 31, '180.00', 1, '180.00', '2023-03-02 23:41:30'),
(26, 37, 31, '210.00', 1, '210.00', '2023-03-02 23:41:53'),
(27, 40, 32, '700.00', 1, '700.00', '2023-03-02 23:42:37'),
(28, 40, 33, '450000.00', 1, '450000.00', '2023-03-02 23:42:49'),
(29, 39, 32, '800.00', 1, '800.00', '2023-03-02 23:43:20'),
(30, 39, 33, '455000.00', 1, '455000.00', '2023-03-02 23:43:34'),
(31, 37, 32, '900.00', 1, '900.00', '2023-03-02 23:43:55'),
(32, 37, 33, '460000.00', 1, '460000.00', '2023-03-02 23:44:06'),
(33, 39, 34, '40000.00', 1, '40000.00', '2023-03-02 23:45:26'),
(34, 40, 34, '41000.00', 1, '41000.00', '2023-03-02 23:45:53'),
(35, 37, 34, '42000.00', 1, '42000.00', '2023-03-02 23:46:15'),
(36, 37, 35, '25000.00', 1, '25000.00', '2023-03-02 23:47:55'),
(37, 40, 35, '27000.00', 1, '27000.00', '2023-03-02 23:48:15'),
(38, 39, 35, '29000.00', 1, '29000.00', '2023-03-02 23:48:39'),
(39, 40, 37, '3900.00', 1, '3900.00', '2023-03-02 23:51:55'),
(40, 40, 38, '450.00', 1, '450.00', '2023-03-02 23:52:05'),
(41, 37, 37, '4000.00', 1, '4000.00', '2023-03-02 23:52:24'),
(42, 37, 38, '600.00', 1, '600.00', '2023-03-02 23:52:32'),
(43, 39, 37, '4100.00', 1, '4100.00', '2023-03-02 23:52:51'),
(44, 39, 38, '550.00', 1, '550.00', '2023-03-02 23:53:02');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryId`, `categoryName`, `status`) VALUES
(21, 'Electronics', 'approved'),
(22, 'Home Appliances', 'approved'),
(23, 'Clothing', 'approved'),
(24, 'Footwear', 'approved'),
(25, 'Beauty', 'approved'),
(26, 'Sports', 'approved'),
(27, 'Books', 'approved'),
(28, 'Toys', 'pending'),
(29, 'Food', 'pending'),
(30, 'Beverages', 'pending'),
(32, 'Furniture', 'approved'),
(33, 'Music', 'pending'),
(34, 'Gadgets', 'pending'),
(35, 'Automotive', 'approved'),
(36, 'Personal Care', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `companyId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `companyName` varchar(255) NOT NULL,
  `companyAccount` varchar(50) NOT NULL,
  `companyBank` varchar(100) NOT NULL,
  `bankIFSC` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`companyId`, `userId`, `companyName`, `companyAccount`, `companyBank`, `bankIFSC`) VALUES
(1, 36, 'Microsoft', '1234', 'Yes Bank', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `emd`
--

CREATE TABLE `emd` (
  `emdId` int(11) NOT NULL,
  `buyerId` int(11) NOT NULL,
  `auctionId` int(11) NOT NULL,
  `orderId` varchar(100) NOT NULL,
  `paymentId` varchar(100) DEFAULT NULL,
  `paymentAmount` decimal(10,2) NOT NULL,
  `paymentDate` datetime NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `emd`
--

INSERT INTO `emd` (`emdId`, `buyerId`, `auctionId`, `orderId`, `paymentId`, `paymentAmount`, `paymentDate`, `status`) VALUES
(17, 37, 28, 'order_Lev8zdwTVzUNDP', 'pay_Lev94c29DumcGz', '50.00', '2023-04-17 21:44:24', 'success'),
(18, 37, 31, 'order_Lev9YxmyqZOrqb', 'pay_Lev9dU0Vt7pKX8', '50.00', '2023-04-17 21:44:57', 'success'),
(19, 37, 32, 'order_LevA7fUKB3iOKm', 'pay_LevAD1jmZeRLLL', '30.00', '2023-04-17 21:45:28', 'success'),
(20, 37, 33, 'order_LevAe89EDflkvM', 'pay_LevAiJhrE6Sxmj', '40.00', '2023-04-17 21:45:58', 'success'),
(21, 37, 37, 'order_LevB6xyUXQKPCZ', 'pay_LevBBUuOx4EjI9', '50.00', '2023-04-17 21:46:25', 'success'),
(22, 37, 38, 'order_LevBd2vSfDwfZX', 'pay_LevBh2DYZPSuj9', '30.00', '2023-04-17 21:46:54', 'success'),
(23, 39, 28, 'order_LevCYXe95u3BaX', 'pay_LevCj1ubheKUOc', '50.00', '2023-04-17 21:47:47', 'success'),
(24, 39, 31, 'order_LevDgiem7AugMd', 'pay_LevDlX2p1rZTtV', '50.00', '2023-04-17 21:48:51', 'success'),
(25, 39, 32, 'order_LevE8t4LaLrIcH', 'pay_LevEDKBGl3hxPk', '30.00', '2023-04-17 21:49:17', 'success'),
(26, 39, 33, 'order_LevEYDtyAI4q3z', 'pay_LevEcnYZvZggQ1', '40.00', '2023-04-17 21:49:40', 'success'),
(27, 39, 37, 'order_LevFA8ginr2zNs', 'pay_LevFF3a9JSN0RL', '50.00', '2023-04-17 21:50:15', 'success'),
(28, 39, 38, 'order_LevFYFfjWebTD0', 'pay_LevFk9VBhTYZGh', '30.00', '2023-04-17 21:50:37', 'success'),
(29, 40, 28, 'order_Levvtoqfam4bkr', 'pay_LevvyuYCQBP1DE', '50.00', '2023-04-17 22:30:42', 'success'),
(30, 40, 31, 'order_LevwSWGqi7kEBF', 'pay_LevwXqJJ46i6ud', '50.00', '2023-04-17 22:31:14', 'success'),
(31, 40, 32, 'order_Levx3Kg5JDxS9g', 'pay_Levx8HESLkf1W2', '30.00', '2023-04-17 22:31:48', 'success'),
(32, 40, 33, 'order_LevxRjbY25JhCl', 'pay_LevxWFGKFAPrIc', '40.00', '2023-04-17 22:32:10', 'success'),
(33, 40, 37, 'order_LevxxzHhc3Zi2A', 'pay_Levy8HH6EjwZ1j', '50.00', '2023-04-17 22:32:40', 'success'),
(34, 40, 38, 'order_LevyQqZTFLuhGe', 'pay_LevyV6Vswij7Fh', '30.00', '2023-04-17 22:33:06', 'success'),
(35, 24, 32, 'order_Lk4Eana8yQE7EP', NULL, '30.00', '2023-04-30 21:52:57', 'pending'),
(36, 24, 37, 'order_LnXCjL168A2sJd', NULL, '50.00', '2023-05-09 16:10:19', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `productId` int(11) NOT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `sellerId` int(11) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `productDesc` text NOT NULL,
  `productFeatures` text NOT NULL,
  `productYOM` year(4) NOT NULL,
  `productImage` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productId`, `categoryId`, `sellerId`, `productName`, `productDesc`, `productFeatures`, `productYOM`, `productImage`) VALUES
(61, 21, 36, 'Smartphone', 'An important electronic device', 'Brand new', 2022, 'smartphone_78603af5-857f-4266-9c90-4209654b2f4c.png,smartphone_31a1976a-05f0-454c-8004-1a2870e8b650.jpeg,smartphone_fca006b6-ab79-412e-bad7-771af33bd3ac.jpeg\r\n'),
(62, 22, 36, 'Refrigerator', 'For storing and cooling', 'Latest technology', 2020, 'refrigerator_a38bd777-2d4d-44d3-b5f2-54b9f32cbac9.png,refrigerator_6f475f3f-097f-4db9-b22c-fd947a60c7ef.jpeg,refrigerator_91f6f67c-7dca-43cd-89fd-f1ded0e6749c.jpeg'),
(63, 23, 38, 'Sweatshirt', 'Good looking', 'Nice in color', 2018, 'clothing_8fda8b2a-c003-4e7c-ac79-3d0c94ff721c.png,clothing_28a4311b-dc91-465c-9fa3-9bc0a438e1e8.jpeg,clothing_e9a182d6-0f3c-43f6-8457-ff566aada33f.jpeg'),
(64, 24, 38, 'Jordan', 'Nike\'s latest collection', 'Very sporty and stylish', 2022, 'jordan_bde9f1c8-d6d1-4be4-b662-c1cfdeeeecb0.png,jordan_d3a37187-faff-4251-b859-99bd1f59c7b8.jpeg,jordan_eb32fdf2-7fe7-4b76-ad89-1369d09e65b9.jpeg'),
(65, 25, 42, 'Moisturizer', 'For soft skin', 'Suitable for all skin types', 2022, 'moisturizer_3aabbf25-88ac-48cd-ba58-c2bf10fb194d.png,moisturizer_1312f6f8-efe2-4ea5-88c3-064aa53b0615.jpeg,moisturizer_941dedb2-0187-4f50-8fc9-2f4fa77fa616.jpeg'),
(66, 24, 42, 'Boots', 'Knee length boots', 'Comfortable for snow', 2018, 'boots_ff2f0f7e-0063-42f2-b6e4-db53970955f6.jpeg,boots_9d4701f2-b1e5-40a2-8708-dfe8b7935c2d.jpeg,boots_a490f2fd-f39a-4e47-b6e8-864fec6a8a48.jpeg'),
(67, 26, 36, 'Bicycle', 'For riding', 'Good for trekking', 2020, 'bicycle_bb8405dd-b71e-4771-bf1c-e10c5e05f227.jpg,bicycle_2e4c2212-ea24-488a-b1f3-283978ae470b.jpeg,bicycle_49fb9a3f-817f-4302-97de-5d917f21f00f.jpeg'),
(68, 32, 36, 'Table', 'For office-related work', 'Good sturdy table and light in weight', 2018, 'table_af4c3230-f94e-44bd-88c2-ac154e35fca9.jpeg,table_ebd67a7f-a80a-4f4d-bdfa-5061ea0ab60b.jpeg,table_75deda46-e89c-4b9c-970a-ab84fd455f60.jpeg'),
(69, 27, 36, 'Harry Potter', 'Harry Potter and the Half Blood Prince', 'Very nice fiction book', 2010, 'harrypotter_961c0c0d-9e12-468c-be3c-f1c47bacf33e.jpeg,harrypotter_51cb2af9-d3f3-4fb3-8a6b-de2556f1effb.jpeg,harrypotter_e4bce0a3-8207-456c-a026-bf5aca9fc238.jpeg'),
(70, 22, 38, 'Bulb', 'Bright yellow light', 'Can be easily set up', 2022, 'bulb_fb32e5c7-e5c4-464c-9375-fdcca6034a64.jpeg,bulb_84099c76-ffc8-4004-8233-ffa2db95e7b8.jpeg,bulb_f381bf4c-9abf-4d9c-ad92-fa898d740f0b.jpeg'),
(71, 32, 38, 'Chair', 'Wood made', 'It has a soft cushion', 2012, 'chair_a93832f8-aa63-4fb4-951c-331aec06a095.jpeg,chair_9619cffd-7611-436f-8123-50de0d95d7a9.jpeg,chair_b6996e3e-7d62-46ac-be23-fc04b59eb2f6.jpeg'),
(72, 35, 38, 'Verna', 'A Hyundai Product', 'Nice and fast car', 2015, 'car_656c5141-3227-4ddf-ac1a-78c6187674ad.jpeg,car_b4003a55-10a0-40a9-b95a-2474c6641a81.jpeg,car_428895c6-562b-4190-9c02-e1f6a775db96.jpeg'),
(73, 22, 42, 'Washing Machine', 'Grey in colour', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In orci tellus, vehicula sed venenatis sit amet, tincidunt id sem. Etiam feugiat, neque in iaculis tincidunt, justo velit laoreet magna, vel consectetur ligula augue at risus. Pellentesque porta erat neque, ut gravida ipsum finibus ac.', 2019, 'washing_9c5f8b40-a995-4179-8998-6308018244fd.jpeg,washing_4d8e3e45-bb57-48c7-aec5-31bab064b370.jpeg,washing_0e250122-870d-4e7e-b4c2-44e3b48cbf64.jpeg'),
(74, 25, 42, 'Lipstick', 'Soft matte texture', 'Bold red colour', 2020, 'lipstick.jpeg'),
(75, 26, 42, 'Badminton Racquet', 'Strong and new', 'Sturdy with a good grip', 2018, 'badminton.jpeg'),
(82, 23, 36, 'Dress', 'Large in size', 'Nice pinkish color', 2020, '1678563479897-dress.jpeg'),
(83, 27, 36, 'Reality Transurfing', 'Written by Vadim Zeland', 'Powerful tool for managing reality', 2020, 'reality_22fc2b91-1489-4a6b-a94a-ce5a16e59337.png,reality_e5e856a4-0d0e-499f-92de-03081984ff8c.jpeg,reality_864dd1a0-176b-4da8-ac15-33f928663cea.jpeg'),
(84, 21, 36, 'Hair Dryer', 'A Remington product', 'Good for blow drying', 2018, 'dryer_12e2cbc1-7f8c-43b8-88de-4ba31a6cf7bb.jpeg,dryer_13346371-61d2-4338-be46-2661347d876f.jpeg,dryer_53c9118b-30ed-44e6-b6dd-ac7c0b4254a0.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `rating` int(1) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `reviewTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`userId`, `productId`, `rating`, `comment`, `reviewTime`) VALUES
(37, 73, 1, 'good', '2023-03-08 19:14:11'),
(37, 73, 1, 'good', '2023-03-08 19:14:11');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(60) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `role` varchar(50) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `firstName`, `lastName`, `email`, `password`, `mobile`, `role`, `status`) VALUES
(23, 'sellerF', 'sellerL', 'seller@gmail.com', '$2y$10$wK9mKyCwrCHvdK1krrYTXuVAPkE131hFPbWFeaoWFPD6uzkez0tNy', '9876543210', 'seller', 'approved'),
(24, 'buyerF', 'buyerL', 'buyer@gmail.com', '$2y$10$HalyLZEpUcDfXK/mMk.q6.dWsk7FNartR.dN9rWB3joSDI11IcV6i', '9876543210', 'buyer', 'approved'),
(25, 'adminF', 'adminL', 'admin@gmail.com', '$2y$10$apkYuYyPgXdL3JjvaWJwG.1ezZgRVpCt38wU2FYQ6VqACPTtvCTT2', '9876543210', 'admin', 'approved'),
(36, 'Yogakshi', 'Jaiman', 'yogakshi@gmail.com', '$2y$10$V0ocboQfVe/3kvWRhwTDZOyeLyHeI7tsTALnmsoe/Kk3tqml/Fy3W', '7506325219', 'seller', 'approved'),
(37, 'Aditya', 'Jaiman', 'aditya@gmail.com', '$2y$10$/S740J5yvHan8QWMQqaMweNNZGWQE1RWaQC0/ubF/UjkT7f6FL57q', '9871996144', 'buyer', 'approved'),
(38, 'Gaurav', 'Kashyap', 'gaurav@gmail.com', '$2y$10$WmZhIm9CLuIbAHKiASUjLe1gNJJRY9uZsRav4.ULrksidnLVJFU2G', '9876543210', 'seller', 'approved'),
(39, 'Karishma', 'Katoch', 'karishma@gmail.com', '$2y$10$vgV2kS5lRRaK2agpu/xDmuzep4WuksGGmGZpOuBJ8hwzr05JefcTm', '9876543210', 'buyer', 'approved'),
(40, 'Devyani', 'Goil', 'devyani@gmail.com', '$2y$10$M3FNJWOJnsH7YeKxE1g1hOkijSRr8kMQW3mv/gq8beu8IQWruHfPW', '9876543210', 'buyer', 'approved'),
(41, 'Ishaan', 'Ahluwalia', 'ishaan@gmail.com', '$2y$10$sOvqlULYo4KK4ETxMDGY4eRqNKchb3bSsU4uB86GPXAe7uPn6FeMG', '9876543210', 'seller', 'pending'),
(42, 'Shloka', 'Shetty', 'shloka@gmail.com', '$2y$10$lf0XTLLH98X.8a.BvXFik.ZGW.oPrTvfQ5iK9/wyFhsvFq.yeBqua', '9876543210', 'seller', 'approved'),
(43, 'Karuna', 'Kashyap', 'karuna@gmail.com', '$2y$10$cDHA26.D558daBU7aLhS2uSgsRbVhMA3abajH0rHHik506jfBIvPK', '9876543210', 'buyer', 'pending'),
(44, 'Surendra', 'Kashyap', 'surendra@gmail.com', '$2y$10$RlL5uhJR/TAMe5dJqhYRVOX2UYfLw8ZG4E.oVCXb5EcQEED1YLXCa', '9876543210', 'seller', 'pending'),
(45, 'Sudheer', 'Sharma', 'sudheer@gmail.com', '$2y$10$OEA6tBAlszGSB7GOAT9PWujiBvkxeGf9kUl3iVBrnTe5KLAmsqU6e', '9876543210', 'buyer', 'pending'),
(53, 'Katy', 'Spencer', 'yogakshijaiman@gmail.com', '$2y$10$QOtwei/niCJAQgQpj0wOK.KWGhtEK6.F0G7/TvmVuQFP4ebAOMd0m', '7506325219', 'buyer', 'pending');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`addressId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `auction`
--
ALTER TABLE `auction`
  ADD PRIMARY KEY (`auctionId`),
  ADD KEY `auction_ibfk_1` (`productId`),
  ADD KEY `winnerId` (`winnerId`);

--
-- Indexes for table `bid`
--
ALTER TABLE `bid`
  ADD PRIMARY KEY (`bidId`),
  ADD KEY `bid_ibfk_1` (`buyerId`),
  ADD KEY `auctionId` (`auctionId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`companyId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `emd`
--
ALTER TABLE `emd`
  ADD PRIMARY KEY (`emdId`),
  ADD KEY `auctionId` (`auctionId`),
  ADD KEY `buyerId` (`buyerId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `sellerId` (`sellerId`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `addressId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `auction`
--
ALTER TABLE `auction`
  MODIFY `auctionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `bid`
--
ALTER TABLE `bid`
  MODIFY `bidId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `companyId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `emd`
--
ALTER TABLE `emd`
  MODIFY `emdId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `auction`
--
ALTER TABLE `auction`
  ADD CONSTRAINT `auction_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `auction_ibfk_2` FOREIGN KEY (`winnerId`) REFERENCES `user` (`userId`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `bid`
--
ALTER TABLE `bid`
  ADD CONSTRAINT `bid_ibfk_1` FOREIGN KEY (`buyerId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bid_ibfk_2` FOREIGN KEY (`auctionId`) REFERENCES `auction` (`auctionId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `company`
--
ALTER TABLE `company`
  ADD CONSTRAINT `company_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `emd`
--
ALTER TABLE `emd`
  ADD CONSTRAINT `emd_ibfk_1` FOREIGN KEY (`auctionId`) REFERENCES `auction` (`auctionId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `emd_ibfk_2` FOREIGN KEY (`buyerId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`sellerId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `update_auction_state` ON SCHEDULE EVERY 1 MINUTE STARTS '2023-03-01 00:00:00' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN

  UPDATE auction 
  SET auctionState = 
    CASE 
      WHEN NOW() BETWEEN startDate AND endDate THEN 'live' 
      WHEN NOW() > endDate THEN 'closed' 
      WHEN NOW() < startDate THEN 'upcoming' 
    END 
  WHERE status = 'approved'; 

  UPDATE auction 
  SET winnerId = (
    SELECT buyerId 
    FROM bid 
    WHERE bid.auctionId = auction.auctionId 
    ORDER BY bidAmount DESC 
    LIMIT 1
  )
  WHERE status = 'approved' 
    AND auctionState = 'closed' 
    AND winnerId IS NULL; 
    
END$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
