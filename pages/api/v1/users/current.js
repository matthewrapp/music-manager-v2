import api_handler from '../../../../middleware/api_handler';

const getUserByToken = async (req, res) => {

    try {
        console.log(req.user)
        if (!req.user) return res.status(404).json({ message: "Not authorizaed..." });
        return res.status(200).json(req.user);
    } catch(err) {
        console.log(err)
        return res.status(400).json({ message: err });
    }
};

export default api_handler.get(getUserByToken);