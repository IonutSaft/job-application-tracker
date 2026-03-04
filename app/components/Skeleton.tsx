"use client";

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="h-6 w-20 bg-gray-200 rounded"></div>
      </div>

      <div className="h-16 bg-gray-100 rounded mb-4"></div>

      <div className="flex items-center justify-between mb-4">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>

      <div className="h-10 bg-gray-200 rounded mb-3"></div>

      <div className="flex gap-2 pt-4 border-t border-gray-200">
        <div className="flex-1 h-10 bg-gray-200 rounded"></div>
        <div className="flex-1 h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-10 bg-gray-100 rounded"></div>
        </div>
      ))}
      <div className="flex gap-3 pt-4">
        <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="bg-blue-100 rounded-lg p-4 text-center animate-pulse"
        >
          <div className="h-8 bg-blue-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-blue-200 rounded w-full"></div>
        </div>
      ))}
    </div>
  );
}
