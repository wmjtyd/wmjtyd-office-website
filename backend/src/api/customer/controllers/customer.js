'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::customer.customer', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
  
    // 打印收到的原始查询参数
    console.log("Received query parameters:", query);
  
    // 确认解析分页参数
    const page = parseInt(query.pagination?.page, 10) || 1;
    const pageSize = parseInt(query.pagination?.pageSize, 10) || 10;
    const start = (page - 1) * pageSize;
  
    // 打印解析后的分页参数
    console.log("Parsed pagination parameters:", { page, pageSize, start });
  
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
  
    // 使用 Promise.all 并行处理客户查询和总数计算
    const [customers, count] = await Promise.all([
      strapi.query('api::customer.customer').findMany({
        where: filters,
        offset: start,
        limit: pageSize,
        orderBy,
        select: query.fields,
        populate: query.populate,
      }),
      strapi.db.query('api::customer.customer').count({ where: filters }),
    ]);
  
    const pageCount = Math.ceil(count / pageSize);
  
    // 打印获取到的客户数据和总数
    console.log(`Fetched customers data: ${JSON.stringify(customers, null, 2)}, Total customers count: ${count}, Calculated page count: ${pageCount}`);
  
    return {
      data: customers,
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
    const customer = await strapi.entityService.findOne('api::customer.customer', id);
    return { data: customer };
  },

  async create(ctx) {
    const { name, email } = ctx.request.body;
    const customer = await strapi.entityService.create('api::customer.customer', {
      data: { name, email },
    });
    return { data: customer };
  },

  async update(ctx) {
    const { id } = ctx.params;
    const { data } = ctx.request.body;
    const customer = await strapi.entityService.update('api::customer.customer', id, {
      data,
    });
    return { data: customer };
  },

  async delete(ctx) {
    const { id } = ctx.params;
    await strapi.entityService.delete('api::customer.customer', id);
    return { message: 'Customer deleted successfully' };
  },

  async totalCustomers(ctx) {
    try {
      const count = await strapi.db.query('api::customer.customer').count();
      return { data: { count } };
    } catch (err) {
      console.log(err);
    }
  },
}));
