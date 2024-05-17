module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/total-customers',
      handler: 'customer.totalCustomers',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    // 可以根据需要添加更多自定义路由
  ],
};
