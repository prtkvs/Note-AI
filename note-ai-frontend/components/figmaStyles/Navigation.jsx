import { Button } from "@/components/ui/button";

export function Navigation() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-indigo-900 from-gray-900 via-blue-900 to-indigo-900">Note AI</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="text-sm">
            Login
          </Button>
          <Button className="text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            Register
          </Button>
        </div>
      </div>
    </nav>
  );
}
