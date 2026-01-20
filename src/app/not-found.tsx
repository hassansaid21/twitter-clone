import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-4xl font-bold text-white mb-4">Page not found</h1>
      <p className="text-textGray text-lg mb-8 text-center">
        Hmm...this page doesn't exist. Try searching for something else.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-iconBlue text-white font-bold rounded-full hover:bg-blue-600 transition-colors"
      >
        Go to Home
      </Link>
    </div>
  );
}
