import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileEdit, Edit3, Sparkles } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: FileEdit,
      title: "Create Notes",
      description:
        "Write and save notes quickly with an intuitive interface designed for speed and simplicity.",
    },
    {
      icon: Edit3,
      title: "Edit & Organize",
      description:
        "Update and organize your notes anytime with powerful editing and categorization tools.",
    },
    {
      icon: Sparkles,
      title: "AI Ready",
      description:
        "Built for future AI enhancements to help you work smarter and more efficiently.",
    },
  ];

  return (
    <section className="w-full py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
