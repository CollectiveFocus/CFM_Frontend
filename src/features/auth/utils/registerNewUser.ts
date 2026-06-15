import { UserCredential } from 'firebase/auth';

const USERS_API_URL = process.env.NEXT_PUBLIC_USERS_API_URL;

/**
 * Ensures a user record exists in our database after every sign-in.
 * Calling on every sign-in makes this self-healing: if the POST failed on
 * a previous attempt, the next sign-in will retry automatically.
 * The API returns an error when the userId already exists — that is silently ignored.
 * API failures never interrupt the auth flow.
 */
export async function registerNewUser(
  credential: UserCredential
): Promise<void> {
  const { user } = credential;

  const idToken = await user.getIdToken();

  const body: Record<string, string> = { userId: user.uid };
  if (user.email) body.email = user.email;
  else if (user.phoneNumber) body.phoneNumber = user.phoneNumber;

  try {
    if (!USERS_API_URL) {
      throw new Error('NEXT_PUBLIC_USERS_API_URL is not set');
    }
    const res = await fetch(`${USERS_API_URL}/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok && res.status !== 409) {
      console.error(
        `[registerNewUser] API error ${res.status}: ${res.statusText}`
      );
    }
  } catch (err) {
    console.error('[registerNewUser] Network error:', err);
  }
}
