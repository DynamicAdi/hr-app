import { Computer } from 'lucide-react'
import React from 'react'

function Category({cat, val, setVal}: {cat: any, val: string, setVal: (val: string) => void}) {

  const handleClick = (value: string) => {
    if (val === value) {
      setVal("All")
    } else {
      setVal(value)
    }
  }
  return (
    <div className='w-full grid place-items-start'>
        <h2 className='text-xl py-2 font-semibold text-left'>Browse by Category</h2>
        <div className="w-full flex justify-start items-start gap-2.5 flex-wrap">
        {
            cat.length > 0 && cat.map((items: {department: string, count: number}, i:number) => (
            <div key={i} onClick={() => handleClick(items.department)} className={`w-[31%] rounded-xl ${val === items.department ? "bg-primary text-white border-transparent" : "text-neutral-600 border-neutral-300"} h-24 border flex justify-center flex-col items-center`}>
                {/* <Computer size={18}/> */}
                <h2 className='text-base font-semibold mt-2'>{items.department}</h2>
                <p className='text-xs'>{items.count}</p>
            </div>
            ))
        }


        </div>
    </div>
  )
}

export default Category