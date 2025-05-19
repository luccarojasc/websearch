const db = require('../db/Database');
const Logger = require('../utils/Logger');

class SearchLog {
  static async insertSearchLog(query) {
    if (!query) {
      const error = new Error("Consulta de busca obrigatória.");
      Logger.logError(error);
      throw error;
    }

    try {
      const database = db.getDb();
      const searchLogs = database.collection('search_logs');
      await searchLogs.insertOne({
        query,
        timestamp: new Date()
      });
      console.log("Log de busca inserido.");
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }
}

module.exports = SearchLog;
