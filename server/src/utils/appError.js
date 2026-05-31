class AppError extends Error {
    constructor(message, statusCode, errMessage) {
        super(message);

        this.statusCode = statusCode;
        this.errMessage = errMessage;

        // Set the error name
        this.name = this.constructor.name;

        // Capture stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;