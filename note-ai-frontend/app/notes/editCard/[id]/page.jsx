"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function EditNotePage() {
  const { id } = useParams(); // noteId
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

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

        setTitle(res.data.note.title || "");
        setContent(res.data.note.content || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleUpdate = async () => {
    if (!content.trim()) return;

    setSaving(true);
    try {
      const token = localStorage.getItem("token");

      await api.patch(
        `/notes/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push("/notes");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-500">Loading note...</p>;
  }

   const handleAIEnhance = async () => {
    if (!content.trim()) return;

    setAiLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/ai/enhance",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.enhancedText) {
        setContent(res.data.enhancedText);
      }
    } catch (err) {
      console.error("AI enhance failed", err);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader className="flex justify-between ">
          <CardTitle>Edit Note</CardTitle>
          <Button
              onClick={handleAIEnhance}
              variant="outline"
              disabled={aiLoading}
              className="text-gray-300 mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-sky-100"
            >
              <Sparkles className="w-4 h-4 mr-2 text-sky-200" />
              {aiLoading ? "Improving..." : "Improve with AI"}
            </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
          />

          <div className="flex gap-3">
            <Button onClick={handleUpdate} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>

            <Button
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
