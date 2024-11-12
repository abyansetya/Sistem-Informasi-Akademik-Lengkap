-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 12, 2024 at 01:44 PM
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
-- Table structure for table `alokasi_ruangan`
--

CREATE TABLE `alokasi_ruangan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `program_studi_id` varchar(255) NOT NULL,
  `ruang_kelas_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('pending','onprocess','approved','rejected') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
('doswal@example.com|127.0.0.1', 'i:2;', 1729330567),
('doswal@example.com|127.0.0.1:timer', 'i:1729330567;', 1729330567),
('fufufafa@gmal.com|127.0.0.1', 'i:1;', 1728720364),
('fufufafa@gmal.com|127.0.0.1:timer', 'i:1728720364;', 1728720364),
('mahasisswa@example.com|127.0.0.1', 'i:1;', 1728721822),
('mahasisswa@example.com|127.0.0.1:timer', 'i:1728721822;', 1728721822),
('pembimbingakademik@gmail.com|127.0.0.1', 'i:1;', 1729335838),
('pembimbingakademik@gmail.com|127.0.0.1:timer', 'i:1729335838;', 1729335838);

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
-- Table structure for table `dosen_mk`
--

CREATE TABLE `dosen_mk` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `NIP` varchar(255) NOT NULL,
  `kode_mata_kuliah` varchar(255) NOT NULL,
  `tahun` int(11) NOT NULL,
  `semester` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
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
-- Table structure for table `jadwal_kuliah`
--

CREATE TABLE `jadwal_kuliah` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `hari` varchar(255) NOT NULL,
  `waktu_mulai` time NOT NULL,
  `waktu_selesai` time NOT NULL,
  `nama_ruang` varchar(255) NOT NULL,
  `id_kelas` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
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
-- Table structure for table `kalender_akademik`
--

CREATE TABLE `kalender_akademik` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tanggal_mulai` date DEFAULT NULL,
  `tanggal_selesai` date DEFAULT NULL,
  `kode_program_studi` varchar(255) DEFAULT NULL,
  `fakultas` varchar(255) DEFAULT NULL,
  `tahun_akademik` varchar(255) DEFAULT NULL,
  `keterangan` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kode_kelas` char(255) NOT NULL,
  `kode_mata_kuliah` varchar(255) NOT NULL,
  `tahun` int(11) NOT NULL,
  `semester` varchar(255) NOT NULL,
  `kuota` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `nim` varchar(255) NOT NULL,
  `wali_id` bigint(20) UNSIGNED DEFAULT NULL,
  `angkatan` year(4) NOT NULL,
  `semester` int(11) NOT NULL,
  `sks` int(11) NOT NULL,
  `ipk` decimal(3,2) NOT NULL,
  `jumlah_sks` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `program_studi_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mahasiswa`
--

INSERT INTO `mahasiswa` (`nim`, `wali_id`, `angkatan`, `semester`, `sks`, `ipk`, `jumlah_sks`, `created_at`, `updated_at`, `program_studi_id`) VALUES
('24000001', 14, '2022', 5, 21, 3.79, 84, '2024-10-26 07:26:28', '2024-10-26 07:26:28', 'IN527');

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
(11, '2024_10_19_055419_create_matakuliah_table', 5),
(12, '2024_10_22_095312_create_alokasi_ruangan_tabel', 6),
(13, '2024_10_26_141825_create_mahasiswa_table', 7),
(14, '2024_11_09_133533_create_alokasi_ruangan_table', 8),
(15, '2024_11_09_134123_create_mata_kuliah_table', 9),
(16, '2024_11_09_134419_create_mata_kuliah_table', 10),
(17, '2024_11_09_134423_create_alokasi_ruangan_table', 10),
(18, '2024_11_09_141639_create_kelas_table', 11),
(19, '2024_11_11_095836_create_kalender_akademik_table', 12),
(20, '2024_11_11_100510_create_dosen_mk_table', 13);

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
(7, 'A1272', 'Bioteknologi', 'FSM', '2024-11-11 23:28:05', '2024-11-11 23:28:05');

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
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `program_studi_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ruang_kelas`
--

