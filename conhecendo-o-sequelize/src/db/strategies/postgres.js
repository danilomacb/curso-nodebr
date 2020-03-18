const ICrud = require("./interfaces/InterfaceCrud");
const Sequelize = require("sequelize");

class Postgres extends ICrud {
    constructor() {
        super();
        this._drive = null;
        this._herois = null;
        this._connected();
    }
    async isConnected() {
        try {
            await this._driver.authenticate();
            return true;
        } catch (error) {
            console.error("fail", error);
            return false;
        }
    }
    async defineModel() {
        this._herois = driver.define(
            "herois",
            {
                id: {
                    type: Sequelize.INTEGER,
                    required: true,
                    primaryKey: true,
                    autoIncrement: true
                },
                nome: {
                    type: Sequelize.STRING,
                    required: true
                },
                poder: {
                    type: Sequelize.STRING,
                    required: true
                }
            },
            {
                tableName: "TB_HEROIS",
                freezeTableName: false,
                timestamps: false
            }
        );
        await Herois.sync();
    }
    create(item) {
        console.log("O item foi salvo em Postgres");
    }
    _connected() {
        this._driver = new Sequelize("heroes", "danilomacb", "cafeforte", {
            host: "localhost",
            dialect: "postgres",
            quoteIdentifiers: false,
            operatorsAliases: false
        });
    }
}

module.exports = Postgres;
