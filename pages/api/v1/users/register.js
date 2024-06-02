import queryDb from '../../../../utilities/db_connect';
import api_handler from '../../../../middleware/api_handler';
import validation_schema_handler from '../../../../middleware/validation_schema_handler';
import { createUserSchema } from '../../../../utilities/api/validate_schemas';
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const salt = 12;

const createUser = async (req, res) => {
    // validate request with a yup schema.. will throw an error if didn't validate
    await validation_schema_handler(createUserSchema, req.body);

    const { email, first_name, last_name, password, confirm_password } = req.body;

    try {
        // need to see if email exists
        const email_exists_results = await queryDb(`SELECT id from users WHERE email = ?`, [email]);
        if (email_exists_results.length > 0) return res.status(300).json({ message: "Email already exists..." });

        // compare passwords, make sure they are the same
        if (password !== confirm_password) return res.status(400).json({ message: "Passwords must match" });

        // hash password
        const hashed_pw = await bcrypt.hash(password, salt);

        // write user to the database
        const db_result = await queryDb(`INSERT INTO music_manager_v2.users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`, [first_name, last_name, email, hashed_pw]);
        

        // create a token with user id & email
        const user_id = db_result.insertId;
        const token = await jwt.sign({ user_id: user_id, email: email }, process.env.JWT_SECRET);

        return res.status(200).json({ token });

    } catch(err) {
        return res.status(400).json(err);
    }


};

export default api_handler.post(createUser);



// import User from '../../../../models/user';
// import queryDb from '../../../../utilities/db_connect';
// import mongoConnect from '../../../../utilities/mongoConnect';
// import { check, validationResult } from 'express-validator';
// import { object, string } from 'yup';
// import api_handler from '../../../../utilities/api/api_handler';
// const bcrypt = require('bcryptjs');
// const jwt = require("jsonwebtoken");
// const salt = 12;

// const createUserSchema = object({
//     first_name: string().required(),
//     last_name: string().required(),
//     email: string().email().required(),
//     password: string().required(),
//     confirm_password: string().required()
// });

// const createUser = async (req, res, user) => {
//     // try {
//     //     // validate the body of the request
//     //     const user = await createUserSchema.validate(req.body);
//     // } catch (err) {
//     //     return res.status(400).json({ message: err });
//     // }

//     return res.status(200).json({ message: req.body });

//     // check to see if email already exists
//     try {
//         const email_exists_results = await queryDb(`SELECT id from users WHERE email = ?`, ['mattrapp25@gmail.com']);
//         if (email_exists_results.length > 0) return res.status(300).json({ message: "Email already exists..." });
//     } catch (err) {
//         return res.status(400).json({ message: err });
//     }

// };

// export default api_handler(createUserSchema, { post: createUser });




// import User from '../../../../models/user';
// import apiHandler from '../../../../utilities/api/apiHandler';
// import mongoConnect from '../../../../utilities/mongoConnect';
// const bcrypt = require('bcryptjs');
// const jwt = require("jsonwebtoken");
// const salt = 12;

// const createUser = async (req, res, user) => {

//     try {
//         await mongoConnect();
//     } catch (err) {
//         return res.status(500).json({ message: "Having trouble connecting to db..." });
//     }

//     try {
//         // passwords are being matched on the client, so i'm not gonna worry about comparing here (on server) right now
//         // hash password
//         const hashedPw = await bcrypt.hash(req.body.password, salt);

//         const dataToSave = { ...req.body };
//         dataToSave['password'] = hashedPw;
//         delete dataToSave['confirmPassword'];

//         const userDoc = await User({ ...dataToSave });
//         userDoc.save();

//         // create a json token & send it back with the doc
//         const token = jwt.sign({ id: userDoc._id.toHexString() }, process.env.JWT_SECRET);

//         const dataToReturn = { ...userDoc._doc };
//         delete dataToReturn['password'];
//         dataToReturn['token'] = token;

//         return res.status(200).json(dataToReturn);
//     } catch(err) {
//         return res.status(400).json({ message: err });
//     }
// };

// export default apiHandler({  post: createUser, mustBeAuthed: false });