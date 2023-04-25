export async function GET(request: Request) {
  await Promise.resolve();
  console.log(request); // eslint-disable-line no-console
  return new Response('Hello, Next.js!');
}
