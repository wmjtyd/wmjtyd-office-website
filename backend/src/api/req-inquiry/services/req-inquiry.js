'use strict';

/**
 * req-inquiry service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::req-inquiry.req-inquiry');
