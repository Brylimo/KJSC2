--`kjsc`
CREATE DATABSE kjsc;

-- Table structure for table `kjscComment`

CREATE TABLE `kjscComment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `name` varchar(20) NOT NULL,
  `content` text,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `kjscComment` VALUES (1,'MySQL','kim', 'MySQL is...', '2020-01-01 12:10:11');
INSERT INTO `kjscComment` VALUES (2,'Oracle', 'Lim', 'Oracle is ...','2020-01-03 13:01:10');

-- Table structure for table `kjscUser`
CREATE TABLE `kjscUser` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `userid` varchar(30) NOT NULL,
  `pwd` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `kjscUser` VALUES (1,'egoing','egoing', '111111');
INSERT INTO `kjscUser` VALUES (2,'admin', 'brylimo', 'ajouuniversity');

