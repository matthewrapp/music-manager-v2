import apiHandler from '../../../utilities/api/apiHandler';

// use apiHandler to know which function to hit by method
export default apiHandler({
    get: getUserById,
    put: updateUserById,
    delete: deleteUserById
});

const getUserById = (req, res) => {
    return res.status(200).json({});
};

const updateUserById = (req, res) => {
    return res.status(200).json({});
};

const deleteUserById = (req, res) => {
    return res.status(200).json({});
};