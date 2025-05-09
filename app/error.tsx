"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-400">Error</h1>

        {/* <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Unauthroized!
        </p> */}

        <p className="mt-4 text-gray-500">
          {error.message || "You must be logged in to access the page"}
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 inline-block cursor-pointer rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
