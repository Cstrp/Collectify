const checkBody = (body: object, keys: string[]): string | null => {
  const bodyKeys = Object.keys(body);

  if (bodyKeys.length === 0) {
    return "Body is required";
  }

  for (const key of keys) {
    if (!(key in body)) {
      return `${key} is required`;
    }
  }

  if (bodyKeys.length > keys.length) {
    const props = bodyKeys.filter(prop => !keys.includes(prop));

    return `Properties ${props.join(",")} shouldn't exist`;
  }

  return null;
};

export { checkBody };
