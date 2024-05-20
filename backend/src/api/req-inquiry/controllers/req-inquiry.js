'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::req-inquiry.req-inquiry', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
  
    // 打印收到的原始查询参数
    console.log("Received req-inquiry query parameters:", query);
  
    // 确认解析分页参数
    const page = parseInt(query.pagination?.page, 10) || 1;
    const pageSize = parseInt(query.pagination?.pageSize, 10) || 10;
    const start = (page - 1) * pageSize;
  
    // 打印解析后的分页参数
    console.log("Parsed req-inquiry pagination parameters:", { page, pageSize, start });
  
    // 提取过滤器条件
    const filters = query.filters || {};
  
    // 处理排序参数，确保是一个数组
    let orderBy = [];
    if (Array.isArray(query.sort)) {
      orderBy = query.sort.map(sort => {
        const [field, order] = sort.split(':');
        return { [field]: order };
      });
    } else if (typeof query.sort === 'string') {
      orderBy = query.sort.split(',').map(sort => {
        const [field, order] = sort.split(':');
        return { [field]: order };
      });
    }
  
    // 使用 Promise.all 并行处理请求查询和总数计算
    const [reqInquiries, count] = await Promise.all([
      strapi.query('api::req-inquiry.req-inquiry').findMany({
        where: filters,
        offset: start,
        limit: pageSize,
        orderBy,
        select: query.fields,
        populate: query.populate,
      }),
      strapi.db.query('api::req-inquiry.req-inquiry').count({ where: filters }),
    ]);
  
    const pageCount = Math.ceil(count / pageSize);
  
    // 打印获取到的请求数据和总数
    console.log(`Fetched req-inquiry req inquiries data: ${JSON.stringify(reqInquiries, null, 2)}, Total req inquiries count: ${count}, Calculated page count: ${pageCount}`);
  
    return {
      data: reqInquiries,
      meta: {
        pagination: {
          page,
          pageSize,
          pageCount,
          total: count,
        },
      },
    };
  },  
  
  async findOne(ctx) {
    const { id } = ctx.params;
    const reqInquiry = await strapi.entityService.findOne('api::req-inquiry.req-inquiry', id);
    return { data: reqInquiry };
  },

  async create(ctx) {
    const { description, contact, status } = ctx.request.body;

    console.log("req-inquiry create parameters:", { description, contact, status });

    const reqInquiry = await strapi.entityService.create('api::req-inquiry.req-inquiry', {
      data: { description, contact, status },
    });
    return { data: reqInquiry };
  },

  async update(ctx) {
    const { id } = ctx.params;
    const { data } = ctx.request.body;
    const reqInquiry = await strapi.entityService.update('api::req-inquiry.req-inquiry', id, {
      data,
    });
    return { data: reqInquiry };
  },

  async delete(ctx) {
    const { id } = ctx.params;
    await strapi.entityService.delete('api::req-inquiry.req-inquiry', id);
    return { message: 'Req Inquiry deleted successfully' };
  },

  async totalReqInquiries(ctx) {
    try {
      const count = await strapi.db.query('api::req-inquiry.req-inquiry').count();
      return { data: { count } };
    } catch (err) {
      console.log(err);
    }
  },
}));
