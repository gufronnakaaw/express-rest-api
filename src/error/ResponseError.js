class ResponseError extends Error {
  constructor(status, message) {
    super(JSON.stringify(message));
    this.status = status;
  }
}

export default ResponseError;
