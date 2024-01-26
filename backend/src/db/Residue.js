import { DataTypes } from "sequelize";
import sequelize from "./connection.js";

const Residue = sequelize.define('Residue', {
    id: {
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    preparationResidues: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    plateRemainsResidues: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    counterRemainsResidues: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    preparedFood: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    }
})

await Residue.sync()
console.log('Residue sync')

export default Residue;