const Logger = require('../utils/Logger');

class IndexRelation {
  constructor(db) {
    this.collection = db.collection('index_relations');
  }

  async insert(websiteUrl, keyword) {
    try {
      if (!websiteUrl || !keyword) throw new Error('Dados obrigatórios ausentes.');
      await this.collection.updateOne(
        { websiteUrl, keyword },
        { $setOnInsert: { websiteUrl, keyword } },
        { upsert: true }
      );
    } catch (err) {
      Logger.logError(err);
    }
  }

  async findWebsitesByKeyword(db, keyword) {
    try {
      const relations = await this.collection.find({ keyword }).toArray();
      const urls = relations.map(r => r.websiteUrl);
      const websites = await db.collection('websites').find({ url: { $in: urls } }).toArray();
      return websites;
    } catch (err) {
      Logger.logError(err);
      return [];
    }
  }
}

module.exports = IndexRelation;
