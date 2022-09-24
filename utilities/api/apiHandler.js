import { userAuthed } from "../../middleware/user-authed";

const apiHandler = (handler) => {

    return async (req, res) => {
        const method = req.method.toLowerCase();
        // check handler supports HTTP method
        if (!handler[method]) return res.status(405).json({ message: `Method ${req.method} Not Allowed` });

        let user = null;
        // authenticate user
        if (handler.mustBeAuthed) {
            try {
                user = await userAuthed(req, res);
            } catch(err) {
                return res.status(404).json({ message: err });
            }
        }

        try {
            // route handler
            return await handler[method](req, res, user);
        } catch(err) {
            return res.status(500).json({ message: err });
        }
    }
};

export default apiHandler;