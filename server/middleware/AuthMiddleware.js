const {verify} = require("jsonwebtoken")

const validateToken = (req, res, next) => {
    const token = req.header("accessToken")
    if (!token) {
        return res.status(400).json({error: "You Must Be Logged In To Perform This Action"})
    }
    try {
        const validToken = verify(token, "supersecretkey")
        req.user = validToken
        if (validToken) {
            return next()
        }
    } catch (error) {
        return res.status(400).json({error: "You Are Not Logged In"})
    }
}
module.exports = { validateToken }