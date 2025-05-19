const db = require('../db/Database');
const Logger = require('../utils/Logger');

class Keyword {
  static async insertKeyword(keyword) {
    if (!keyword) {
      const error = new Error("Palavra-chave obrigatória.");
      Logger.logError(error);
      throw error;
    }

    try {
      const database = db.getDb();
      const keywords = database.collection('keywords');

      const exists = await keywords.findOne({ keyword });
      if (exists) {
        console.log(`Palavra-chave '${keyword}' já existe.`);
        return;
      }

      await keywords.insertOne({ keyword });
      console.log(`Palavra-chave '${keyword}' inserida.`);
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }

  static async deleteKeyword(keyword) {
    try {
      const database = db.getDb();
      const keywords = database.collection('keywords');
      await keywords.deleteOne({ keyword });
      console.log(`Palavra-chave '${keyword}' removida.`);
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }
}

module.exports = Keyword;
