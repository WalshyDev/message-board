interface Env {
  DB: D1Database;
}

interface Body {
  name: string;
  content: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await request.json<Body>();

    const ps = env.DB.prepare('INSERT INTO messages (name, content) VALUES (?, ?)')
      .bind(body.name, body.content);

    const res = await ps.run();

    if (res.success) {
      return new Response(JSON.stringify({ message: 'Success!' }), { headers: { 'Content-Type': 'application/json' } });
    } else {
      return new Response(JSON.stringify({ error: res.error }), { headers: { 'Content-Type': 'application/json' } });
    }
  } catch(e) {
    // @ts-ignore
    return Response.json({ error: e.message, stack: e.stack, cause: e.cause })
  }
}