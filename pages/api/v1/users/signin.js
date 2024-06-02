import api_handler from '../../../../middleware/api_handler';
import validation_schema_handler from '../../../../middleware/validation_schema_handler';
import { signInUserSchema } from '../../../../utilities/api/validate_schemas';
import queryDb from '../../../../utilities/db_connect';
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signInUser = async (req, res) => {

    // validate request with a yup schema.. will throw an error if didn't validate
    await validation_schema_handler(signInUserSchema, req.body);

    const { email, password } = req.body;

    try {
        // get all needed user data to store into state, if authenticated
        // see if user exists base on email... return back id, email, password
        const db_result = await queryDb(`
            SELECT 
                u.user_id, u.first_name, u.last_name, u.email, u.password,
                p.permission_id, p.permission_name
            FROM users u
                LEFT JOIN users_permissions up ON u.user_id = up.user_id
                LEFT JOIN permissions p ON p.permission_id = up.permission_id
            WHERE email = ?
        `, [email]);
        if (db_result.length === 0) return res.status(300).json({ message: "Email doesn't exist..." });

        const do_match = await bcrypt.compare(password, db_result[0].password);
        if (!do_match) return res.status(400).json({ message: 'Password does not match. Try again.' });
        
        // send back token to store in cookies
        const token = jwt.sign({ user_id: db_result[0].user_id, email: email }, process.env.JWT_SECRET);

        const dataToReturn = { ...db_result[0] };
        delete dataToReturn['password'];
        dataToReturn['token'] = token;

        return res.status(200).json(dataToReturn);
    } catch(err) {
        console.log(err, ' here')
        return res.status(400).json({ message: err });
    }
};

export default api_handler.post(signInUser);