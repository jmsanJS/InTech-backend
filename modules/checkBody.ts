function checkBody<T>(body: T, keys: (keyof T)[]): boolean {
  let isValid = true;

  for (const field of keys) {
    if (!body[field] || body[field] === "") {
      isValid = false;
    }
  }

  return isValid;
}

export { checkBody };
