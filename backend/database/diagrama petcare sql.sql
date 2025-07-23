-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema petcaredatabase
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema petcaredatabase
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `petcaredatabase` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`table1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`table1` ;

CREATE TABLE IF NOT EXISTS `mydb`.`table1` (
)
ENGINE = InnoDB;

USE `petcaredatabase` ;

-- -----------------------------------------------------
-- Table `petcaredatabase`.`datos_de_propietario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `petcaredatabase`.`datos_de_propietario` ;

CREATE TABLE IF NOT EXISTS `petcaredatabase`.`datos_de_propietario` (
  `DueñoTitular1` VARCHAR(255) NOT NULL,
  `DueñoTitular2` VARCHAR(255) NOT NULL,
  `Dueño_ID` INT NOT NULL,
  `Nacimiento` DATE NULL DEFAULT NULL,
  `Direccion` TEXT NULL DEFAULT NULL,
  `status` VARCHAR(100) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `Animal_ID` INT NOT NULL,
  PRIMARY KEY (`DueñoTitular1`, `DueñoTitular2`, `Dueño_ID`),
  INDEX `Dueño_ID_idx` (`Dueño_ID` ASC) VISIBLE,
  CONSTRAINT `Animal_ID`
    FOREIGN KEY ()
    REFERENCES `petcaredatabase`.`datos_de_animal` ()
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Dueño_ID`
    FOREIGN KEY (`Dueño_ID`)
    REFERENCES `petcaredatabase`.`datos_de_propietario` (`Animal_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `petcaredatabase`.`datos_de_animal`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `petcaredatabase`.`datos_de_animal` ;

CREATE TABLE IF NOT EXISTS `petcaredatabase`.`datos_de_animal` (
  `Nombre` VARCHAR(255) NULL DEFAULT NULL,
  `Animal_ID` INT(55) UNSIGNED NOT NULL,
  `Especie` VARCHAR(100) NULL DEFAULT NULL,
  `Genero` VARCHAR(50) NULL DEFAULT NULL,
  `Chip_N` INT NOT NULL,
  `Senas_Particulares` FLOAT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `Fecha_de_Nacimiento` TIMESTAMP NULL DEFAULT NULL,
  `datos_de_propietario_NombreApellido` VARCHAR(255) NOT NULL,
  `datos_de_propietario_Animal_ID` INT UNSIGNED NOT NULL,
  `datos_de_animal_datos_de_propietario_NombreApellido` VARCHAR(255) NOT NULL,
  `datos_de_animal_datos_de_propietario_Animal_ID` INT UNSIGNED NOT NULL,
  UNIQUE INDEX `Animal_ID` (`Animal_ID` ASC) VISIBLE,
  PRIMARY KEY (`datos_de_propietario_NombreApellido`, `datos_de_propietario_Animal_ID`, `datos_de_animal_datos_de_propietario_NombreApellido`, `datos_de_animal_datos_de_propietario_Animal_ID`),
  INDEX `fk_datos_de_animal_datos_de_animal1_idx` (`datos_de_animal_datos_de_propietario_NombreApellido` ASC, `datos_de_animal_datos_de_propietario_Animal_ID` ASC) VISIBLE,
  CONSTRAINT `fk_datos_de_animal_datos_de_propietario1`
    FOREIGN KEY (`datos_de_propietario_NombreApellido` , `datos_de_propietario_Animal_ID`)
    REFERENCES `petcaredatabase`.`datos_de_propietario` (`DueñoTitular1` , `Animal_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_datos_de_animal_datos_de_animal1`
    FOREIGN KEY (`datos_de_animal_datos_de_propietario_NombreApellido` , `datos_de_animal_datos_de_propietario_Animal_ID`)
    REFERENCES `petcaredatabase`.`datos_de_animal` (`datos_de_propietario_NombreApellido` , `datos_de_propietario_Animal_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `petcaredatabase`.`Motivo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `petcaredatabase`.`Motivo` ;

CREATE TABLE IF NOT EXISTS `petcaredatabase`.`Motivo` (
  `Control General` INT NOT NULL,
  `Desparacitaciones` VARCHAR(45) NOT NULL,
  `Intervenciones Quirurgicas` VARCHAR(45) NOT NULL,
  `Test Diagnostico` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Control General`, `Desparacitaciones`, `Intervenciones Quirurgicas`, `Test Diagnostico`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `petcaredatabase`.`Turnos del Dia`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `petcaredatabase`.`Turnos del Dia` ;

CREATE TABLE IF NOT EXISTS `petcaredatabase`.`Turnos del Dia` (
  `idTurnos 1` INT(255) NOT NULL,
  `idTurnos 2` INT(255) NOT NULL,
  `idTurnos 3` INT(255) NOT NULL,
  `idTurnos 4` INT(50) NOT NULL,
  `idTurnos 5` INT(50) NOT NULL,
  `idTurnos 6` INT(50) NOT NULL,
  `idTurnos 7` INT(50) NOT NULL,
  `idTurnos 8` INT(50) NOT NULL,
  `idTurnos 9` INT(50) NOT NULL,
  `idTurnos 10` INT(50) NOT NULL,
  `idTurno 11` INT(50) NOT NULL,
  `idTurno 12` INT(50) NOT NULL,
  `datos_de_propietario_NombreApellido` VARCHAR(255) NOT NULL,
  `datos_de_propietario_Animal_ID` INT NOT NULL,
  `Motivo_Control General` INT NOT NULL,
  `Motivo_Desparacitaciones` VARCHAR(45) NOT NULL,
  `Motivo_Intervenciones Quirurgicas` VARCHAR(45) NOT NULL,
  `Motivo_Test Diagnostico` VARCHAR(45) NOT NULL,
  INDEX `fk_Turnos_datos_de_propietario1_idx` (`datos_de_propietario_NombreApellido` ASC, `datos_de_propietario_Animal_ID` ASC) VISIBLE,
  PRIMARY KEY (`Motivo_Control General`, `Motivo_Desparacitaciones`, `Motivo_Intervenciones Quirurgicas`, `Motivo_Test Diagnostico`),
  CONSTRAINT `fk_Turnos_datos_de_propietario1`
    FOREIGN KEY (`datos_de_propietario_NombreApellido` , `datos_de_propietario_Animal_ID`)
    REFERENCES `petcaredatabase`.`datos_de_propietario` (`DueñoTitular1` , `Animal_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Turnos del Dia_Motivo1`
    FOREIGN KEY (`Motivo_Control General` , `Motivo_Desparacitaciones` , `Motivo_Intervenciones Quirurgicas` , `Motivo_Test Diagnostico`)
    REFERENCES `petcaredatabase`.`Motivo` (`Control General` , `Desparacitaciones` , `Intervenciones Quirurgicas` , `Test Diagnostico`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
