'use client'

import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const SearchInput = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('search') || '')

  //debounced search
  useEffect(() => {
  const timeout = setTimeout(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (value.trim()) params.set('search', value.trim())
    else params.delete('search')

    params.set('page', '1')

    router.push(`?${params.toString()}`)
  }, 500)

  return () => clearTimeout(timeout)
}, [value])




  return (
    <div className="flex w-full max-w-3xl mx-auto gap-2">
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Search products..."
        className="w-full"
      />
    </div>

  )
}

export default SearchInput