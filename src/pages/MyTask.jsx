import React from "react";
import TaskCard from "../components/TaskCard";
import { useState } from "react";

// for testing 
import demoData from "../data/demo-task-card.json"


export default function MyTask() {
	const [taskData, setTaskData] = useState(demoData)


	return (
		<>
			<div className="mx-auto max-w-9xl my py-4 sm:px-6 lg:px-8">
				<div className=" h-fit py-6 px-2 rounded-lg border-4 border-dashed border-gray-200">
					<div className="grid grid-cols-1 md:lg:xl:grid-cols-5 group bg-white shadow-xl shadow-neutral-100  ">
						{taskData.map( (t, ind) => <TaskCard key={ind} ind={ind} name={t.name} dept={t.dept}></TaskCard>)}
					</div>
				</div>
			</div>
		</>
	);
}
