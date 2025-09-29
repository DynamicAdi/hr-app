import { User2, type LucideIcon } from 'lucide-react'
import React from 'react'

function Input({placeholder, title, type="text", Icon, value, setValue}: {
  placeholder: string
  title: string
  type?: string
  Icon?: LucideIcon
  value: string
  setValue: (val: string) => void
}) {
  return (
    <div className='relative flex justify-start items-center w-full bg-white border-2 border-gray-300 py-3 px-4 rounded-xl gap-2'>
    {
      Icon &&
    <Icon size={22} color={"#99a1af"} />
    }
    <input placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} type={type} name={title} className='border-none outline-none placeholder:text-sm w-full' />
    </div>
  )
}

export default Input