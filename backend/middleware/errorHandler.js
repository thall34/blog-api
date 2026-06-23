function errorHandler(err, req, res, next) {
    console.error(err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Server Error Occurred';

    res.status(statusCode).json({
        status: 'error',
        message: message,
    });
};

module.exports = errorHandler;