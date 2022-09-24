import User from '../../../models/user';
import apiHandler from '../../../utilities/api/apiHandler';
import mongoConnect from '../../../utilities/mongoConnect';
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const salt = 12;

const createUser = async (req, res, user) => {

    try {
        // connecting to mongo db
        await mongoConnect();

        // passwords are being matched on the client, so i'm not gonna worry about comparing here (on server) right now
        // hash password
        const hashedPw = await bcrypt.hash(req.body.password, salt);

        const dataToSave = { ...req.body };
        dataToSave['password'] = hashedPw;
        delete dataToSave['confirmPassword'];

        const userDoc = await User({ ...dataToSave });
        userDoc.save();

        // create a json token & send it back with the doc
        const token = jwt.sign({ id: userDoc._id.toHexString() }, process.env.JWT_SECRET, { expiresIn: '3d' });

        const dataToReturn = { ...userDoc._doc };
        delete dataToReturn['password'];
        dataToReturn['token'] = token;
        // dataToReturn['id'] = id;

        return res.status(200).json(dataToReturn);
    } catch(err) {
        return res.status(400).json({ message: err });
    }
};

export default apiHandler({ 
    post: createUser,
    mustBeAuthed: false
});