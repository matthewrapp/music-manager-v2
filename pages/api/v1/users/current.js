import apiHandler from '../../../../utilities/api/apiHandler';
import mongoConnect from '../../../../utilities/mongoConnect';
import User from '../../../../models/user';
const jwt = require("jsonwebtoken");

const getUserByToken = async (req, res) => {
    try {
        await mongoConnect();
    } catch (err) {
        return res.status(500).json({ message: "Having trouble connecting to db..." });
    }
    
    try {
        const token = req.headers.auth_token.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) return res.status(404).json({ message: "Token is invalid.." });
        const { id } = decodedToken;

        const userDoc = await User.findById(id);
        const dataToReturn = { ...userDoc._doc };
        delete dataToReturn['password'];

        return res.status(200).json(dataToReturn);
    } catch(err) {
        console.log(err)
        return res.status(400).json({ message: err });
    }
};

export default apiHandler({ 
    get: getUserByToken,
    mustBeAuthed: false
});