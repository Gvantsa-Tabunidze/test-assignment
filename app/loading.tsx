'use client'

export default function Loading() {
  return (
    <div className="p-6 grid grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-40 bg-gray-200 animate-pulse rounded-lg"
        />
      ))}
    </div>
  )
}