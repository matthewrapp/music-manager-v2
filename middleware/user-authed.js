const jwt = require("jsonwebtoken");

export const userAuthed = (req, res) => {
    return new Promise((resolve, reject) => {
        try {
            let token;
            
            if (req.headers.authorization) {
                token = req.headers.authorization.split(' ')[1];
            } else {
                token = req.cookies.auth
            };


            if (!token) {
                reject("Access Denied... must be authed...");
                return;
            }
            // here let's decode the token & verify that it's legit
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                if (err) reject("Token is invalid...");
                else resolve(decodedToken);
            });

        } catch(err) {
            reject(err);
        }
    });
};