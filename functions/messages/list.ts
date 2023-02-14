interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const ps = env.DB.prepare('SELECT * FROM messages ORDER BY id DESC LIMIT 25');
    const res = await ps.all();

    if (res.success) {
      return new Response(JSON.stringify({ message: 'Success!', data: res.results }), { headers: { 'Content-Type': 'application/json' } });
    } else {
      return new Response(JSON.stringify({ error: res.error }), { headers: { 'Content-Type': 'application/json' } });
    }
  } catch(e) {
    // @ts-ignore
    return Response.json({ error: e.message, stack: e.stack, cause: e.cause })
  }
}