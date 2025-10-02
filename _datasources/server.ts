// Mock data
const users = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
  { id: "3", name: "Charlie", email: "charlie@example.com" },
];

const posts = [
  {
    id: "1",
    title: "First Post",
    content: "Hello World",
    authorId: "1",
    createdAt: new Date("2024-01-01").toISOString(),
  },
  {
    id: "2",
    title: "Second Post",
    content: "Another post",
    authorId: "2",
    createdAt: new Date("2024-01-02").toISOString(),
  },
];

// Users API (port 8001)
function startUsersAPI() {
  Deno.serve({ port: 8001 }, (req) => {
    const url = new URL(req.url);

    if (url.pathname === "/users" && req.method === "GET") {
      return Response.json(users);
    }

    return new Response("Not Found", { status: 404 });
  });
  console.log("Users API running on http://localhost:8001");
}

// Posts API (port 8002)
function startPostsAPI() {
  Deno.serve({ port: 8002 }, async (req) => {
    const url = new URL(req.url);

    if (url.pathname === "/posts" && req.method === "GET") {
      return Response.json(posts);
    }

    if (url.pathname === "/posts" && req.method === "POST") {
      const body = await req.json();
      const newPost = {
        id: String(posts.length + 1),
        title: body.title,
        content: body.content,
        authorId: body.authorId,
        createdAt: new Date().toISOString(),
      };
      posts.push(newPost);
      return Response.json(newPost, { status: 201 });
    }

    const postMatch = url.pathname.match(/^\/posts\/(.+)$/);
    if (postMatch && req.method === "GET") {
      const id = postMatch[1];
      const post = posts.find((p) => p.id === id);
      if (post) {
        return Response.json(post);
      }
      return new Response("Not Found", { status: 404 });
    }

    return new Response("Not Found", { status: 404 });
  });
  console.log("Posts API running on http://localhost:8002");
}

// Start both servers
startUsersAPI();
startPostsAPI();
