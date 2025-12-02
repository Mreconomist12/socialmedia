// app/api/user/posts/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    // Obtenemos el email de la URL (ej: /api/user/posts?email=tu@gmail.com)
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    // Buscamos los posts de ese usuario en la base de datos real
    const posts = await prisma.post.findMany({
      where: {
        user: { email: email }
      },
      orderBy: {
        createdAt: 'desc' // Los más nuevos primero
      }
    });

    return NextResponse.json(posts);

  } catch (error) {
    return NextResponse.json({ error: "Error al cargar posts" }, { status: 500 });
  }
}