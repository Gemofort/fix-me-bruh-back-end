exports.loadMainpage = async (ctx) => {
  await ctx.render('index', {
    username: 'John Smitherino',
  });
};
