'use client';

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { LogOut, Grid, Lock, Heart, Edit3, Camera, Save, X } from "lucide-react";

export default function MyProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState("posts");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  // ESTADO: Ahora los posts vendrán de la Base de Datos
  const [posts, setPosts] = useState<any[]>([]);
  const [stats, setStats] = useState({ fans: 0, likes: 0, posts: 0 });

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [editForm, setEditForm] = useState({
    name: "",
    username: "",
    bio: "",
    avatarUrl: "",
    coverUrl: ""
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  // --- CARGA DE DATOS REALES ---
  useEffect(() => {
    if (session?.user?.email) {
      // 1. Cargar datos del formulario
      setEditForm(prev => ({
        ...prev,
        name: session.user?.name || "",
        username: session.user?.email?.split('@')[0] || "",
        bio: "Creador de contenido en TTFans. ¡Bienvenido a mi perfil oficial! ✨",
        avatarUrl: session.user?.image || ""
      }));

      // 2. PEDIR LOS POSTS A LA BASE DE DATOS (NUEVO)
      fetch(`/api/user/posts?email=${session.user.email}`)
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data)) {
                // Mapeamos los datos para que coincidan con lo que espera el diseño
                const formattedPosts = data.map(post => ({
                    ...post,
                    imageUrl: post.videoUrl // Usamos el campo videoUrl que guardamos
                }));
                setPosts(formattedPosts);
            }
        })
        .catch(err => console.error("Error cargando posts:", err));

      // 3. Pedir Estadísticas
      fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session.user.email })
      })
      .then(res => res.json())
      .then(data => {
        if (data.fansCount !== undefined) {
            setStats({
                fans: data.fansCount,
                likes: data.likesCount,
                posts: data.postsCount // Ahora sí usamos el contador real de la DB
            });
        }
      })
      .catch(err => console.error("Error cargando stats:", err));
    }
  }, [session]);

  // ... (El resto de funciones de imagen y guardado siguen igual) ...
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'cover') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm(prev => ({
          ...prev,
          [type === 'avatar' ? 'avatarUrl' : 'coverUrl']: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    await update({
        ...session,
        user: {
            ...session?.user,
            name: editForm.name,
            image: editForm.avatarUrl
        }
    });
    setIsEditing(false);
  };

  if (status === "loading" || !session) {
    return <div className="min-h-screen bg-black flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-pink-500"></div></div>;
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      <input type="file" ref={avatarInputRef} hidden accept="image/*" onChange={(e) => handleImageChange(e, 'avatar')} />
      <input type="file" ref={coverInputRef} hidden accept="image/*" onChange={(e) => handleImageChange(e, 'cover')} />

      <main className="flex-1 overflow-y-auto overflow-x-hidden bg-black pb-24">
        {/* PORTADA */}
        <div className="relative h-40 w-full group overflow-hidden">
            {editForm.coverUrl ? (
                <img src={editForm.coverUrl} className="w-full h-full object-cover" alt="Portada" />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"></div>
            )}
            {isEditing && (
                <button onClick={() => coverInputRef.current?.click()} className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="bg-black/50 p-3 rounded-full backdrop-blur-md flex items-center gap-2"><Camera className="w-6 h-6" /><span className="font-medium text-sm">Cambiar Portada</span></div>
                </button>
            )}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
                {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} className="p-2 bg-black/40 rounded-full hover:bg-black/60 text-white backdrop-blur-md"><Edit3 className="w-5 h-5" /></button>
                ) : (
                    <div className="flex gap-2">
                        <button onClick={() => setIsEditing(false)} className="p-2 bg-red-500/80 rounded-full text-white"><X className="w-5 h-5"/></button>
                        <button onClick={handleSave} className="p-2 bg-green-500/80 rounded-full text-white"><Save className="w-5 h-5"/></button>
                    </div>
                )}
                <button onClick={() => signOut({ callbackUrl: "/auth/login" })} className="p-2 bg-black/40 rounded-full hover:bg-black/60 text-red-400 backdrop-blur-md"><LogOut className="w-5 h-5" /></button>
            </div>
        </div>

        {/* INFO PERFIL */}
        <div className="px-4 relative -top-16 flex flex-col items-center">
            <div className="relative group">
                <img src={editForm.avatarUrl || "/placeholder.svg"} alt="Perfil" className="w-32 h-32 rounded-full border-4 border-black object-cover bg-gray-800" />
                {isEditing && <button onClick={() => avatarInputRef.current?.click()} className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"><Camera className="w-8 h-8" /></button>}
            </div>

            <div className="text-center mt-3 w-full max-w-xs">
                {isEditing ? (
                    <div className="space-y-3 mt-2">
                        <input value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-center text-white font-bold" placeholder="Nombre" />
                        <div className="flex items-center gap-1 bg-gray-900 border border-gray-700 rounded p-2"><span className="text-gray-500">@</span><input value={editForm.username} onChange={(e) => setEditForm({...editForm, username: e.target.value})} className="bg-transparent w-full text-white outline-none" placeholder="usuario" /></div>
                        <textarea value={editForm.bio} onChange={(e) => setEditForm({...editForm, bio: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-center text-sm text-gray-300 min-h-[80px]" placeholder="Tu biografía..." />
                    </div>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold flex items-center justify-center gap-2 text-white">{editForm.name}<svg className="w-5 h-5 text-blue-400 fill-current" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg></h1>
                        <p className="text-gray-400 text-sm mt-1">@{editForm.username}</p>
                        <p className="text-gray-300 text-sm mt-3 leading-relaxed">{editForm.bio}</p>
                    </>
                )}
            </div>

            <div className="flex justify-center gap-8 mt-6 w-full border-b border-gray-800 pb-6">
                <div className="text-center"><div className="text-lg font-bold text-white">{stats.posts}</div><div className="text-xs text-gray-500 uppercase">Posts</div></div>
                <div className="text-center"><div className="text-lg font-bold text-white">{stats.fans}</div><div className="text-xs text-gray-500 uppercase">Fans</div></div>
                <div className="text-center"><div className="text-lg font-bold text-white">{stats.likes}</div><div className="text-xs text-gray-500 uppercase">Likes</div></div>
            </div>

            <div className="w-full mt-6 px-4">
                <Link href="/create"><button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-pink-900/20">+ Crear Nuevo Post</button></Link>
            </div>
        </div>

        {/* TABS Y GRID */}
        <div className="mt-4 sticky top-0 bg-black z-10">
            <div className="flex border-b border-gray-800">
                <button onClick={() => setActiveTab("posts")} className={`flex-1 py-4 flex justify-center border-b-2 transition-all ${activeTab === "posts" ? "border-pink-500 text-pink-500" : "border-transparent text-gray-500"}`}><Grid className="w-5 h-5" /></button>
                <button onClick={() => setActiveTab("exclusive")} className={`flex-1 py-4 flex justify-center border-b-2 transition-all ${activeTab === "exclusive" ? "border-pink-500 text-pink-500" : "border-transparent text-gray-500"}`}><Lock className="w-5 h-5" /></button>
                <button onClick={() => setActiveTab("likes")} className={`flex-1 py-4 flex justify-center border-b-2 transition-all ${activeTab === "likes" ? "border-pink-500 text-pink-500" : "border-transparent text-gray-500"}`}><Heart className="w-5 h-5" /></button>
            </div>
        </div>

        <div className="grid grid-cols-3 gap-0.5 mt-0.5 min-h-[300px]">
            {posts.length > 0 ? (
                posts.map((post: any, i: number) => (
                    <div key={i} className="aspect-[3/4] relative bg-gray-900 group cursor-pointer overflow-hidden" onClick={() => setSelectedPost(post)}>
                        {post.imageUrl?.includes('post') || post.imageUrl?.endsWith('.mp4') ? (
                             <video src={post.imageUrl} className="w-full h-full object-cover" />
                        ) : (
                             <img src={post.imageUrl} alt="Post" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                        )}
                    </div>
                ))
            ) : (
                <div className="col-span-3 py-20 flex flex-col items-center text-gray-500">
                    <Grid className="w-10 h-10 mb-2 opacity-20" />
                    <p>Aún no has subido contenido.</p>
                </div>
            )}
        </div>
      </main>

      <BottomNav />

      {/* MODAL FULLSCREEN */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedPost(null)}>
            <button className="absolute top-4 right-4 p-3 bg-black/50 rounded-full text-white hover:bg-gray-800 transition-colors z-10" onClick={(e) => { e.stopPropagation(); setSelectedPost(null); }}><X className="w-6 h-6" /></button>
            <div className="relative w-full max-w-3xl max-h-full aspect-[3/4] flex items-center justify-center rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {selectedPost.imageUrl?.includes('post') || selectedPost.imageUrl?.endsWith('.mp4') ? (
                    <video src={selectedPost.imageUrl} className="w-full h-full object-contain" controls autoPlay />
                ) : (
                    <img src={selectedPost.imageUrl} alt="Fullscreen" className="w-full h-full object-contain" />
                )}
            </div>
        </div>
      )}
    </div>
  );
}
