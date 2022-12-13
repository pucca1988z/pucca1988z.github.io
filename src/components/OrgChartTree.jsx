import { useLayoutEffect, useEffect, useRef, useState, React } from 'react';
import useCenteredTree from "./Helper"
import Tree from 'react-d3-tree';
// import orgJson from '../data/org-chart.json';
import deptJson from "../data/dept.json"
import "../App.css"
import PeopleCard from './PeopleCard';
// for testing 
import demoData from "../data/demo-task-card.json"
import orgJson from '../data/dept-tree.json';
import position from "../data/position.json";
import department from "../data/department.json";
import employee from "../data/employee.json"
import * as d3 from 'd3'

const containerStyles = {
	width: "100%",
	height: "100%"
};


const renderCustSvgNode = ({ nodeDatum, toggleNode, taskList,setDeptMember, deptMember, clientPosition, setShowCard, rd3tProps}) => {
	let showWave = taskList.find(item => item.who === nodeDatum.name);
	return (
		<g 
		onContextMenu={ (e) => {
			setDeptMember(deptMember => []);

			let {departmentId} = nodeDatum;
			let managerPositionId = department.value.find( d => d.id === departmentId).managerPositionId;
			position.value.forEach( p => {
				if(p.departmentId === departmentId && p.positionStatus === "A"){ // active member
					let emp = employee.value.find( e => e.id === p.employeeId );
					console.log(emp);
					let userName = emp.name, 
						hireDate = emp.hireDate;
					p.userName = userName;
					p.hireDate = hireDate;
					if(p.id === managerPositionId){
						p.isManager = true ;
						setDeptMember(deptMember => [p, ...deptMember])
					} else {
						p.isManager = false ;
						setDeptMember(deptMember => [...deptMember, p])
					}
				}
			})

			e.preventDefault();
			let x = clientPosition.x, y = clientPosition.y;
			setShowCard(true);

			setTimeout( () => {
				d3.select('#tooltip')
				.style("left", `${ x + 0 }px`)
				.style("top", `${y + 0 }px`)
			}, 10)
		}}
		onClick={toggleNode}
		onMouseEnter={()=>{
		
		}}

		onMouseLeave = {()=>{

		}} 
	>
		{/* todo: show wave icon on the target dept */}
		{/* {true ? <text className="wave" stroke="#FFFFFF" > {nodeDatum.name} 👋</text> : null}  */}
		<text 
			fill="black" 
			strokeWidth="1" 
			x={-0} y={40} 
			transform="rotate(-0)" 
			textAnchor="middle"
		>
			{nodeDatum.name} 
		</text>
		{nodeDatum.attributes?.Department && (
			<text fill="black" x="20" dy="20" strokeWidth="1">
				Department: {nodeDatum.attributes?.Department}
			</text>
		)}
		<circle r="20" />
	</g>
	)
};

export default function OrgChartTree() {
	const [dimensions, translate, containerRef] = useCenteredTree();
	const [taskList, setTaskList] = useState([ { who: "CEO" }])
	const [showCard, setShowCard] = useState(false);
	const [clientPosition, setClientPosition] = useState({x: 0, y: 0})
	const [taskData, setTaskData] = useState(demoData)
	const [isMouseOnPeopleCard, setIsMouseOnPeopleCard] = useState(false);
	const [ deptMember, setDeptMember] = useState([]);

	const getPeopleCardStatus = (val) => {
		setShowCard(val);
	}

	const getIsMouseOnPeopleCard = (val) => setIsMouseOnPeopleCard(val);

	useEffect( () => {
		const handleMouseMove = (event) => {
			setClientPosition({
				x: event.clientX, 
				y: event.clientY - 60 < 0 ? 0 : event.clientY - 60, 
			})
		}
		window.addEventListener("mousemove", handleMouseMove);
	});
	
	return (
		<>
		{/* {
			deptMember.map( d => `${d.id} ${d.employeeId} ${d.userName} ${d.hireDate} `)
		} */}
		{showCard ? 
		<PeopleCard 
			deptMember={deptMember}
			showCard={showCard} 
			getPeopleCardStatus={getPeopleCardStatus}
			getIsMouseOnPeopleCard = { getIsMouseOnPeopleCard } 
		>
		</PeopleCard> : null}

		{/* {"x: " + clientPosition.x + ", y: " + clientPosition.y + ", isShow: " + showCard + ", isMouseOnPeopleCard: " + isMouseOnPeopleCard} */}
			<div style={containerStyles} ref={containerRef} className="" >
				<Tree
					data={orgJson}
					zoomable={true}
					dimensions={dimensions}
					translate={translate}
					renderCustomNodeElement={(rd3tProps) => 
						renderCustSvgNode({...rd3tProps, clientPosition, taskList, setShowCard, setClientPosition, setDeptMember, deptMember})
					}
					// orientation="vertical"
					initialDepth={2}
					// enableLegacyTransitions={true}
					separation={{ siblings: 1, nonSiblings: 1 }}
					// nodeSize={{ x: 192, y: 70 }}
					nodeSize={{ x: 220, y: 90 }}
					shouldCollapseNeighborNodes={true}
					// onNodeMouseOver={(...args) => {
					// 	console.log('onNodeMouseOver', args);
					// }}
				/>
				
			</div>
		</>
	);
}
