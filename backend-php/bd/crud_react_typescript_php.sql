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
	(2,'Brenda',18,'21214','femenino','52225','Desarrollador Web','dd16dbb668.png','2024-04-01 18:43:05'),
	(3,'Braudin',41,'434444','masculino','122222','Desarrollador FrontEnd','1c1a065aa1.png','2024-04-01 18:54:00'),
	(15,'Mario',25,'5435','femenino','34545','Desarrollador Web','b89990a943.jpg','2024-04-02 10:31:08'),
	(16,'Carlos',28,'2333','femenino','4141','Desarrollador BackEnd','583da5a5a4.jpg','2024-04-02 10:33:39'),
	(17,'Uriany',22,'4324','femenino','234','Desarrollador Web','beeefe7101.png','2024-04-02 10:35:36'),
	(22,'Felipe',28,'2333','femenino','4141','Desarrollador BackEnd','60a31b54da.png','2024-04-06 15:59:30'),
	(23,'Deyna Castellano',25,'2333','femenino','4141','Desarrollador BackEnd','d0064870f0.jpg','2024-04-06 16:01:21');