import nextConnect from 'next-connect';
import queryDb from "../utilities/db_connect";
const jwt = require("jsonwebtoken");

export default nextConnect({
    onError: (err, req, res, next) => {
        // throw an error, error message will be send here
        return res.status(500).json({ error: err.message })
    },
    onNoMatch: (req, res, next) => {
        return res.status(405).json({ message: `Method ${req.method} is Not Allowed...` });
    }
})
    .use(async (req, res, next) => {
        req.user = null;

        try {
            // console.log
            let tempToken = req.headers.authorization?.split(' ')[1] || req.cookies.mm_token || null;
            // decode the token, verify that it's legit
            if (!tempToken) req.user = null;
            else {
                // must await here.. will move forward too fast, if not...
                await jwt.verify(tempToken, process.env.JWT_SECRET, async (err, decoded) => {
                    if (err) req.user = null;
                    else {
                        // get all needed user data to store into state, if authenticated
                        const db_results = await queryDb(`
                        SELECT 
                            u.user_id, u.first_name, u.last_name, u.email,
                            p.permission_id, p.permission_name
                        FROM users u
                            LEFT JOIN users_permissions up ON u.user_id = up.user_id
                            LEFT JOIN permissions p ON p.permission_id = up.permission_id
                        WHERE u.user_id = ?
                    `, [decoded.user_id]).then(resp => resp[0]);
                        req.user = db_results || null;
                    };
                });
            };
        } catch (err) {
            throw new Error(err);
        }

        next();
    });