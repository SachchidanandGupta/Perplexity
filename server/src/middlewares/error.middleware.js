const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Server Error",
        err: err.errMessage || "Internal Server Error",
    });
};

export default errorHandler;