const jwt = require("jsonwebtoken")

const validarJWT = (req, res, next) => {
  const token = req.header("x-token")

  if(!token){
    return res.status(401).json({
      ok: false,
      msg: "Missing token"
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET)
    // console.log("uid >> ", uid);
    req.uid = uid
    
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid Token"
    })
  }

  next();
}

module.exports = {
  validarJWT
}