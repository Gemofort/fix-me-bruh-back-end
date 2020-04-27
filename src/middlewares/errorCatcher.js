const pino = require('pino');

const logger = pino({ name: 'server' });

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    console.log('ERROR HANDLER: ', e);

    ctx.status = 500;
    switch (true) {
      case e.isJoi && e.status === 500: {
        ctx.status = 400;
        ctx.body = { error: e.message, type: 'OUTPUT_VALIDATION_ERROR' };
        return;
      }

      case e.isJoi: {
        ctx.body = { error: e.details[0].message, type: 'VALIDATION_ERROR' };
        ctx.status = 400;
        break;
      }

      case e.isPassport: {
        ctx.body = { error: e.message, type: 'AUTHENTICATION_SERVICE_ERROR' };
        ctx.status = 400;
        break;
      }

      case e.isCustom: {
        ctx.body = { error: e.message, type: 'CUSTOM_ERROR' };
        ctx.status = 418;
        break;
      }

      case Array.isArray(e): {
        const fields = [];

        e.forEach((elem) => {
          fields.push({
            field: elem.property,
            message: Object.keys(elem.constraints).map(key => elem.constraints[key])[0],
          });
        });

        ctx.body = { error: fields };
        break;
      }

      case Boolean(e.status): {
        ctx.status = e.status;
        ctx.body = { error: e.message };
        return;
      }

      default: {
        logger.error(e.message);
        ctx.app.emit('error', e, ctx);
        ctx.body = { error: e.message, type: 'UNHANDLED_ERROR' };
      }
    }
  }
};
