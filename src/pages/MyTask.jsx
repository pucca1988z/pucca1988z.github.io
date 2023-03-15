import React, {useEffect} from "react";
import TaskCard from "../components/TaskCard";
import { useState } from "react";

// for testing 
import demoData from "../data/demo-task-card.json"


export default function MyTask() {
	const [taskData, setTaskData] = useState(demoData)
	const [count, setCount] = useState(0)

	let onDataChange = (name, status) => {
		setTaskData(
			taskData.map( t => {
				if(t.name == name) t.status = status;
				return t;
			})
		)
	}

	useEffect(()=>{
		setCount( taskData.filter( t => t.status == false).length)
	},[taskData]);
	
	return (
		<>
			<div className="mx-auto max-w-9xl my py-4 sm:px-6 lg:px-8">
				<div class="flex justify-center items-center h-12 bg-gray-200">
					<p class="text-gray-700">請在一週內認識這{count}位新朋友!</p>
				</div>
				<div className=" h-fit py-6 px-2 rounded-lg border-4 border-dashed border-gray-200">
					<div className="grid grid-cols-1 md:lg:xl:grid-cols-5 group bg-white shadow-xl shadow-neutral-100  ">
						{taskData.map( (t, ind) => <TaskCard onDataChange={onDataChange} key={ind} ind={ind} name={t.name} dept={t.dept} status={t.status}></TaskCard>)}
					</div>
				</div>
			</div>
		</>
	);
}
