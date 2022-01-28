module.exports = {
  index: async ctx => {
    const options = ctx.request.body;
      await strapi.plugins['email'].services.email.send({
        to: options.to,
        from: 'marialena.pietri@expertecom.fr',
        replyTo: 'marialena.pietri@expertecom.fr',
        subject: options.subject,
        text: options.text,
        html: options.html
      });
    ctx.send("Email sent!");
  }
}
