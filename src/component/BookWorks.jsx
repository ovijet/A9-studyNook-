import React from "react";
import { FaBookReader, FaBusinessTime } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";


const Book= [{
    id:1,
    title:'Browse Rooms',
    description:'Filter by floor, capacity, amenities, or hourly rate to find your fit.',
    step:'ster-1',
    icon:<IoSearch/> 
},{
      id:2,
    title:'Pick a Time',
    description:'Choose a date and an open time slot — well prevent any conflicts.',
    step:'ster-2',

    icon:<FaBusinessTime />
},{
     id:2,
    title:'Study Peacefully',
    description:'Get a confirmation, show up, and focus. Manage everything from your dashboard.',
    step:'ster-3',

    icon:<FaBookReader />
}

]

const BookWorks=()=>{
    return(
        <section className="px-4 sm:px-6 lg:px-10 py-16 bg-[#F7F7F5]">
        <div className="max-w-7xl mx-auto">

          <div className="text-center ">
            <h1 className="text-4xl font-bold ">How It Works</h1>
            <p className="mt-2 text-[17px] text-gray-500"> From browsing to booked in under a minute.</p>
          </div>

           <div className="grid  md:grid-cols-3 item-center text-center gap-3 mt-6">
             {Book.map(item=>(
                 <div
              key={item.id}
              className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-[#FF6900] text-white flex items-center justify-center mx-auto mb-6 text-2xl">
                {item.icon}
              </div>
              <div className="text-center text-[#FF6900]">
                  {item.step}
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold text-[#1E3029] mt-2">
                {item.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {item.description}
              </p>
            </div>
            ))}
           </div>

         </div>
   
        </section>
    )
}

export default BookWorks