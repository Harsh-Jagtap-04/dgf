use dgf_dummy;

-- 1. Course Table
CREATE TABLE `course` (
  `course_id` int NOT NULL AUTO_INCREMENT,
  `course_name` varchar(255) NOT NULL,
  `course_description` text,
  `duration_hours` int DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- First, add an index to optimize course name searches (optional but recommended)
ALTER TABLE `course` ADD INDEX `idx_course_name` (`course_name`);

-- IT Courses
INSERT INTO `course` (`course_name`, `course_description`, `duration_hours`) VALUES
('IT Fundamentals', 'Introduction to core IT concepts and infrastructure', 40),
('Network Security', 'Cybersecurity essentials and network protection', 30),
('Cloud Computing Basics', 'Introduction to AWS/Azure cloud platforms', 25);

-- Communication Courses
INSERT INTO `course` (`course_name`, `course_description`, `duration_hours`) VALUES
('Business Communication', 'Professional writing and presentation skills', 20),
('Cross-Cultural Communication', 'Effective communication in global teams', 15),
('Conflict Resolution', 'Workplace negotiation and mediation techniques', 10);

-- 2. Course Type Table
CREATE TABLE `course_type` (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) NOT NULL,
  `type_description` text,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `course_type` (`type_name`, `type_description`) VALUES
('Udemy', 'Online learning platform with various courses'),
('Sprinkle Zone', 'Internal training platform/resources'),
('YouTube', 'Video-based learning content'),
('Third Party', 'External training providers/courses');

-- 3. Assigned Courses Table
CREATE TABLE `assigned_courses` (
  `assignment_id` int NOT NULL AUTO_INCREMENT,
  `requestid` int NOT NULL,
  `employee_id` varchar(100) NOT NULL,
  `mentor_id` varchar(100) NOT NULL,
  `course_id` int NOT NULL,
  `coursetype_id` int NOT NULL,
  `completion_date` date DEFAULT NULL,
  `comments` text,
  `assigned_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`assignment_id`),
  KEY `requestid` (`requestid`),
  KEY `employee_id` (`employee_id`),
  KEY `mentor_id` (`mentor_id`),
  KEY `course_id` (`course_id`),
  KEY `coursetype_id` (`coursetype_id`),
  CONSTRAINT `assigned_courses_ibfk_1` FOREIGN KEY (`requestid`) REFERENCES `newtrainingrequest` (`requestid`) ON DELETE CASCADE,
  CONSTRAINT `assigned_courses_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`emp_id`),
  CONSTRAINT `assigned_courses_ibfk_3` FOREIGN KEY (`mentor_id`) REFERENCES `employee` (`emp_id`),
  CONSTRAINT `assigned_courses_ibfk_4` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  CONSTRAINT `assigned_courses_ibfk_5` FOREIGN KEY (`coursetype_id`) REFERENCES `course_type` (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;