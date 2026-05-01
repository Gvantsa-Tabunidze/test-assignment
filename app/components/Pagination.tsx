
'use client'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
  totalPages: number
  currentPage: number
  totalItems: number
}

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50]

const Pagination = ({ totalPages, currentPage, totalItems }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const goTo = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
  }

  const changePErPage = (perPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('per_page', perPage.toString())
    params.set('page', '1') // reset to page 1 when changing limit
    router.push(`?${params.toString()}`)
  }

  const currentPerPage = Number(searchParams.get('per_page') || 10)

  return (
    <div className="flex items-center justify-between p-6 mt-16">
      
      {/* per page selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Rows per page:</span>
        <select
          value={currentPerPage}
          onChange={e => changePErPage(Number(e.target.value))}
          className="border rounded p-1 text-sm"
        >
          {ITEMS_PER_PAGE_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <span className="text-sm text-gray-500">of {totalItems} items</span>
      </div>

      {/* page navigation */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => goTo(1)}
          disabled={currentPage <= 1}
          className="px-2 py-1 border rounded text-sm disabled:opacity-40"
        >
          «
        </button>
        <button
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-3 py-1 border rounded text-sm disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-sm px-2">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-3 py-1 border rounded text-sm disabled:opacity-40"
        >
          Next
        </button>
        <button
          onClick={() => goTo(totalPages)}
          disabled={currentPage >= totalPages}
          className="px-2 py-1 border rounded text-sm disabled:opacity-40"
        >
          »
        </button>
      </div>

    </div>
  )
}

export default Pagination