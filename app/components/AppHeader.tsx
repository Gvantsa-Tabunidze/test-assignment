'use client'

import { Button } from "@/components/ui/button"
import ModeToggle from "./ModeToggle"
import { Plus } from "lucide-react"
import SearchInput from "./SearchInput"
import { useState } from "react"
import UploadForm from "./UploadForm"

const AppHeader = () => {
    const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className="flex w-full p-20 border border-b items-center">
      <nav className="flex justify-between w-full">
        <span className="ml-6"><ModeToggle/></span>
        <SearchInput/>
        <Button variant='default' className="mr-6" onClick={() => setModalOpen(true)}><span className="flex gap-2 items-center"><Plus />Add product</span></Button>
      </nav>
      {modalOpen && <UploadForm onClose={()=>setModalOpen(false)}/>}
    </div>
  )
}

export default AppHeader
