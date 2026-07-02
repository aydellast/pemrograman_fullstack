-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 02 Jul 2026 pada 11.43
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cuppycash_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `budgets`
--

CREATE TABLE `budgets` (
  `id_budget` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `budgets`
--

INSERT INTO `budgets` (`id_budget`, `id_user`, `id_category`, `amount`, `start_date`, `end_date`, `created_at`, `updated_at`) VALUES
(1, 3, 1, 750000.00, '2026-05-01', '2026-05-31', '2026-05-02 13:44:07', '2026-05-02 13:47:01'),
(2, 13, 1, 500000000.00, '2026-07-01', '2026-07-30', '2026-07-02 05:02:17', '2026-07-02 05:02:17'),
(3, 14, 7, 400000.00, '2026-07-01', '2026-07-30', '2026-07-02 09:14:18', '2026-07-02 09:14:18');

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id_category` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` enum('Income','Expense') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id_category`, `name`, `type`, `created_at`, `updated_at`) VALUES
(1, 'Makanan', 'Expense', '2026-05-02 07:15:35', '2026-05-02 07:15:35'),
(2, 'Shopping', 'Expense', '2026-05-02 07:15:35', '2026-05-02 07:15:35'),
(7, 'Gaji', 'Income', '2026-07-02 05:20:02', '2026-07-02 05:20:02'),
(8, 'Kebutuhan Urgent', 'Expense', '2026-07-02 08:31:55', '2026-07-02 08:31:55'),
(9, 'Gaji Freelance', 'Income', '2026-07-02 09:20:06', '2026-07-02 09:20:06');

-- --------------------------------------------------------

--
-- Struktur dari tabel `saving_contributions`
--

CREATE TABLE `saving_contributions` (
  `id_contribution` int(11) NOT NULL,
  `id_goal` int(11) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `contribution_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `saving_goals`
--

CREATE TABLE `saving_goals` (
  `id_goal` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `goal_name` varchar(150) NOT NULL,
  `target_amount` decimal(15,2) NOT NULL,
  `current_amount` decimal(15,2) DEFAULT 0.00,
  `target_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id_transaction` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `transaction_date` date NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transactions`
--

INSERT INTO `transactions` (`id_transaction`, `id_user`, `id_category`, `amount`, `transaction_date`, `description`, `image_url`, `created_at`, `updated_at`) VALUES
(1, 3, 1, 50000.00, '2026-05-02', NULL, NULL, '2026-05-02 07:23:08', '2026-05-02 07:23:08'),
(2, 3, 1, 50000.00, '2026-05-02', NULL, NULL, '2026-05-02 07:23:12', '2026-05-02 07:23:12'),
(3, 13, 7, 7000000.00, '2026-06-30', 'gaji bulanan saya', NULL, '2026-07-02 07:36:16', '2026-07-02 07:36:30'),
(5, 13, 8, 400000.00, '2026-07-01', 'servis laptop', NULL, '2026-07-02 08:40:07', '2026-07-02 08:40:07'),
(6, 13, 2, 120000.00, '2026-06-25', 'makan sushi', 'bukti_pengeluaran-1782981635332-845921094.jpeg', '2026-07-02 08:40:35', '2026-07-02 08:40:35'),
(7, 14, 7, 8000000.00, '2026-07-01', 'gaji bulanan\n', NULL, '2026-07-02 09:17:04', '2026-07-02 09:17:04');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `foto_profil` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id_user`, `username`, `email`, `password`, `created_at`, `updated_at`, `foto_profil`) VALUES
(1, 'della', 'della@gmail.com', '$2b$10$O4K76E7fBAViuzb/lzA3HeJudsImGHJcAiFqZALLgTkXy5FTpYWKO', '2026-04-17 02:40:00', '2026-04-17 02:40:00', NULL),
(3, 'della2', 'della2@gmail.com', 'password123', '2026-05-02 06:17:10', '2026-05-02 06:17:10', NULL),
(5, 'della', 'della3@gmail.com', 'password123', '2026-05-24 09:31:52', '2026-05-24 09:31:52', NULL),
(6, 'della4', 'della4@gmail.com', '$2b$10$DHpP40KacJ/rG1ztD2IXSOvEqATn5az8bKG3mTJK387Pk/PWpXgmi', '2026-05-24 11:08:32', '2026-05-24 11:08:32', NULL),
(9, 'della5', 'della5@gmail.com', '123', '2026-06-03 19:40:11', '2026-06-03 19:40:11', NULL),
(10, 'rian', 'rian@gmail.com', '$2b$10$SDAq5/VfeMznDjh8/jnPCOUC6sw5Pei5LYWBkalt1dwrAhAZkky8m', '2026-06-03 21:25:54', '2026-06-03 21:25:54', NULL),
(11, 'jinja', 'jinja1@gmail.com', '$2b$10$3Q79vyAOONCLCYNLZyWRo.qD3cNIziXqvXO719PCkXmNlHJ3Eb3sW', '2026-07-01 08:49:12', '2026-07-01 08:49:12', NULL),
(12, 'jin', 'jin@gmail.vom', '$2b$10$p1pJzemTT1MTxbYpr1LVqOwjyfktATzxeZF/xGKYwXRpU1MSfgNIq', '2026-07-01 11:09:14', '2026-07-01 11:09:14', NULL),
(13, 'ryel', 'ryel@gmail.com', '$2b$10$0CNP/pHjU/71Kzdy8BC47etJe0xOErx02z76y/n68a3HGOheC2Jju', '2026-07-01 11:10:03', '2026-07-02 04:57:38', 'profile_picture-1782968258613-394525362.jpeg'),
(14, 'ryelryel', 'ryelryel@gmail.com', '$2b$12$QPX4Lq3keI1dUIHWac9FkeDC4VmkGy/gO2GTURUnS7K5fJqAaHY2y', '2026-07-02 09:12:24', '2026-07-02 09:12:24', NULL),
(15, 'indi', 'indi@gmail.com', '$2b$12$pMKdcea8SH3OIp6dFGIy0O9vwjXj2e3/x71xZjgKFBWl/mDqTfOEO', '2026-07-02 09:27:40', '2026-07-02 09:27:40', NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `budgets`
--
ALTER TABLE `budgets`
  ADD PRIMARY KEY (`id_budget`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_category` (`id_category`);

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_category`);

--
-- Indeks untuk tabel `saving_contributions`
--
ALTER TABLE `saving_contributions`
  ADD PRIMARY KEY (`id_contribution`),
  ADD KEY `id_goal` (`id_goal`);

--
-- Indeks untuk tabel `saving_goals`
--
ALTER TABLE `saving_goals`
  ADD PRIMARY KEY (`id_goal`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id_transaction`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_category` (`id_category`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `budgets`
--
ALTER TABLE `budgets`
  MODIFY `id_budget` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `saving_contributions`
--
ALTER TABLE `saving_contributions`
  MODIFY `id_contribution` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `saving_goals`
--
ALTER TABLE `saving_goals`
  MODIFY `id_goal` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id_transaction` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `budgets`
--
ALTER TABLE `budgets`
  ADD CONSTRAINT `budgets_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE,
  ADD CONSTRAINT `budgets_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id_category`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `saving_contributions`
--
ALTER TABLE `saving_contributions`
  ADD CONSTRAINT `saving_contributions_ibfk_1` FOREIGN KEY (`id_goal`) REFERENCES `saving_goals` (`id_goal`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `saving_goals`
--
ALTER TABLE `saving_goals`
  ADD CONSTRAINT `saving_goals_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id_category`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
