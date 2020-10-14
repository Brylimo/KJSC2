--`kjsc`
CREATE DATABSE kjsc;

-- Table structure for table `kjscUser`
CREATE TABLE `kjscUser` (
  `uid` int(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `userid` varchar(30) NOT NULL,
  `pwd` varchar(80) NOT NULL,
  PRIMARY KEY (`uid`)
);

-- Table structure for table `kjscComment`

CREATE TABLE `kjscComment` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `content` text,
  `created` datetime NOT NULL,
  `uid` int(11) NOT NULL,
  PRIMARY KEY (`cid`),
  CONSTRAINT FOREIGN KEY (`uid`) REFERENCES `kjscUser`(`uid`) ON DELETE CASCADE
);
