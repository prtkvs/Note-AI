"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NoteDetailPage() {
  const { id } = useParams(); // this is noteId
  const router = useRouter();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/users/login");
      return;
    }

    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNote(res.data.note);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading note...</p>;
  }

  if (!note) {
    return <p className="p-6 text-red-500">Note not found</p>;
  }

  const handleDelete = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this note?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    await api.delete(`/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    router.push("/notes");
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Button
        variant="outline"
        className="mb-4"
        onClick={() => router.back()}
      >
        ← Back
      </Button>

      <Card>
        <CardHeader>
            <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-2xl font-bold text-indigo-900">{note.title}</CardTitle>
          <div className="flex items-center gap-2">
          <Button className="ml-2 text-white bg-indigo-600" onClick={() => router.push(`/notes/editCard/${id}`)}>
        Edit
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
        Delete
        </Button>
        {/* <Button className="ml-2 text-white bg-indigo-600" onClick={}>
        gemini logo
        </Button> */}
        </div>
        </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 whitespace-pre-wrap">
            {note.content}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
