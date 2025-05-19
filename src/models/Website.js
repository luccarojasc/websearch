const db = require('../db/Database');
const Logger = require('../utils/Logger');

class Website {
  static async insertWebsite({ url, title, description, keywords }) {
    if (!url || !title || !keywords || !Array.isArray(keywords)) {
      const error = new Error("Campos obrigatórios ausentes ao inserir website.");
      Logger.logError(error);
      throw error;
    }

    try {
      const database = db.getDb();
      const websites = database.collection('websites');

      const existing = await websites.findOne({ url });
      if (existing) {
        console.log(`Website já existe: ${url}`);
        return;
      }

      await websites.insertOne({
        url,
        title,
        description: description || '',
        keywords,
        createdAt: new Date()
      });

      console.log(`Website inserido com sucesso: ${url}`);
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }

  static async searchByKeyword(keyword) {
    try {
      const database = db.getDb();
      const websites = database.collection('websites');

      const results = await websites.find({
        keywords: keyword
      }).toArray();

      return results;
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }

  static async deleteWebsite(url) {
    try {
      const database = db.getDb();
      const websites = database.collection('websites');

      await websites.deleteOne({ url });
      console.log(`Website removido: ${url}`);
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }
}

module.exports = Website;
