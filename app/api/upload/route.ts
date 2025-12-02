import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'; 
import { prisma } from "../../../lib/db"; // Asegúrate de que la ruta relativa sea correcta

// --- CONFIGURACIÓN DIRECTA (Para evitar problemas de lectura del .env) ---
const supabaseUrl = "https://zlbrduunzxtrkacuifcc.supabase.co";
// Asegúrate de que esta clave no tenga espacios ni saltos de línea al copiarla
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsYnJkdXVuenh0cmthY3VpZmNjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDUzOTM1MywiZXhwIjoyMDgwMTE1MzUzfQ.-X92j505DEv4AelznTD9lfXagJ1SeFVRA_bj6VuPwW8";

// Creamos el cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const caption = formData.get('caption') as string | null;
    const email = formData.get('email') as string | null;

    if (!file || !email) {
      return NextResponse.json({ error: "Faltan datos (archivo o email)" }, { status: 400 });
    }

    // 1. Obtener usuario de la Base de Datos
    const user = await prisma.user.findUnique({
        where: { email: email },
        select: { id: true }
    });

    if (!user) {
         return NextResponse.json({ error: "Usuario no encontrado en la DB" }, { status: 404 });
    }
    
    // 2. Preparar el archivo
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileExt = file.name.split('.').pop();
    // Nombre único para evitar colisiones
    const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    
    // 3. SUBIR A SUPABASE
    const { error: uploadError } = await supabase.storage
      .from('user-posts')
      .upload(fileName, buffer, {
        contentType: file.type || 'application/octet-stream',
        upsert: false
      });

    if (uploadError) {
      console.error('Error Supabase Storage:', uploadError);
      return NextResponse.json({ error: 'Error al subir imagen a la nube', details: uploadError.message }, { status: 500 });
    }
    
    // 4. Construir la URL pública
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/user-posts/${fileName}`;

    // 5. Guardar referencia en la Base de Datos (Prisma)
    // Nos aseguramos de usar los nombres de campos correctos según tu schema.prisma
    const newPost = await prisma.post.create({
        data: {
            videoUrl: publicUrl,
            caption: caption || '',
            userId: user.id,
            isLocked: false, // Asegúrate de que este campo exista en tu schema.prisma como 'isLocked' o cámbialo a 'isExclusive' si es necesario
        }
    });

    return NextResponse.json({ success: true, post: newPost });

  } catch (error) {
    console.error('Error General en API:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}