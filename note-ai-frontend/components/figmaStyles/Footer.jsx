export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-8 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-gray-600">
          Built with Next.js, Express, MongoDB with copyright &copy; {currentYear} All rights reserved
        </p>
      </div>
    </footer>
  );
}
