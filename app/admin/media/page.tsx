"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default function AdminMediaPage() {
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [images, setImages] = useState<any[]>([]);

    useEffect(() => {
        loadImages();
    }, []);

    async function uploadImage(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = e.target.files?.[0];

        if (!file) return;

        setUploading(true);

        const fileName =
            Date.now() + "-" + file.name;

        const { error } = await supabase.storage
            .from("media")
            .upload(fileName, file);

        if (error) {
            alert("Upload selhal.");
            console.error(error);
            setUploading(false);
            return;
        }

        const {
            data: { publicUrl },
        } = supabase.storage
            .from("media")
            .getPublicUrl(fileName);

        setImageUrl(publicUrl);
        await loadImages();
        setUploading(false);
    }
    async function loadImages() {
        const { data, error } = await supabase.storage
            .from("media")
            .list("", {
                limit: 100,
                offset: 0,
            });

        if (error) {
            console.error(error);
            return;
        }

        setImages(data || []);
    }

    return (
        <main className="min-h-screen bg-black text-white">

            <div className="max-w-7xl mx-auto p-10">

                <div className="flex justify-between items-center mb-10">

                    <div>
                        <p className="text-red-500 uppercase tracking-[0.3em]">
                            U8 Divisione
                        </p>

                        <h1 className="text-5xl font-black">
                            Správa médií
                        </h1>
                    </div>

                    <Link
                        href="/admin"
                        className="border border-red-600 px-6 py-3 rounded-xl hover:bg-red-600 transition"
                    >
                        Dashboard
                    </Link>

                </div>

                <div className="border border-red-900 rounded-2xl p-10 bg-black/70">

                    <h2 className="text-3xl font-black mb-8">
                        Upload obrázku
                    </h2>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={uploadImage}
                        className="mb-6"
                    />

                    {uploading && (
                        <p>Nahrávám...</p>
                    )}

                    {imageUrl && (
                        <div className="space-y-4">

                            <img
                                src={imageUrl}
                                alt="Preview"
                                className="max-w-lg rounded-xl border border-red-900"
                            />

                            <input
                                value={imageUrl}
                                readOnly
                                className="w-full bg-black border border-red-900 rounded-xl p-4"
                            />

                        </div>

                    )}
                    <div className="mt-12">

                        <h2 className="text-3xl font-black mb-6">
                            Galerie médií
                        </h2>

                        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-6">

                            {images.map((image) => {

                                const {
                                    data: { publicUrl },
                                } = supabase.storage
                                    .from("media")
                                    .getPublicUrl(image.name);

                                return (
                                    <div
                                        key={image.name}
                                        className="border border-red-900 rounded-xl overflow-hidden"
                                    >

                                        <img
                                            src={publicUrl}
                                            alt={image.name}
                                            className="w-full h-52 object-cover"
                                        />

                                        <div className="p-4">

                                            <p className="text-xs text-gray-500 break-all mb-3">
                                                {image.name}
                                            </p>

                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(
                                                        publicUrl
                                                    );

                                                    alert("URL zkopírována.");
                                                }}
                                                className="w-full border border-green-600 rounded-lg py-2 hover:bg-green-600 transition"
                                            >
                                                📋 Kopírovat URL
                                            </button>
                                            <button
                                                onClick={async () => {

                                                    const confirmed = confirm(
                                                        "Opravdu smazat obrázek?"
                                                    );

                                                    if (!confirmed) return;

                                                    const { error } =
                                                        await supabase.storage
                                                            .from("media")
                                                            .remove([image.name]);

                                                    if (error) {
                                                        alert("Mazání selhalo.");
                                                        return;
                                                    }

                                                    loadImages();

                                                }}
                                                className="w-full mt-2 border border-red-600 rounded-lg py-2 hover:bg-red-600 transition"
                                            >
                                                🗑️ Smazat
                                            </button>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}