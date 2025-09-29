import React from 'react'
import Input from '../elements/Input'
import { SearchIcon, type LucideIcon } from 'lucide-react'

function SearchBar({Icon, placeholder, onPress, input, setInput}: {
    Icon: LucideIcon,
    placeholder: string,
    onPress?: () => void,
    input: string,
    setInput: any
}) {
  return (
    <div className='w-full flex justify-between gap-3'>
        <Input 
        placeholder={placeholder}
        setValue={setInput}
        title='For jobs'
        value={input}
        type='text'
        Icon={Icon}
        />
        <div className='w-16 h-12 bg-primary rounded-lg flex justify-center items-center'>
            <SearchIcon  className='text-white' size={18} onClick={onPress}/>
        </div>
    </div>
  )
}

export default SearchBar