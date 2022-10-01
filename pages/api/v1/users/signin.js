import apiHandler from '../../../../utilities/api/apiHandler';
import mongoConnect from '../../../../utilities/mongoConnect';
import User from '../../../../models/user';
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signInUser = async (req, res) => {

    try {
        await mongoConnect();
    } catch (err) {
        console.log(err, ' here')
        return res.status(500).json({ message: "Having trouble connecting to db..." });
    }

    try {
        // here, compare credentials passed in & see if the person is validated
        const { email, password } = req.body;
        if (!email || !password) return res.status(404).json({ message: "Must pass in data within body of the request." });

        // validate if email exists
        const found_user = await User.findOne({ email: email });
        if (!found_user) return res.status(400).json({ message: 'User doesn\'t exist. Please sign up.' });

        const do_match = await bcrypt.compare(password, found_user.password);
        if (!do_match) return res.status(400).json({ message: 'Password does not match. Try again.' });
        
        // send back token to store in cookies
        const token = jwt.sign({ id: found_user._id.toHexString() }, process.env.JWT_SECRET);

        const dataToReturn = { ...found_user._doc };
        delete dataToReturn['password'];
        dataToReturn['token'] = token;

        return res.status(200).json(dataToReturn);
    } catch(err) {
        console.log(err, ' here')
        return res.status(400).json({ message: err });
    }
};

export default apiHandler({ post: signInUser, mustBeAuthed: false });