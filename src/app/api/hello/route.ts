export async function GET(request: Request) {
  // Return new Response with a JSON body
  return new Response(JSON.stringify({ message: 'Hello World!' }), {
    headers: { 'content-type': 'application/json' },
  });
}
