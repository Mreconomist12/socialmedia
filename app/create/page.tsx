'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'; // Lo necesitamos para obtener el email
import { 
    ArrowLeft, 
    Video, 
    CheckCircle, 
    AlertCircle,
    Loader,
    Lock,
    X
} from 'lucide-react';
import { BottomNav } from '@/components/navigation/bottom-nav';

// Componente Toast simple para avisos
const Toast = ({ message, type }: { message: string, type: 'success' | 'error' }) => (
    <div className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 p-3 rounded-xl shadow-lg flex items-center gap-2 z-50 transition-opacity duration-300 ${type === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white`}>
        {type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
        <span>{message}</span>
    </div>
);

export default function CreatePostPage() {
    const router = useRouter();
    const { data: session } = useSession(); 
    
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [caption, setCaption] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handlePublish = async () => {
        // Validación básica
        if (!file || isSubmitting || !session?.user?.email) {
            setToast({ message: "Selecciona un archivo y asegúrate de estar logueado.", type: 'error' });
            setTimeout(() => setToast(null), 3000);
            return;
        }

        setIsSubmitting(true);
        setToast(null);

        try {
            // 1. Construir el objeto FormData (necesario para enviar archivos)
            const formData = new FormData();
            formData.append('file', file);
            formData.append('caption', caption);
            formData.append('email', session.user.email); // Enviamos el email para que el backend identifique al usuario

            // 2. Enviar el archivo a la API de Subida
            const response = await fetch('/api/upload', {
                method: 'POST',
                // FormData maneja el encabezado Content-Type automáticamente
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                // Éxito: Post guardado en Supabase y Prisma
                setToast({ message: "¡Post publicado con éxito!", type: 'success' });
                
                // Limpiar y redirigir
                setFile(null);
                setPreviewUrl(null);
                setCaption('');
                
                // Limpiamos el localStorage solo para que los posts viejos no aparezcan por error
                localStorage.removeItem('posts'); 

                setTimeout(() => {
                    setToast(null);
                    router.push('/profile'); // Volvemos a tu perfil
                }, 1500);

            } else {
                // Error en la API
                setToast({ message: data.error || "Fallo en la publicación.", type: 'error' });
                console.error("Error al publicar:", data.details || data.error);
            }

        } catch (error) {
            console.error('Error de red/petición:', error);
            setToast({ message: "Error de conexión. Intenta de nuevo.", type: 'error' });
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setToast(null), 3000);
        }
    };
    
    // ... Código de Renderizado ...

    return (
        <div className="fixed inset-0 bg-black flex flex-col">
            <header className="flex items-center justify-between p-4 border-b border-gray-800">
                <button onClick={() => router.back()} className="text-white hover:text-pink-500">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold text-white">Crear Nuevo Post</h1>
                <button 
                    onClick={handlePublish}
                    disabled={!file || isSubmitting}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                        file && !isSubmitting ? 'bg-pink-600 text-white hover:bg-pink-700' : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    {isSubmitting ? (
                        <div className="flex items-center gap-2">
                            <Loader className="w-4 h-4 animate-spin" />
                            Subiendo...
                        </div>
                    ) : "Publicar"}
                </button>
            </header>

            <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
                
                {/* Selector de Archivo */}
                <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange} 
                    accept="image/*,video/*"
                    className="hidden"
                />

                {!previewUrl ? (
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="h-64 border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-pink-500 transition-colors"
                    >
                        <Video className="w-10 h-10 mb-2" />
                        <p className="text-lg font-medium">Toca para seleccionar tu video/foto</p>
                        <p className="text-sm mt-1">Formatos: JPG, PNG, MP4</p>
                    </div>
                ) : (
                    <div className="relative h-96 w-full rounded-xl overflow-hidden bg-gray-900 shadow-xl">
                        {file?.type.startsWith('video/') ? (
                            <video src={previewUrl} className="w-full h-full object-cover" controls autoPlay loop />
                        ) : (
                            <img src={previewUrl} alt="Vista previa del post" className="w-full h-full object-cover" />
                        )}
                        <button 
                            onClick={() => {
                                setFile(null);
                                setPreviewUrl(null);
                                if(fileInputRef.current) fileInputRef.current.value = '';
                            }}
                            className="absolute top-3 right-3 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Área de Texto y Opciones */}
                <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Escribe una descripción (máx. 250 caracteres)..."
                    maxLength={250}
                    rows={4}
                    className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-pink-500 focus:border-pink-500 outline-none resize-none"
                />
                <p className="text-right text-sm text-gray-500">{caption.length}/250</p>
                
                {/* Opciones Adicionales (Placeholder) */}
                <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between p-4 bg-gray-900 rounded-xl border border-gray-800">
                        <span className="text-white font-medium flex items-center gap-2">
                            <Lock className="w-5 h-5 text-yellow-400" />
                            Contenido Exclusivo
                        </span>
                        <span className='text-gray-500'>No (por defecto)</span>
                    </div>
                </div>

            </main>

            <BottomNav />
            {toast && <Toast message={toast.message} type={toast.type} />}
        </div>
    );
}