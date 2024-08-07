import jwt from 'jsonwebtoken'
import * as jose from 'jose'

const SECRET = process.env.JWT_SECRET as string

export const signToken = (payload: { id: string, email: string, username: string }) => {
    return jwt.sign(payload, SECRET)
}

export const verify = async <T>(payload: string) => {
    let encoded = new TextEncoder().encode(SECRET)
    let payloadJose = await jose.jwtVerify<T>(payload, encoded)
    // console.log(payloadJose);
    /**
     * {
  payload: {
  id: '66ab3a8a4df2fcdef2e67efa',
  email: 'rahma@mail.com',
  username: 'rahma1',
  iat: 1722587357
},
     */
    return payloadJose.payload // ini kenapa .payload karna return dari payloadjose nya object didalemnya ada payload
}