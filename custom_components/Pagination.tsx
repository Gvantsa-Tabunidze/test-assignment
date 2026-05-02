
'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Props = {
  totalPages: number
  currentPage: number
  totalItems: number
}

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50]

const AppPagination = ({ totalPages, currentPage, totalItems }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const goTo = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
  }

  const changePerPage = (perPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('per_page', perPage.toString())
    params.set('page', '1') // reset to page 1 when changing limit
    router.push(`?${params.toString()}`)
  }

  const currentPerPage = Number(searchParams.get('per_page') || 10)

  
return (
    <div className="flex items-center justify-between p-6 mt-16">

      {/* per page selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Items per page:</span>
        <Select value={currentPerPage.toString()} onValueChange={(value) => changePerPage(Number(value))}>
          <SelectTrigger className="w-[70px] h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ITEMS_PER_PAGE_OPTIONS.map(option => (
              <SelectItem key={option} value={option.toString()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">out of {totalItems}</span>
      </div>

      {/* shadcn pagination */}
      <Pagination className="w-auto mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => goTo(currentPage - 1)}
              aria-disabled={currentPage <= 1}
              className={currentPage <= 1 ? 'pointer-events-none opacity-40' : 'cursor-pointer'}
            />
          </PaginationItem>

          <PaginationItem>
            <span className="text-sm px-4 py-2 text-muted-foreground">
              {currentPage} / {totalPages}
            </span>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() => goTo(currentPage + 1)}
              aria-disabled={currentPage >= totalPages}
              className={currentPage >= totalPages ? 'pointer-events-none opacity-40' : 'cursor-pointer'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

    </div>
  )
}

export default AppPagination