'use strict';
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    const {address, amount, brews, postalCode, token, city} = ctx.request.body;

    // Send charge to Stripe
    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency: 'usd',
      description: `Order ${new Date(Date.now())} - User ${ctx.state.user._id}`,
      source: token
    });

    // Create order in database
    const order = await strapi.query('order').create({
      user: ctx.state.user._id,
      address,
      amount,
      brews,
      postalCode,
      city
    });

    return order;
  }
}
