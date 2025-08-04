// src/components/InsightCard.jsx

import { Card } from "@/components/ui/card"

export default function InsightCard({ title, onClick, subtitle }) {
  return (
    <Card
      className="cursor-pointer hover:shadow-2xl hover:shadow-amber-800/50 transition-all p-4 hover:scale-105 border-1 border-amber-200 shadow-amber-500/20 shadow-lg"
      onClick={onClick}
    >
      <h3 className="text-lg font-bold mb-2 line-clamp-2">{title}</h3>
      {subtitle && (
        <p className="text-sm text-gray-200 line-clamp-2">{subtitle}</p>
      )}
      <div className="mt-3 flex items-center text-amber-600 text-sm font-medium">
        <span>View Analysis</span>
        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Card>
  )
}