INSERT INTO `ruang_kelas` (`id`, `nama_ruang`, `gedung`, `kuota`, `created_at`, `updated_at`, `status`, `program_studi_id`) VALUES
(88, 'A302', 'A', 45, '2024-10-18 22:14:50', '2024-10-21 10:29:16', 'Disetujui', NULL),
(89, 'B101', 'B', 46, '2024-10-18 22:15:22', '2024-10-21 10:29:50', 'Disetujui', NULL),
(90, 'B102', 'B', 40, '2024-10-18 22:15:22', '2024-10-21 10:38:01', 'Disetujui', NULL),
(91, 'B201', 'B', 42, '2024-10-18 22:15:22', '2024-10-21 10:38:11', 'Disetujui', NULL),
(92, 'B202', 'B', 46, '2024-10-18 22:15:22', '2024-10-21 10:45:07', 'Disetujui', NULL),
(93, 'B301', 'B', 45, '2024-10-18 22:15:22', '2024-10-21 10:46:41', 'Disetujui', NULL),
(94, 'B302', 'B', 50, '2024-10-18 22:15:22', '2024-10-21 10:46:56', 'Disetujui', NULL),
(95, 'C101', 'C', 43, '2024-10-18 22:16:23', '2024-10-21 10:46:58', 'Disetujui', NULL),
(96, 'C102', 'C', 43, '2024-10-18 22:16:23', '2024-10-21 10:47:06', 'Disetujui', NULL),
(97, 'C201', 'C', 50, '2024-10-18 22:16:23', '2024-10-21 10:57:02', 'Disetujui', NULL),
(98, 'C202', 'C', 50, '2024-10-18 22:16:23', '2024-10-21 10:57:05', 'Disetujui', NULL),
(99, 'C301', 'C', 47, '2024-10-18 22:16:23', '2024-10-18 22:16:23', NULL, NULL),
(100, 'C302', 'C', 40, '2024-10-18 22:16:23', '2024-10-18 22:16:23', NULL, NULL),
(101, 'D101', 'D', 49, '2024-10-18 22:16:28', '2024-10-18 22:16:28', NULL, NULL),
(102, 'D102', 'D', 45, '2024-10-18 22:16:28', '2024-10-18 22:16:28', NULL, NULL),
(103, 'D201', 'D', 41, '2024-10-18 22:16:29', '2024-10-18 22:16:29', NULL, NULL),
(104, 'D202', 'D', 47, '2024-10-18 22:16:29', '2024-10-18 22:16:29', NULL, NULL),
(105, 'D301', 'D', 45, '2024-10-18 22:16:29', '2024-10-18 22:16:29', NULL, NULL),
(106, 'D302', 'D', 45, '2024-10-18 22:16:29', '2024-10-18 22:16:29', NULL, NULL),
(107, 'E101', 'E', 49, '2024-10-18 22:16:34', '2024-10-18 22:16:34', NULL, NULL),
(108, 'E102', 'E', 44, '2024-10-18 22:16:34', '2024-10-18 22:16:34', NULL, NULL),
(109, 'E201', 'E', 44, '2024-10-18 22:16:34', '2024-10-18 22:16:34', NULL, NULL),
(110, 'E202', 'E', 50, '2024-10-18 22:16:34', '2024-10-18 22:16:34', NULL, NULL),
(111, 'E301', 'E', 41, '2024-10-18 22:16:34', '2024-10-18 22:16:34', NULL, NULL),
(112, 'E302', 'E', 45, '2024-10-18 22:16:34', '2024-10-18 22:16:34', NULL, NULL),
(113, 'F101', 'F', 49, '2024-10-18 22:16:42', '2024-10-18 22:16:42', NULL, NULL),
(114, 'F102', 'F', 47, '2024-10-18 22:16:42', '2024-10-18 22:16:42', NULL, NULL),
(115, 'F201', 'F', 43, '2024-10-18 22:16:42', '2024-10-18 22:16:42', NULL, NULL),
(116, 'F202', 'F', 46, '2024-10-18 22:16:42', '2024-10-18 22:16:42', NULL, NULL),
(117, 'F301', 'F', 45, '2024-10-18 22:16:42', '2024-10-18 22:16:42', NULL, NULL),
(118, 'F302', 'F', 42, '2024-10-18 22:16:42', '2024-10-18 22:16:42', NULL, NULL),
(119, 'G101', 'G', 47, '2024-10-18 22:16:49', '2024-10-18 22:16:49', NULL, NULL),
(120, 'G102', 'G', 50, '2024-10-18 22:16:49', '2024-10-18 22:16:49', NULL, NULL),
(121, 'G201', 'G', 48, '2024-10-18 22:16:49', '2024-10-18 22:16:49', NULL, NULL),
(122, 'G202', 'G', 48, '2024-10-18 22:16:49', '2024-10-18 22:16:49', NULL, NULL),
(123, 'G301', 'G', 42, '2024-10-18 22:16:49', '2024-10-18 22:16:49', NULL, NULL),
(124, 'G302', 'G', 48, '2024-10-18 22:16:49', '2024-10-18 22:16:49', NULL, NULL),
(125, 'H101', 'H', 43, '2024-10-18 22:17:06', '2024-10-18 22:17:06', NULL, NULL),
(126, 'H102', 'H', 47, '2024-10-18 22:17:06', '2024-10-18 22:17:06', NULL, NULL),
(127, 'H201', 'H', 41, '2024-10-18 22:17:06', '2024-10-18 22:17:06', NULL, NULL),
(128, 'H202', 'H', 40, '2024-10-18 22:17:06', '2024-10-18 22:17:06', NULL, NULL),
(129, 'H301', 'H', 41, '2024-10-18 22:17:06', '2024-10-18 22:17:06', NULL, NULL),
(130, 'H302', 'H', 40, '2024-10-18 22:17:06', '2024-10-18 22:17:06', NULL, NULL),
(131, 'I101', 'I', 44, '2024-10-18 22:21:24', '2024-10-18 22:21:24', NULL, NULL),
(132, 'I102', 'I', 43, '2024-10-18 22:21:24', '2024-10-18 22:21:24', NULL, NULL),
(133, 'I201', 'I', 50, '2024-10-18 22:21:24', '2024-10-18 22:21:24', NULL, NULL),
(134, 'I202', 'I', 47, '2024-10-18 22:21:24', '2024-10-18 22:21:24', NULL, NULL),
(135, 'I301', 'I', 48, '2024-10-18 22:21:24', '2024-10-18 22:21:24', NULL, NULL),
(136, 'I302', 'I', 40, '2024-10-18 22:21:24', '2024-10-18 22:21:24', NULL, NULL),
(137, 'J101', 'J', 50, '2024-10-18 22:21:31', '2024-10-18 22:21:31', NULL, NULL),
(138, 'J102', 'J', 41, '2024-10-18 22:21:31', '2024-10-18 22:21:31', NULL, NULL),
(139, 'J201', 'J', 49, '2024-10-18 22:21:31', '2024-10-18 22:21:31', NULL, NULL),
(140, 'J202', 'J', 50, '2024-10-18 22:21:31', '2024-10-18 22:21:31', NULL, NULL),
(141, 'J301', 'J', 42, '2024-10-18 22:21:31', '2024-10-18 22:21:31', NULL, NULL),
(142, 'J302', 'J', 41, '2024-10-18 22:21:31', '2024-10-18 22:21:31', NULL, NULL),
(143, 'K101', 'K', 42, '2024-10-18 22:21:36', '2024-10-18 22:21:36', NULL, NULL),
(144, 'K102', 'K', 40, '2024-10-18 22:21:36', '2024-10-18 22:21:36', NULL, NULL),
(145, 'K201', 'K', 50, '2024-10-18 22:21:36', '2024-10-18 22:21:36', NULL, NULL),
(146, 'K202', 'K', 47, '2024-10-18 22:21:36', '2024-10-18 22:21:36', NULL, NULL),
(147, 'K301', 'K', 48, '2024-10-18 22:21:36', '2024-10-18 22:21:36', NULL, NULL),
(148, 'K302', 'K', 40, '2024-10-18 22:21:36', '2024-10-18 22:21:36', NULL, NULL);

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
('bJqzclJORaY2zkA8fjkyMLKPh0dU5aS7RKhxvnnx', 13, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiSTlmdmhRSFBEZU9zSFdOTjNTQVlFelJ5MHVVNGcycmNPZlFIODNIdSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9CYWdpYW5Ba2FkZW1pay9LZWxvbGFQcm9ncmFtU3R1ZGkiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxMztzOjEzOiJzZWxlY3RlZF9yb2xlIjtzOjE1OiJCYWdpYW4gQWthZGVtaWsiO30=', 1731160843),
('BVbIqL7daJ9WvC6d1x5Dnm88E1T2jnYm0TUmszsJ', 13, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiTld1SWwyQnN5cU9jUWNSVTJrWDlDNTFBMHUybjZsV2swcDI5Vm1tYSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTM7czoxMzoic2VsZWN0ZWRfcm9sZSI7czoxNToiQmFnaWFuIEFrYWRlbWlrIjtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo1NToiaHR0cDovLzEyNy4wLjAuMTo4MDAwL0JhZ2lhbkFrYWRlbWlrL0tlbG9sYVByb2dyYW1TdHVkaSI7fX0=', 1731394822),
('pig11jPwPUdzpkN1yeho3sUenC9G53rTvBY5ekoX', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ1ZETXI1S0FsTm5ZWmJBYlhpdkxQNHdJTzJpV25RdmpDSjNWY2kweSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1731392339),
('qePh6A7GpAfCpKGXvFpa9R7zEbOmOS5kYzf46EZd', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiVmdoZUxzUWhZM0tKV2ViNHdNaVE5c0p6SkxydnZqUmlHQWlJSU9mTCI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo1NToiaHR0cDovLzEyNy4wLjAuMTo4MDAwL0JhZ2lhbkFrYWRlbWlrL0tlbG9sYVByb2dyYW1TdHVkaSI7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjI3OiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvbG9naW4iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1731169786),
('ROe4wyggn16ttUhh5JxHju4flid3Rfq1clAHgQzb', 12, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiQmg4aUtKTGUyT0h3ejRuTWVKRDZ1b2RwTVdJMnFKbmZ5eUp6WmxGTSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjEyO3M6MTM6InNlbGVjdGVkX3JvbGUiO3M6OToiTWFoYXNpc3dhIjt9', 1731319065),
('ZwZeqJ14Fv98NOfpVxRjED5SbfuCGEMW9cb1YQuD', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiWFp6SGRGVUpVamllYXFPRm80OFBSVHRQTzVHZDVZRkpYY2xxVXdHQSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1731248048);

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
(10, 'Gigih Haidar Falah S.si M.si', 'dekan@example.com', '2024-10-12 01:28:16', '$2y$12$xQVBbNk7ahR3wzZQ0wMUs.bqxw32T4uJZUzx5G1nlLRSn5JzxSlfm', '19700001', 'active', NULL, 'FNc7zr7OMGJZhEs0S2FKLdiErPiGsjanqeTC04I3865FwnnHKJ6cQjACxpff', '2024-10-12 01:28:16', '2024-10-12 01:28:16'),
(11, 'Ketua Prodi', 'ketua@example.com', '2024-10-12 01:28:17', '$2y$12$1H.bsmCalvLSABz2a5pb1O42zGNw33ZPc.jAqZICeQgDaVpCc69le', '19700002', 'active', NULL, 'WBvkX21hn59ajsR28TqX55YfU3vMMwhZDEWCvzBL8BqNwJQ4IGqza8vzKlyq', '2024-10-12 01:28:17', '2024-10-12 01:28:17'),
(12, 'Abyan Setyaneva', 'mahasiswa@example.com', '2024-10-12 01:28:17', '$2y$12$//mgS0COqkw3P7qUZyYKLe7VbdMWxKIdALW62jIffqJ/.ERg6NEVW', '24000001', 'active', NULL, 'Z7p1hpkSTJe8irSB33SNipLz4tqHwqV7MVZKSu1rsqfFnzg1Nytyej3e6oqY', '2024-10-12 01:28:17', '2024-10-12 01:28:17'),
(13, 'Bagian Akademik', 'BagianAkademik@example.com', '2024-10-12 03:16:46', '$2y$12$U9Rh7Lg7vK/UmcfAYo4WdOaipJ7HPpEQEVxGSV5JesAgfXxS/kPqu', '19700003', 'active', NULL, 'LDeo2zFNr0aWMNntNcaGKp5Jwauxfp8pBHlpthQ9LorDPCJUhLNU60SPttwX', '2024-10-12 03:16:46', '2024-10-12 03:16:46'),
(14, 'Dr. Sutikno S.T., M.CS.', 'PembimbingAkademik@example.com', '2024-10-12 03:16:47', '$2y$12$0wY8JOeHrGS8FV3a1LNTwuPh8qiqOvjU0IY1yIhEjHGja/7wsw4yu', '19700004', 'active', NULL, 'm3zZ5AgguMwYURThZeunYrkqhbhaV23K7D4lJqtmywENj6rhaiqhsANKvSjb', '2024-10-12 03:16:47', '2024-10-12 03:16:47'),
(18, 'Dekan Doswal', 'dekandoswal@example.com', '2024-10-12 20:13:02', '$2y$12$M/9FpLF2WEg2hktAkjgP8.rUFHvBeZpMXkv7fd7V87A89Ht1q4wjO', '19700005', 'active', NULL, 'OPGxY4OVonSdwkG3llse5V7fFgnpFEkttgid3wuZKO5nJ6shQCYA8Zvfn2On', '2024-10-12 20:13:02', '2024-10-12 20:13:02'),
(19, 'mhs perwalian', 'mhsperwalian@example.com', '2024-10-26 06:26:37', '$2y$12$NbOflPUqa6zasZQ80TL7He9oxbBr.HJqoLB0AQSKkqmvtNaC1KwtG', '24000002', 'active', 14, 'z6axOmm9BuAjofnDc6D9HOuJp1P0kLG1wIBvg6V4OCB9bCDAhBfpTuVVhesA', '2024-10-26 06:26:37', '2024-10-26 06:26:37');

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
(7, 18, 2, NULL, NULL),
(8, 19, 4, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alokasi_ruangan`
--
ALTER TABLE `alokasi_ruangan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `alokasi_ruangan_program_studi_id_foreign` (`program_studi_id`),
  ADD KEY `alokasi_ruangan_ruang_kelas_id_foreign` (`ruang_kelas_id`);

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
-- Indexes for table `dosen_mk`
--
ALTER TABLE `dosen_mk`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dosen_mk_nip_foreign` (`NIP`),
  ADD KEY `dosen_mk_kode_mata_kuliah_foreign` (`kode_mata_kuliah`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jadwal_kuliah`
--
ALTER TABLE `jadwal_kuliah`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `kalender_akademik`
--
ALTER TABLE `kalender_akademik`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kalender_akademik_kode_program_studi_foreign` (`kode_program_studi`);

--
-- Indexes for table `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kelas_kode_mata_kuliah_foreign` (`kode_mata_kuliah`);

--
-- Indexes for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`nim`),
  ADD KEY `mahasiswa_wali_id_foreign` (`wali_id`);

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
-- AUTO_INCREMENT for table `alokasi_ruangan`
--
ALTER TABLE `alokasi_ruangan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `dosen_mk`
--
ALTER TABLE `dosen_mk`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jadwal_kuliah`
--
ALTER TABLE `jadwal_kuliah`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kalender_akademik`
--
ALTER TABLE `kalender_akademik`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mata_kuliah`
--
ALTER TABLE `mata_kuliah`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `program_studi`
--
ALTER TABLE `program_studi`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ruang_kelas`
--
ALTER TABLE `ruang_kelas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alokasi_ruangan`
--
ALTER TABLE `alokasi_ruangan`
  ADD CONSTRAINT `alokasi_ruangan_program_studi_id_foreign` FOREIGN KEY (`program_studi_id`) REFERENCES `program_studi` (`kode_program_studi`) ON DELETE CASCADE,
  ADD CONSTRAINT `alokasi_ruangan_ruang_kelas_id_foreign` FOREIGN KEY (`ruang_kelas_id`) REFERENCES `ruang_kelas` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `dosen_mk`
--
ALTER TABLE `dosen_mk`
  ADD CONSTRAINT `dosen_mk_kode_mata_kuliah_foreign` FOREIGN KEY (`kode_mata_kuliah`) REFERENCES `mata_kuliah` (`kode_mata_kuliah`) ON DELETE CASCADE,
  ADD CONSTRAINT `dosen_mk_nip_foreign` FOREIGN KEY (`NIP`) REFERENCES `users` (`NIM_NIP`) ON DELETE CASCADE;

--
-- Constraints for table `kalender_akademik`
--
ALTER TABLE `kalender_akademik`
  ADD CONSTRAINT `kalender_akademik_kode_program_studi_foreign` FOREIGN KEY (`kode_program_studi`) REFERENCES `program_studi` (`kode_program_studi`) ON DELETE CASCADE;

--
-- Constraints for table `kelas`
--
ALTER TABLE `kelas`
  ADD CONSTRAINT `kelas_kode_mata_kuliah_foreign` FOREIGN KEY (`kode_mata_kuliah`) REFERENCES `mata_kuliah` (`kode_mata_kuliah`) ON DELETE CASCADE;

--
-- Constraints for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD CONSTRAINT `mahasiswa_nim_foreign` FOREIGN KEY (`nim`) REFERENCES `users` (`NIM_NIP`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `mahasiswa_wali_id_foreign` FOREIGN KEY (`wali_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

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
