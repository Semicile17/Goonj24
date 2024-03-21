const AppError = require('../utils/appError');

const handleDuplicateFieldsDB = err=>{
    const value = Object.keys(err.keyValue).map(key=> `${key} : ${err.keyValue[key]}`);
    const message = `Duplicate field value [${value}]. Please use another value!`;
    return new AppError(message, 400);
}



const sendDev = (err, res)=>{
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';

    res.status(statusCode).json({
        status: status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}

const sendProd = (err, res)=>{
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';

    if (err.isOperational){
        res.status(statusCode).json({
            status: status,
            message: err.message
        })
    }else{
        res.status(500).json({
            status: 'Server Error',
            message: 'Something went wrong'
        })
    }
}


module.exports = (err, req, res, next)=>{
    if (process.env.NODE_ENV==='development'){
        console.log('hello from global error handler')
        sendDev(err, res);
    }else if(process.env.NODE_ENV==='production'){
        let error = {...err};
        if (err.code===11000) error = handleDuplicateFieldsDB(error);
        sendProd(error, res);
    }

    next();
}