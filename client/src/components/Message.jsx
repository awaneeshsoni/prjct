import React from "react";

export default function Message(props){

    const formatDate = (dateString) => {
    try{
      const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "Invalid Date";
          }
      return date.toLocaleString();
    }
    catch(error){
        console.log(error)
      return "Invalid Date";
    }
  };
    return(
        <div className="flex flex-col justify-between bg-white rounded-lg shadow-md  w-60 mt-4 py-4 px-2 ">
            <div className="flex flex-row justify-between">
            <p>Message ↓</p>
            <div className="flex flex-row text-sm">
            <p className="text-orange-400">{props.page}</p>
            </div>
            </div>
            <p className=" text-black">{props.message}</p>
            <p className=" text-gray-700 text-sm">
            <span className="">Posted at:</span> {formatDate(props.createdAt)}
            </p>
        </div>
    )
}