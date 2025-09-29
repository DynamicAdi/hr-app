import { LucideShare2, MapPin, TimerIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function JobCard({id, title, Cateogery, location, annualSalary, employeeType, workMode}: {
  id: string
  title: string
  Cateogery: string
  location: string
  // designation: string
  annualSalary: {min: number, max: number, currency: string}
  employeeType: string
  workMode: string
}) 

{
  return (
    <div className='w-full h-40 border border-neutral-200 rounded-2xl p-4 flex justify-start items-start gap-2.5'>
        <div className="h-full w-1/5">
        <div className="w-full h-2/5 rounded-lg bg-primary grid place-items-center text-3xl text-white font-bold">{title[0]}</div>
        </div>
        <div className="relative w-full">
            <div className="w-8 h-8 absolute text-neutral-400 flex justify-center items-center -right-0 -top-1">
                <LucideShare2 size={20} />
            </div>
            <h1 className='text-base font-semibold'>{title}</h1>
            <p className='text-xs font-medium font-sans mt-1 text-neutral-600'>{Cateogery}</p>
            
            <div className="flex pt-3 text-neutral-500 gap-4">
                <div className="flex gap-1 justify-center items-center"><MapPin size={13} /><p className='text-xs '>{location}</p></div>
                <div className="flex gap-1 justify-center items-center"><TimerIcon size={14} /><p className='text-xs capitalize'>{workMode}</p></div>
            </div>
            <h1 className='text-base font-bold pt-1'>₹{annualSalary.min} - ₹{annualSalary.max}</h1>
            <div className="px-2 py-1 bg-orange-600/20 text-orange-700 rounded-sm my-1 w-fit text-xs capitalize">{employeeType}</div>

        <Link to={`/job/${id}`} className="absolute right-2 -bottom-5 w-fit h-fit rounded-lg bg-primary text-white font-semibold py-2 px-4 text-xs">Apply Now</Link>
        </div>
    </div>
  )
}

export default JobCard