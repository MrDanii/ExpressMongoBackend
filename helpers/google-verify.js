const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });

  const payload = ticket.getPayload();
  const userid = payload['sub'];

  console.log("payload >> ", payload)
  const { email, name, picture } = payload

  return { email, name, picture }

  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}

const googleVerify = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });

  const payload = ticket.getPayload();
  // const userid = payload['sub'];

  const { email, name, picture } = payload

  return { email, name, picture }

  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}

module.exports = {
  verify,
  googleVerify
}