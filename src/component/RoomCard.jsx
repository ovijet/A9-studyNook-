import Image from "next/image";
import React from "react";

const RoomCard = ({ books }) => {
    const {id, image,roomName,description,floor,capacity,hourlyRate}=books
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
         <Image
         src={image}
         width={300}
         height={300}
         alt="dddddd"
         />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            Card Title
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">Fashion</div>
            <div className="badge badge-outline">Products</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
