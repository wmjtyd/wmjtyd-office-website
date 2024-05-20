'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::req-inquiry.req-inquiry', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    const { id: userId, role: { name: roleName } } = ctx.state.user;

    // 如果不是管理员，普通用户只能查询自己的数据
    if (roleName !== 'Administrator') {
      query.filters = {
        ...query.filters,
        createdByUser: userId,
      };
    }

    console.log("req-inquiry find userId  roleName query:", { userId, roleName, query });

    // 确认解析分页参数
    const page = parseInt(query.pagination?.page, 10) || 1;
    const pageSize = parseInt(query.pagination?.pageSize, 10) || 10;
    const start = (page - 1) * pageSize;

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
        where: query.filters,
        offset: start,
        limit: pageSize,
        orderBy,
        select: query.fields,
        populate: query.populate,
      }),
      strapi.db.query('api::req-inquiry.req-inquiry').count({ where: query.filters }),
    ]);

    const pageCount = Math.ceil(count / pageSize);

    // 打印获取到的客户数据和总数
    console.log(`Fetched customers data: ${JSON.stringify(reqInquiries, null, 2)}, Total customers count: ${count}, Calculated page count: ${pageCount}`);

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
    const reqInquiry = await strapi.entityService.findOne('api::req-inquiry.req-inquiry', id, {
      populate: { createdByUser: true },
    });

    const { id: userId, role: { name: roleName } } = ctx.state.user;

    // 如果不是管理员，普通用户只能查询自己的数据
    if (roleName !== 'Administrator' && reqInquiry.createdByUser.id !== userId) {
      return ctx.unauthorized('You can only access your own req_inquiries');
    }

    return { data: reqInquiry };
  },

  async create(ctx) {
    const { description, contact, status } = ctx.request.body;
    const { id: userId } = ctx.state.user;

    const reqInquiry = await strapi.entityService.create('api::req-inquiry.req-inquiry', {
      data: { description, contact, status, createdByUser: userId },
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
    const { id: userId, role: { name: roleName } } = ctx.state.user;

    // 查找要删除的记录
    const reqInquiry = await strapi.entityService.findOne('api::req-inquiry.req-inquiry', id, {
      populate: { createdByUser: true },
    });

    // 如果不是管理员，普通用户只能删除自己的数据
    if (roleName !== 'Administrator' && reqInquiry.createdByUser.id !== userId) {
      return ctx.unauthorized('You can only delete your own req_inquiries');
    }

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
