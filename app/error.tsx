'use client'

export default function Error({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center">
      <h2 className="text-xl font-semibold">
        Something went wrong ⚠️
      </h2>

      <p className="text-gray-500 mt-2">
        We couldn't load products right now.
      </p>

      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-black text-white rounded"
      >
        Try again
      </button>
    </div>
  )
}