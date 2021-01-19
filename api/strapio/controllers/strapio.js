'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx) {
        let entity;
        if (ctx.is("multipart")) {
          const { data, files } = parseMultipartData(ctx);
          entity = await strapi.services.CONTENTTYPE.create(data, { files });
        } else {
          entity = await strapi.services.CONTENTTYPE.create(ctx.request.body);
        }
        strapi.StrapIO.emit(this,'create', entity);
     
        return sanitizeEntity(entity, { model: strapi.models.CONTENTTYPE });
      },

      async update(ctx) {
        const { id } = ctx.params;
     
        let entity;
        if (ctx.is("multipart")) {
          const { data, files } = parseMultipartData(ctx);
          entity = await strapi.services.CONTENTTYPE.update({ id }, data, {
            files,
          });
        } else {
          entity = await strapi.services.CONTENTTYPE.update({ id }, ctx.request.body);
        }
     
        strapi.StrapIO.emit(this,'update', entity);
     
        return sanitizeEntity(entity, { model: strapi.models.CONTENTTYPE });
      }
};
