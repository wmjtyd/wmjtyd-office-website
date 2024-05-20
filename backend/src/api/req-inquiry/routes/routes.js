'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/req-inquiries',
      handler: 'req-inquiry.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/req-inquiries/:id',
      handler: 'req-inquiry.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/req-inquiries',
      handler: 'req-inquiry.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/req-inquiries/:id',
      handler: 'req-inquiry.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/req-inquiries/:id',
      handler: 'req-inquiry.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/req-inquiries/count',
      handler: 'req-inquiry.totalReqInquiries',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
