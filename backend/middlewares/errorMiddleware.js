const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(400);
    next(error);
}

const errorHandler = (req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : resStatusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
};


module.exports = { notFound, errorHandler };