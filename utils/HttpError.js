class HttpError extends Error {
  constructor(message, code = 409) {
    super(message);
    this.code = code;
  }
}

export default HttpError;
