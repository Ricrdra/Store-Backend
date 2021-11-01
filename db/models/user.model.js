//Import required packages:
const { Model, DataTypes, Sequelize } = require("sequelize");
//Const which stores table name
const bcrypt = require("bcrypt");
const USER_TABLE = 'users';
//Config model schema --> <modelName>Schema

const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    recoveryToken: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'recovery_token',
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'costumer'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    },

}

//Class which refers to the model

class User extends Model {
    static associate(models) {
        this.hasOne(models.Customer, {
            as: "customer",
            foreignKey: 'userId'
        });
    }

    //Config model with a required sequelize instance

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false,
            hooks: {
                beforeCreate: async(user) => {
                    const password = await bcrypt.hash(user.password, 10);
                    user.password = password;
                },
            }
        }
    }
}

module.exports = { User, USER_TABLE, UserSchema };