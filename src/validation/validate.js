import ResponseError from '../error/ResponseError.js';

function validate(schema, request) {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
    errors: {
      wrap: {
        label: '',
      },
    },
  });

  if (result.error) {
    const errors = result.error.details.map(({ message, context }) => {
      const { key } = context;

      return {
        key,
        message,
      };
    });

    throw new ResponseError(400, errors);
  } else {
    return result.value;
  }
}

export default validate;
