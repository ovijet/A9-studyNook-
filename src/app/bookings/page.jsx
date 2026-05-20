// import MyBookingDetails from '@/component/MyBookingDetails';
// import { auth } from '@/lib/auth';
// import { headers } from 'next/headers';
// import React from 'react';

// const MyBooking = async() => {

// const session = await auth.api.getSession({
//     headers: await headers() // you need to pass the headers object.
// })

// const user =session?.user

// console.log(user);

// const res =await fetch(`http://localhost:5000/booking/${user?.id}`)

// const bookingData =await res.json()
// console.log(bookingData);

//     return (
//         <div>
//             <h1>mybooks</h1>

//             <div>
//                 {
//                 // bookingData.map(booking=> <MyBookingDetails key={booking._id} booking={booking}/>)
//                 }
//             </div>
//         </div>
//     );
// };

// export default MyBooking;

"use client";

import React, { useEffect, useState } from "react";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/booking")
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <div className="">
      <h1 className="text-3xl font-bold">My Bookings</h1>

      <div className="grid gap-5">
        {bookings.map((item) => (
          <div key={item._id} >
            <h1>{item.name}</h1>

            <p>{item.email}</p>

            <p>{item.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
