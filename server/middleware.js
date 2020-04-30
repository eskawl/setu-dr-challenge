const jwt = require('jsonwebtoken');

const fail = (res) => {
    return res.status(401).json({
        success: false,
        error: 'Authentication required',
    })
}

exports.authentication = (req, res, next) => {
    try {
        const bearerToken = req.get('authorization');

        if(!bearerToken) {
            return fail(res);
        }

        const token = bearerToken.split('Bearer ')[1];
    
        if(!token) {
            return fail(res);
        }

        const { SETU_SECRET, SETU_SCHEME_ID } = process.env;
    
        const decoded = jwt.decode(token, SETU_SECRET);

        if(!decoded || decoded.aud !== SETU_SCHEME_ID){
            return fail(res);
        }
        
        next();

    } catch (error) {
        next(error);
    }
}


