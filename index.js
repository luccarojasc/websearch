const db = require('./src/db/Database');
const Website = require('./src/models/Website');
const Keyword = require('./src/models/Keyword');
const SearchLog = require('./src/models/SearchLog');

(async () => {
  await db.connect();

  try {
    console.log("\nInserindo palavras-chave...");
    await Keyword.insertKeyword("educaçao");
    await Keyword.insertKeyword("parana");
    await Keyword.insertKeyword("tecnologia");
    // descomente as linhas 15 até 19 para inserir mais palavras chave; mais de uma execução para verificação de palavras chave ja existentes
    //await Keyword.insertKeyword("serviços");
    //await Keyword.insertKeyword("governo");
    //await Keyword.insertKeyword("culinaria");
    //await Keyword.insertKeyword("software");
    //await Keyword.insertKeyword("italiano");

    console.log("\nInserindo website...");
    await Website.insertWebsite({
      url: "https://www.utfpr.edu.br",
      title: "UTFPR",
      description: "Universidade Tecnológica Federal do Paraná",
      keywords: ["tecnologia", "educaçao", "parana"]
    });
    // descomente as linhas 28 até 48 para inserir mais sites com palavras chave similares; mais de uma execução para verificação de sites ja existentes
    //console.log("\nInserindo website...");
    //await Website.insertWebsite({
    //  url: "https://www.microsoft.com/pt-br",
    //  title: "Microsoft",
    //  description: "Microsoft Corporation",
    //  keywords: ["tecnologia", "serviços", "software"]
    //});
    //console.log("\nInserindo website...");
    //await Website.insertWebsite({
    //  url: "http://portal.mec.gov.br",
    //  title: "MEC.gov",
    //  description: "Ministério da Educação",
    //  keywords: ["educaçao", "governo"]
    //});
    //console.log("\nInserindo website...");
    //await Website.insertWebsite({
    //  url: "https://www.barolotrattoria.com.br",
    //  title: "Barolo Trattoria",
    //  description: "Restaurante Italiano em Curitiba",
    //  keywords: ["parana", "culinaria", "italiano"]
    //});

    console.log("\nBuscando websites pela palavra-chave 'tecnologia'...");
    const results = await Website.searchByKeyword("tecnologia");
    console.log("Resultados da busca:");
    console.log(results);

    console.log("\nRegistrando log de busca...");
    await SearchLog.insertSearchLog("tecnologia");

    console.log("\nTestes finalizados com sucesso.");

    //deletar dados de teste (descomente as 4 linhas abaixo e/ou altere de acordo)
    //await Website.deleteWebsite("https://www.utfpr.edu.br");
    //await Keyword.deleteKeyword("educacao");
    //await Keyword.deleteKeyword("parana");
    //await Keyword.deleteKeyword("tecnologia");

  } catch (error) {
    console.error("Erro durante execução:", error.message);
  } finally {
    await db.close();
  }
})();
