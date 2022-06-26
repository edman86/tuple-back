import jwt from 'jsonwebtoken';

/**
* Middleware
* Decrypts the token and adds it to the request object.
*
* @param {Object} req - The request object
* @param {Object} res - The response object
* @param {function} next - Moves to the next middleware
* @return {next|Object} if success, adds decrypted token to req
*/

const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    
    if (token) {
        try {
            const decryptedToken = jwt.verify(token, 'privateKey');
            req.userId = decryptedToken._id;
            next();

        } catch (err) {
            return res.status(403).json({
                message: 'No access'
            });
        }

    } else {
        return res.status(403).json({
            message: 'No access'
        });
    }
};

export default checkAuth;
