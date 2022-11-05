import React from 'react'

export default function TaskCard(props) {
  let onTaskCardClick = (e) => {
    console.log(`hello there`);
  }
  return (
    <>
      <div className={`${props.name.toLowerCase() !== "missi chen xxx" ? "cursor-pointer" : ""}`}>
        <div
          onClick={onTaskCardClick}
          className={
            `m-4 p-10 flex flex-col items-center text-center group md:lg:xl:border-r md:lg:xl:border-b border-gray-300}
            ${props.name.toLowerCase() !== "missi chen xxx" ? "hover:bg-gray-100" : "bg-gray-200"}
            `
          }
          data-aos="flip-left"
          data-aos-duration="1500"
          data-aos-delay={props.ind * 100}

        >
          <span className="p-5 rounded-full bg-slate-50 text-white shadow-lg shadow-gray-400">
            <img src={"https://avatars.dicebear.com/api/avataaars/" + Math.floor(Math.random() * 100) + ".svg"} className="h-16" />
          </span>
          <p className="text-xl font-medium text-slate-700 mt-3">{props.name}</p>
          <p className="mt-2 text-sm text-slate-500">{props.dept}</p>
          { 
            props.name.toLowerCase() !== "missi chen xxx" ? 
            <div className='border mt-4 cursor-pointer px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-700 text-white'>Hello There!</div> : 
            <div className='border border-12 mt-4 cursor-pointer px-5 py-2 rounded-lg bg-green-500 hover:bg-green-700 text-white '>Be My Friend!</div> 
          }
        </div>
      </div>
    </>
  )
}
