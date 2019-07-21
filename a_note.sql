-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Inang: 127.0.0.1
-- Waktu pembuatan: 20 Jun 2019 pada 06.42
-- Versi Server: 5.5.32
-- Versi PHP: 5.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Basis data: `a_note`
--
CREATE DATABASE IF NOT EXISTS `a_note` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `a_note`;

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`id`, `category`) VALUES
(1, 'Category 1'),
(2, 'Category 2');

-- --------------------------------------------------------

--
-- Struktur dari tabel `note`
--

CREATE TABLE IF NOT EXISTS `note` (
  `idNote` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `note` text NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `category` int(11) NOT NULL,
  PRIMARY KEY (`idNote`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data untuk tabel `note`
--

INSERT INTO `note` (`idNote`, `title`, `note`, `time`, `category`) VALUES
(1, 'note 1', 'note1 note1 note1 note1 note1', '2019-06-20 04:42:09', 1),
(2, 'note 2', 'note2 note2 note2 note2 note2', '2019-06-20 04:42:20', 2),
(4, 'note 3', 'note cors', '2019-06-20 04:42:24', 2),
(5, 'note 4', 'note cors', '2019-06-20 04:42:29', 2);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
