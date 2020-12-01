export default class ResponseError extends Error {

    constructor(message = "", response = {}, ...args) {
        super(message, ...args);
        this.response = response;
    }
}
