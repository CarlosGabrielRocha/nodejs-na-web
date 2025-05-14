const multer = require("multer")

/* Retorna uma instância do multer que providência vários métodos
para gerar middlewares que são capazes de lidar com diferentes tipos de arquivos. */
const uploadMiddlewares = multer({
    dest: 'uploads/' // Podemos configurar um destino para esses uploads.
})

// Ex:.  Essa função retorna um middleware: uploadMiddlewares.any()

module.exports = uploadMiddlewares

