const { MongoClient } = require('mongodb');
const Logger = require('../utils/Logger');

const uri = "mongodb://localhost:27017";
const dbName = "webindexer";

class Database {
  constructor() {
    this.client = new MongoClient(uri);
    this.db = null;
  }

  async connect() {
    try {
      await this.client.connect();
      console.log(" Conectado ao MongoDB.");
      this.db = this.client.db(dbName);
    } catch (err) {
      Logger.logError(err);
      console.error(" Falha ao conectar ao MongoDB:", err.message);
    }
  }

  getDb() {
    if (!this.db) {
      const error = new Error("Banco de dados não inicializado. Chame 'connect()' primeiro.");
      Logger.logError(error);
      throw error;
    }
    return this.db;
  }

  async close() {
    await this.client.close();
  }
}

module.exports = new Database();
