const validateFileTypeAndSize = (ctx, fieldName) => {
  const picture = ctx.request.files ? ctx.request.files[fieldName] : null;
  if (picture) {
    if (picture.size < (2 * 1024 * 1024)) {
      if (!['image/png', 'image/gif', 'image/jpeg'].includes(picture.type)) {
        ctx.throw(400, 'We only support PNG, GIF or JPG pictures');
      }
    } else {
      ctx.throw(400, 'Please upload a picture smaller than 2 MB');
    }
  } else {
    ctx.throw(400, `${fieldName} is required`);
  }
  return true;
};

exports.validateFileTypeAndSize = validateFileTypeAndSize;
