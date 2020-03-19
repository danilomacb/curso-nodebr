const ICrud = require("./interfaces/InterfaceCrud");
const Sequelize = require("sequelize");

class Postgres extends ICrud {
    constructor() {
        super();
        this._drive = null;
        this._herois = null;
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
        this._herois = this._driver.define(
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
        await this._herois.sync();
    }
    async create(item) {
        const { dataValues } = await this._herois.create(item);
        return dataValues;
    }
    async read(item = {}) {
        return this._herois.findAll({ where: item, raw: true });
    }
    async connect() {
        this._driver = new Sequelize("heroes", "danilomacb", "cafeforte", {
            host: "localhost",
            dialect: "postgres",
            quoteIdentifiers: false,
            operatorsAliases: false
        });
        await this.defineModel();
    }
}

module.exports = Postgres;