import jwt from 'jsonwebtoken';

export const genrateRefreshTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "1d",
    })
    res.cookie("refToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
    });
    return token;
}