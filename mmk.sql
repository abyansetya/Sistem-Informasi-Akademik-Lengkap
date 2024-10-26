-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 19, 2024 at 09:46 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mmk`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('fufufafa@gmal.com|127.0.0.1', 'i:1;', 1728720364),
('fufufafa@gmal.com|127.0.0.1:timer', 'i:1728720364;', 1728720364),
('mahasisswa@example.com|127.0.0.1', 'i:1;', 1728721822),
('mahasisswa@example.com|127.0.0.1:timer', 'i:1728721822;', 1728721822);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mata_kuliah`
--

CREATE TABLE `mata_kuliah` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kode_mata_kuliah` varchar(255) NOT NULL,
  `nama_mata_kuliah` varchar(255) NOT NULL,
  `sks` int(11) NOT NULL,
  `semester` int(11) NOT NULL,
  `prioritas_semester` int(11) NOT NULL,
  `program_studi_id` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mata_kuliah`
--

INSERT INTO `mata_kuliah` (`id`, `kode_mata_kuliah`, `nama_mata_kuliah`, `sks`, `semester`, `prioritas_semester`, `program_studi_id`, `created_at`, `updated_at`) VALUES
(1, 'MKiaz', 'laboriosam reprehenderit', 2, 1, 5, 'IN527', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(2, 'MKkqv', 'facilis dolor', 3, 8, 1, 'IN527', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(3, 'MKwko', 'cumque porro', 4, 5, 3, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(4, 'MKyoy', 'iusto dolores', 3, 1, 4, 'IN527', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(5, 'MKhhm', 'iusto ex', 3, 3, 1, 'KI688', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(6, 'MKzng', 'officia quia', 4, 5, 7, 'FI615', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(7, 'MKcvp', 'corrupti quae', 2, 7, 6, 'FI615', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(8, 'MKoqv', 'sapiente aliquid', 2, 3, 5, 'IN527', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(9, 'MKgkv', 'eaque vitae', 2, 2, 7, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(10, 'MKkop', 'et eos', 3, 6, 6, 'BI811', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(11, 'MKqdb', 'nobis cumque', 2, 2, 4, 'BI410', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(12, 'MKpcl', 'molestiae enim', 3, 7, 4, 'BI811', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(13, 'MKzjf', 'sit cumque', 4, 3, 5, 'BI410', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(14, 'MKsct', 'eaque impedit', 3, 3, 3, 'BI811', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(15, 'MKmlq', 'corrupti delectus', 4, 1, 4, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(16, 'MKoei', 'est magnam', 3, 3, 5, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(17, 'MKnae', 'quaerat est', 3, 1, 2, 'BI410', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(18, 'MKdnj', 'consequatur sapiente', 3, 6, 7, 'IN527', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(19, 'MKhok', 'pariatur quis', 3, 5, 7, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(20, 'MKkbr', 'aliquid voluptates', 3, 8, 2, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(21, 'MKwbn', 'voluptas ut', 4, 4, 2, 'IN527', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(22, 'MKasv', 'facere veniam', 3, 3, 6, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(23, 'MKvpv', 'corrupti tempora', 3, 1, 8, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(24, 'MKgcf', 'alias ipsum', 4, 6, 7, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(25, 'MKbwj', 'sit praesentium', 2, 4, 4, 'IN527', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(26, 'MKgsx', 'eum ex', 4, 3, 1, 'FI615', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(27, 'MKxfb', 'explicabo cumque', 4, 7, 6, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(28, 'MKpyh', 'reprehenderit dignissimos', 4, 4, 1, 'BI410', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(29, 'MKonb', 'rem et', 2, 7, 8, 'BI410', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(30, 'MKexf', 'dolorem recusandae', 2, 1, 7, 'KI688', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(31, 'MKrlg', 'et beatae', 4, 3, 4, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(32, 'MKadt', 'enim sed', 2, 2, 4, 'KI688', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(33, 'MKmap', 'perferendis numquam', 2, 7, 3, 'BI410', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(34, 'MKwiy', 'molestiae et', 4, 2, 4, 'FI615', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(35, 'MKjcy', 'molestiae nihil', 2, 6, 8, 'BI410', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(36, 'MKnlu', 'quas consequatur', 2, 2, 7, 'BI410', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(37, 'MKemm', 'quis sit', 3, 7, 2, 'IN527', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(38, 'MKquj', 'consequatur omnis', 2, 2, 3, 'KI688', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(39, 'MKwkz', 'soluta atque', 3, 5, 8, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(40, 'MKzgs', 'quo quae', 4, 7, 1, 'BI410', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(41, 'MKmqy', 'in aut', 3, 4, 6, 'KI688', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(42, 'MKulh', 'inventore voluptates', 2, 2, 5, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(43, 'MKllo', 'suscipit illo', 4, 7, 2, 'KI688', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(44, 'MKrsd', 'consequuntur error', 3, 5, 4, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(45, 'MKwxy', 'non sint', 4, 8, 7, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(46, 'MKgql', 'eveniet reprehenderit', 4, 7, 6, 'IN527', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(47, 'MKdgl', 'itaque in', 3, 3, 4, 'FI615', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(48, 'MKxyy', 'quia veritatis', 3, 4, 2, 'IN527', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(49, 'MKhnu', 'dolorem qui', 3, 7, 6, 'BI811', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(50, 'MKttf', 'iste libero', 2, 8, 2, 'BI410', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(51, 'MKoin', 'et culpa', 2, 4, 8, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(52, 'MKstm', 'molestias itaque', 2, 2, 5, 'IN527', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(53, 'MKmxb', 'facere dolorum', 2, 7, 4, 'IN527', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(54, 'MKgcn', 'ad dicta', 4, 7, 6, 'FI615', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(55, 'MKyuw', 'laborum molestias', 2, 7, 8, 'FI615', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(56, 'MKqtb', 'eius nihil', 4, 4, 1, 'BI410', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(57, 'MKjsb', 'magni debitis', 2, 2, 2, 'KI688', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(58, 'MKlzn', 'omnis temporibus', 3, 8, 3, 'BI811', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(59, 'MKcbk', 'exercitationem voluptate', 2, 2, 1, 'BI410', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(60, 'MKajs', 'sunt molestiae', 4, 7, 5, 'IN527', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(61, 'MKqtk', 'rem unde', 2, 6, 7, 'IN527', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(62, 'MKhsp', 'nihil ut', 3, 6, 6, 'BI410', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(63, 'MKhez', 'aspernatur est', 2, 6, 1, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(64, 'MKkkr', 'quia ea', 4, 3, 1, 'BI410', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(65, 'MKttz', 'iste ut', 4, 4, 3, 'BI811', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(66, 'MKves', 'consequatur nostrum', 2, 3, 2, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(67, 'MKobh', 'quis cupiditate', 4, 2, 3, 'BI811', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(68, 'MKpkj', 'quia in', 2, 3, 6, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(69, 'MKthv', 'ut illo', 3, 1, 8, 'BI410', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(70, 'MKymz', 'omnis et', 3, 1, 5, 'BI410', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(71, 'MKnxd', 'dicta voluptas', 3, 6, 5, 'BI410', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(72, 'MKjnf', 'eligendi ad', 4, 5, 6, 'IN527', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(73, 'MKted', 'voluptas quis', 2, 3, 8, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(74, 'MKjjk', 'ut voluptas', 2, 7, 5, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(75, 'MKrnn', 'maxime veniam', 2, 7, 3, 'BI811', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(76, 'MKlre', 'impedit ex', 2, 8, 7, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(77, 'MKkia', 'voluptatum est', 4, 4, 3, 'KI688', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(78, 'MKuuo', 'fugit voluptates', 4, 3, 6, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(79, 'MKdov', 'consequatur assumenda', 4, 1, 1, 'FI615', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(80, 'MKhon', 'dolores dignissimos', 2, 7, 7, 'KI688', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(81, 'MKcoh', 'aut quis', 2, 8, 5, 'BI811', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(82, 'MKmnk', 'aut sunt', 3, 3, 1, 'BI410', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(83, 'MKbfz', 'quia aut', 4, 8, 2, 'FI615', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(84, 'MKmbx', 'cupiditate est', 4, 4, 4, 'FI615', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(85, 'MKuar', 'exercitationem expedita', 3, 5, 6, 'KI688', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(86, 'MKjli', 'nesciunt optio', 4, 7, 8, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(87, 'MKbla', 'et laboriosam', 4, 4, 8, 'BI811', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(88, 'MKgew', 'ab consectetur', 3, 8, 2, 'KI688', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(89, 'MKdqy', 'corporis earum', 4, 8, 7, 'IN527', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(90, 'MKkmy', 'et quod', 3, 5, 3, 'KI688', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(91, 'MKytp', 'ut ullam', 4, 1, 8, 'FI615', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(92, 'MKref', 'nihil porro', 4, 7, 4, 'IN527', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(93, 'MKrif', 'quo error', 3, 4, 1, 'BI410', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(94, 'MKpeg', 'totam numquam', 2, 6, 8, 'BI811', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(95, 'MKmun', 'laborum ipsum', 2, 8, 6, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(96, 'MKtga', 'asperiores iste', 4, 2, 5, 'MA686', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(97, 'MKewy', 'unde aut', 4, 3, 5, 'IN527', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(98, 'MKhds', 'voluptates quaerat', 3, 8, 2, 'KI688', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(99, 'MKyis', 'dicta eos', 4, 6, 5, 'BI410', '2024-10-18 23:00:18', '2024-10-18 23:00:18'),
(100, 'MKetm', 'et minima', 3, 5, 5, 'IN527', '2024-10-18 23:00:18', '2024-10-18 23:00:18');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(4, '0001_01_01_000000_create_users_table', 1),
(5, '0001_01_01_000001_create_cache_table', 1),
(6, '0001_01_01_000002_create_jobs_table', 1),
(7, '2024_10_12_072754_create_roles_table', 2),
(8, '2024_10_12_080357_create_user_roles_table', 2),
(9, '2024_10_19_050118_create_ruang_kelas_table', 3),
(10, '2024_10_19_053131_create_program_studi_table', 4),
(11, '2024_10_19_055419_create_matakuliah_table', 5);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `program_studi`
--

CREATE TABLE `program_studi` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kode_program_studi` varchar(255) NOT NULL,
  `nama_program_studi` varchar(255) NOT NULL,
  `fakultas` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `program_studi`
--

INSERT INTO `program_studi` (`id`, `kode_program_studi`, `nama_program_studi`, `fakultas`, `created_at`, `updated_at`) VALUES
(1, 'BI410', 'Biologi', 'Fakultas Sains dan Matematika', '2024-10-18 22:43:09', '2024-10-18 22:43:09'),
(2, 'FI615', 'Fisika', 'Fakultas Sains dan Matematika', '2024-10-18 22:43:09', '2024-10-18 22:43:09'),
(3, 'KI688', 'Kimia', 'Fakultas Sains dan Matematika', '2024-10-18 22:43:09', '2024-10-18 22:43:09'),
(4, 'MA686', 'Matematika', 'Fakultas Sains dan Matematika', '2024-10-18 22:43:09', '2024-10-18 22:43:09'),
(5, 'IN527', 'Informatika', 'Fakultas Sains dan Matematika', '2024-10-18 22:43:09', '2024-10-18 22:43:09'),
(6, 'BI811', 'Bioteknologi', 'Fakultas Sains dan Matematika', '2024-10-18 22:43:09', '2024-10-18 22:43:09');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Ketua Prodi', '2024-10-12 01:17:00', '2024-10-12 01:17:00'),
(2, 'Pembimbing Akademik', '2024-10-12 01:17:00', '2024-10-12 01:17:00'),
(3, 'Bagian Akademik', '2024-10-12 01:17:00', '2024-10-12 01:17:00'),
(4, 'Mahasiswa', '2024-10-12 01:17:00', '2024-10-12 01:17:00'),
(5, 'Dekan', '2024-10-12 01:17:00', '2024-10-12 01:17:00');

-- --------------------------------------------------------

--
-- Table structure for table `ruang_kelas`
--

CREATE TABLE `ruang_kelas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama_ruang` varchar(255) NOT NULL,
  `gedung` varchar(255) NOT NULL,
  `kuota` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ruang_kelas`
--

INSERT INTO `ruang_kelas` (`id`, `nama_ruang`, `gedung`, `kuota`, `created_at`, `updated_at`) VALUES
(83, 'A101', 'A', 47, '2024-10-18 22:14:50', '2024-10-18 22:14:50'),
(84, 'A102', 'A', 46, '2024-10-18 22:14:50', '2024-10-18 22:14:50'),
(85, 'A201', 'A', 49, '2024-10-18 22:14:50', '2024-10-18 22:14:50'),
(86, 'A202', 'A', 46, '2024-10-18 22:14:50', '2024-10-18 22:14:50'),
(87, 'A301', 'A', 47, '2024-10-18 22:14:50', '2024-10-18 22:14:50'),
(88, 'A302', 'A', 45, '2024-10-18 22:14:50', '2024-10-18 22:14:50'),
(89, 'B101', 'B', 46, '2024-10-18 22:15:22', '2024-10-18 22:15:22'),
(90, 'B102', 'B', 40, '2024-10-18 22:15:22', '2024-10-18 22:15:22'),
(91, 'B201', 'B', 42, '2024-10-18 22:15:22', '2024-10-18 22:15:22'),
(92, 'B202', 'B', 46, '2024-10-18 22:15:22', '2024-10-18 22:15:22'),
(93, 'B301', 'B', 45, '2024-10-18 22:15:22', '2024-10-18 22:15:22'),
(94, 'B302', 'B', 50, '2024-10-18 22:15:22', '2024-10-18 22:15:22'),
(95, 'C101', 'C', 43, '2024-10-18 22:16:23', '2024-10-18 22:16:23'),
(96, 'C102', 'C', 43, '2024-10-18 22:16:23', '2024-10-18 22:16:23'),
(97, 'C201', 'C', 50, '2024-10-18 22:16:23', '2024-10-18 22:16:23'),
(98, 'C202', 'C', 50, '2024-10-18 22:16:23', '2024-10-18 22:16:23'),
(99, 'C301', 'C', 47, '2024-10-18 22:16:23', '2024-10-18 22:16:23'),
(100, 'C302', 'C', 40, '2024-10-18 22:16:23', '2024-10-18 22:16:23'),
(101, 'D101', 'D', 49, '2024-10-18 22:16:28', '2024-10-18 22:16:28'),
(102, 'D102', 'D', 45, '2024-10-18 22:16:28', '2024-10-18 22:16:28'),
(103, 'D201', 'D', 41, '2024-10-18 22:16:29', '2024-10-18 22:16:29'),
(104, 'D202', 'D', 47, '2024-10-18 22:16:29', '2024-10-18 22:16:29'),
(105, 'D301', 'D', 45, '2024-10-18 22:16:29', '2024-10-18 22:16:29'),
(106, 'D302', 'D', 45, '2024-10-18 22:16:29', '2024-10-18 22:16:29'),
(107, 'E101', 'E', 49, '2024-10-18 22:16:34', '2024-10-18 22:16:34'),
(108, 'E102', 'E', 44, '2024-10-18 22:16:34', '2024-10-18 22:16:34'),
(109, 'E201', 'E', 44, '2024-10-18 22:16:34', '2024-10-18 22:16:34'),
(110, 'E202', 'E', 50, '2024-10-18 22:16:34', '2024-10-18 22:16:34'),
(111, 'E301', 'E', 41, '2024-10-18 22:16:34', '2024-10-18 22:16:34'),
(112, 'E302', 'E', 45, '2024-10-18 22:16:34', '2024-10-18 22:16:34'),
(113, 'F101', 'F', 49, '2024-10-18 22:16:42', '2024-10-18 22:16:42'),
(114, 'F102', 'F', 47, '2024-10-18 22:16:42', '2024-10-18 22:16:42'),
(115, 'F201', 'F', 43, '2024-10-18 22:16:42', '2024-10-18 22:16:42'),
(116, 'F202', 'F', 46, '2024-10-18 22:16:42', '2024-10-18 22:16:42'),
(117, 'F301', 'F', 45, '2024-10-18 22:16:42', '2024-10-18 22:16:42'),
(118, 'F302', 'F', 42, '2024-10-18 22:16:42', '2024-10-18 22:16:42'),
(119, 'G101', 'G', 47, '2024-10-18 22:16:49', '2024-10-18 22:16:49'),
(120, 'G102', 'G', 50, '2024-10-18 22:16:49', '2024-10-18 22:16:49'),
(121, 'G201', 'G', 48, '2024-10-18 22:16:49', '2024-10-18 22:16:49'),
(122, 'G202', 'G', 48, '2024-10-18 22:16:49', '2024-10-18 22:16:49'),
(123, 'G301', 'G', 42, '2024-10-18 22:16:49', '2024-10-18 22:16:49'),
(124, 'G302', 'G', 48, '2024-10-18 22:16:49', '2024-10-18 22:16:49'),
(125, 'H101', 'H', 43, '2024-10-18 22:17:06', '2024-10-18 22:17:06'),
(126, 'H102', 'H', 47, '2024-10-18 22:17:06', '2024-10-18 22:17:06'),
(127, 'H201', 'H', 41, '2024-10-18 22:17:06', '2024-10-18 22:17:06'),
(128, 'H202', 'H', 40, '2024-10-18 22:17:06', '2024-10-18 22:17:06'),
(129, 'H301', 'H', 41, '2024-10-18 22:17:06', '2024-10-18 22:17:06'),
(130, 'H302', 'H', 40, '2024-10-18 22:17:06', '2024-10-18 22:17:06'),
(131, 'I101', 'I', 44, '2024-10-18 22:21:24', '2024-10-18 22:21:24'),
(132, 'I102', 'I', 43, '2024-10-18 22:21:24', '2024-10-18 22:21:24'),
(133, 'I201', 'I', 50, '2024-10-18 22:21:24', '2024-10-18 22:21:24'),
(134, 'I202', 'I', 47, '2024-10-18 22:21:24', '2024-10-18 22:21:24'),
(135, 'I301', 'I', 48, '2024-10-18 22:21:24', '2024-10-18 22:21:24'),
(136, 'I302', 'I', 40, '2024-10-18 22:21:24', '2024-10-18 22:21:24'),
(137, 'J101', 'J', 50, '2024-10-18 22:21:31', '2024-10-18 22:21:31'),
(138, 'J102', 'J', 41, '2024-10-18 22:21:31', '2024-10-18 22:21:31'),
(139, 'J201', 'J', 49, '2024-10-18 22:21:31', '2024-10-18 22:21:31'),
(140, 'J202', 'J', 50, '2024-10-18 22:21:31', '2024-10-18 22:21:31'),
(141, 'J301', 'J', 42, '2024-10-18 22:21:31', '2024-10-18 22:21:31'),
(142, 'J302', 'J', 41, '2024-10-18 22:21:31', '2024-10-18 22:21:31'),
(143, 'K101', 'K', 42, '2024-10-18 22:21:36', '2024-10-18 22:21:36'),
(144, 'K102', 'K', 40, '2024-10-18 22:21:36', '2024-10-18 22:21:36'),
(145, 'K201', 'K', 50, '2024-10-18 22:21:36', '2024-10-18 22:21:36'),
(146, 'K202', 'K', 47, '2024-10-18 22:21:36', '2024-10-18 22:21:36'),
(147, 'K301', 'K', 48, '2024-10-18 22:21:36', '2024-10-18 22:21:36'),
(148, 'K302', 'K', 40, '2024-10-18 22:21:36', '2024-10-18 22:21:36');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('fDfCgiugMS08aE5ftIJlFEzInQpHELbcZBQCqi7o', 10, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiWE4yU1MxUGNkNG14V0tIVnpuazlrSVZyVVBjWEkyMnNZTnNhODd2UyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTA7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9EZWthbi9kYXNoYm9hcmQiO319', 1729323771);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `NIM_NIP` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `wali_id` bigint(20) UNSIGNED DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `NIM_NIP`, `status`, `wali_id`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'John Doe', 'john@example.com', '2024-10-06 08:43:24', '$2y$12$QkCbEXHRTfCeZO9tg6Axmuka3XHEDtPkFAjLKvklMMzk54DlsMKF2', '123456789', 'active', NULL, 'iSrkfep93gWPoQRPXdu8fm5bF3HQghSi6Q6JdfayJpi1dasGnhVilZWG1OYO', '2024-10-06 08:43:24', '2024-10-06 08:43:24'),
(10, 'Gigih Haidar Falah S.si M.si', 'dekan@example.com', '2024-10-12 01:28:16', '$2y$12$xQVBbNk7ahR3wzZQ0wMUs.bqxw32T4uJZUzx5G1nlLRSn5JzxSlfm', '19700001', 'active', NULL, 'gTb9aGFXpQptpToF0i1IMftT2c9Zi5xu2iFyrtTaQroS4nmMCIKAQr2Y9oF3', '2024-10-12 01:28:16', '2024-10-12 01:28:16'),
(11, 'Ketua Prodi', 'ketua@example.com', '2024-10-12 01:28:17', '$2y$12$1H.bsmCalvLSABz2a5pb1O42zGNw33ZPc.jAqZICeQgDaVpCc69le', '19700002', 'active', NULL, 'RiwmU43wKflQrj99tgCblVDCRiRzYBrgUYJpf2GDZwxDynEAdNDOsy7FOIYY', '2024-10-12 01:28:17', '2024-10-12 01:28:17'),
(12, 'Mahasiswa', 'mahasiswa@example.com', '2024-10-12 01:28:17', '$2y$12$//mgS0COqkw3P7qUZyYKLe7VbdMWxKIdALW62jIffqJ/.ERg6NEVW', '24000001', 'active', NULL, 'nICbl3cH8tP1Tzw9LF7xnrRDe54XZopdIkJ9XJWnl0NUy4o6hoygl5kah6Nb', '2024-10-12 01:28:17', '2024-10-12 01:28:17'),
(13, 'Bagian Akademik', 'BagianAkademik@example.com', '2024-10-12 03:16:46', '$2y$12$U9Rh7Lg7vK/UmcfAYo4WdOaipJ7HPpEQEVxGSV5JesAgfXxS/kPqu', '19700003', 'active', NULL, 'vGABJlDgot1KkqOHGwtueMNiIyK5Izxw20m3pEcyJGTM18DWCtzfZlNd2IYX', '2024-10-12 03:16:46', '2024-10-12 03:16:46'),
(14, 'Pembimbing Akademik', 'PembimbingAkademik@example.com', '2024-10-12 03:16:47', '$2y$12$0wY8JOeHrGS8FV3a1LNTwuPh8qiqOvjU0IY1yIhEjHGja/7wsw4yu', '19700004', 'active', NULL, 'WvvaQXx7xATwncvGIdfTKPhq3RPGYnKI0TJe6f0uhK2WciD2U0vCixYGIo9X', '2024-10-12 03:16:47', '2024-10-12 03:16:47'),
(18, 'Dekan Doswal', 'dekandoswal@example.com', '2024-10-12 20:13:02', '$2y$12$M/9FpLF2WEg2hktAkjgP8.rUFHvBeZpMXkv7fd7V87A89Ht1q4wjO', '19700005', 'active', NULL, 'ynDLipkUD7uHJGtMuznXRtaaSYomJoRepAtmj4wgykjRvy3jzWXNOtCUJAA1', '2024-10-12 20:13:02', '2024-10-12 20:13:02');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 10, 5, NULL, NULL),
(2, 11, 1, NULL, NULL),
(3, 12, 4, NULL, NULL),
(4, 13, 3, NULL, NULL),
(5, 14, 2, NULL, NULL),
(6, 18, 5, NULL, NULL),
(7, 18, 2, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mata_kuliah`
--
ALTER TABLE `mata_kuliah`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mata_kuliah_kode_mata_kuliah_unique` (`kode_mata_kuliah`),
  ADD KEY `mata_kuliah_program_studi_id_foreign` (`program_studi_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `program_studi`
--
ALTER TABLE `program_studi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `program_studi_kode_program_studi_unique` (`kode_program_studi`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ruang_kelas`
--
ALTER TABLE `ruang_kelas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_nim_nip_unique` (`NIM_NIP`),
  ADD KEY `users_wali_id_foreign` (`wali_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_roles_user_id_role_id_unique` (`user_id`,`role_id`),
  ADD KEY `user_roles_role_id_foreign` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mata_kuliah`
--
ALTER TABLE `mata_kuliah`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `program_studi`
--
ALTER TABLE `program_studi`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ruang_kelas`
--
ALTER TABLE `ruang_kelas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `mata_kuliah`
--
ALTER TABLE `mata_kuliah`
  ADD CONSTRAINT `mata_kuliah_program_studi_id_foreign` FOREIGN KEY (`program_studi_id`) REFERENCES `program_studi` (`kode_program_studi`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_wali_id_foreign` FOREIGN KEY (`wali_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_roles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
