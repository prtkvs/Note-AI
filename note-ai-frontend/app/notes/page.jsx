"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateNoteDialog from "@/components/CreateNoteDialog";
import Link from "next/link";

export default function NotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleNoteCreated = (newNote) => {
  setNotes((prev) => [newNote, ...prev]);
};


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/users/login");
      return;
    }

const fetchNotes = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.get("/notes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setNotes(res.data.notes); 
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


    fetchNotes();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading notes...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold  text-indigo-900">Your Notes</h1>
      <CreateNoteDialog onNoteCreated={handleNoteCreated} />
    </div>

      {notes.length === 0 ? (
        <p className="text-gray-500">No notes yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map((note) => (
            //   we are using noteId as unique identifier
            <Link href={`/notes/noteCard/${note.noteId}`} key={note.noteId}>
            <Card key={note.noteId}>  
              <CardHeader>
                <CardTitle  className="text-indigo-900">
                  {note.title || "Untitled"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {note.content}
                </p>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
