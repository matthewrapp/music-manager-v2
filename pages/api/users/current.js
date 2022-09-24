import apiHandler from '../../../utilities/api/apiHandler';
import mongoConnect from '../../../utilities/mongoConnect';
import User from '../../../models/user';
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signInUser = async (req, res) => {
    // here, compare credentials passed in & see if the person is validated
    const { email, password } = req.body;
    // validate if email exists
    // const user = ;
    // validate is passwords compare is correct
    // const passwordMatch = bcrypt.compareSync(password, user.hash) // user.hash is the hashed password stored in db
    // if (!(user && passwordMatch)) {
    //     return res.status(404).json({ message: "Email doesn't exist or password is incorrect!"});
    // }
    // create a jwt token that is valid for 7 days
    // const token = jwt.sign({ sub: "USE USER ID" }, SECRETKEY_HERE, { expires: '7d' });
    // return res.status(200).json({
    //     id: "",
    //     email: "",
    //     firstName: "",
    //     lastName: "",
    //     token: '' // store this in cookie
    // })
};

const getUserByToken = async (req, res) => {
    const token = req.headers.auth_token.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) return res.status(404).json({ message: "Token is invalid.." });
    const { id } = decodedToken;

    // connecting to mongo db
    await mongoConnect();

    const userDoc = await User.findById(id);
    const dataToReturn = { ...userDoc._doc };
    delete dataToReturn['password'];

    return res.status(200).json(dataToReturn);
};

export default apiHandler({ 
    post: signInUser,
    get: getUserByToken,
    mustBeAuthed: false
});