"use client";

import { useState } from "react";
import api from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

export default function CreateNoteDialog({ onNoteCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const handleCreate = async () => {
    if (!content.trim()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/notes",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Create note response:", res.data);
      onNoteCreated(res.data.note);
      setTitle("");
      setContent("");
      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Note</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Note</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
          />
          <div className="flex justify-around">
            <Button onClick={handleCreate} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button
              onClick={handleAIEnhance}
              variant="outline"
              disabled={aiLoading}
              className="text-gray-300 mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-sky-100"
            >
              <Sparkles className="w-4 h-4 mr-2 text-sky-200" />
              {aiLoading ? "Improving..." : "Improve with AI"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
