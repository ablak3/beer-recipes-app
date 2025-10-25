import * as jose from 'jose';

/**
 * Encode (sign) a mock JWT in the browser for dev/testing.
 */
export async function mockEncodeJwt(payload: Record<string, unknown>): Promise<string> {
  // NOTE: this is a mock secret — not secure!
  const secret = new TextEncoder().encode('mock-dev-secret');

  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret);

  return token;
}

/**
 * Decode (verify) a mock JWT.
 */
export async function mockDecodeJwt(token: string): Promise<Record<string, unknown> | null> {
  try {
    const secret = new TextEncoder().encode('mock-dev-secret');
    const { payload } = await jose.jwtVerify(token, secret);
    return payload;
  } catch (err) {
    console.error('Invalid or expired token:', err);
    return null;
  }
}
