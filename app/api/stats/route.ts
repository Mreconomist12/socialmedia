import { NextResponse } from "next/server";
// CAMBIO IMPORTANTE: Usamos la ruta relativa para asegurar que encuentre la DB
import { prisma } from "../../../lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        _count: {
          select: {
            posts: true,
            followedBy: true,
          }
        },
        posts: {
            include: {
                _count: {
                    select: { likes: true }
                }
            }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    // Calculamos el total de likes
    const totalLikes = user.posts.reduce((acc, post) => acc + post._count.likes, 0);

    return NextResponse.json({
      postsCount: user._count.posts,
      fansCount: user._count.followedBy,
      likesCount: totalLikes
    });

  } catch (error) {
    console.error("Error API Stats:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}