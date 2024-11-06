export function acquireAccount(id: number): {
  email: string | undefined;
  password: string | undefined;
} {
  const email = process.env.TEST_ACCOUNT_EMAIL?.replace('_ID_', id.toString());
  const password = process.env.TEST_ACCOUNT_PASSWORD?.replace(
    '_ID_',
    id.toString()
  );
  return { email, password };
}
