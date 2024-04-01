
CREATE TABLE `tbl_empleados` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `edad` int(11) DEFAULT NULL,
  `cedula` varchar(255) DEFAULT NULL,
  `sexo` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `cargo` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tbl_empleados` (`id`, `nombre`, `edad`, `cedula`, `sexo`, `telefono`, `cargo`, `avatar`, `created_at`)
VALUES
	(1,'Urian',25,'5455455','','54544','Desarrollador Web','e2c572e7a9.jpg','2024-04-01 18:42:40'),
	(2,'Brenda',18,'21214','femenino','52225','Desarrollador Web','dd16dbb668.png','2024-04-01 18:43:05');