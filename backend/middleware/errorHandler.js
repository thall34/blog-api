function errorHandler(err, req, res, next) {
    console.error(err);

    // postSQL Database errors
    if(err.code) {
        return res.status(500).json({ error: 'Database Error Occurred' });
    };

    // fallback to catch all errors
    return res.status(500).json({ error: 'Server Error Occurred' });
};

module.exports = errorHandler;