import { useLayoutEffect, useEffect, useRef, useState, React } from 'react';
import useCenteredTree from "./Helper"
import Tree from 'react-d3-tree';
import orgJson from '../data/org-chart.json';
import {test} from '../chart';
import deptJson from "../data/dept.json"
import "../App.css"


const containerStyles = {
	width: "100%",
	height: "100%"
};

const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
	<g onClick={toggleNode} >
		{/* todo: show wave icon on the target dept */}
		{nodeDatum.attributes?.Department == "B" ? <text x="30" className="wave" stroke="#FFFFFF" > {nodeDatum.name} 👋</text> : null} 
		<text fill="black" strokeWidth="1" x="30" >
			{nodeDatum.name}
		</text>
		{nodeDatum.attributes?.Department && (
			<text fill="black" x="20" dy="20" strokeWidth="1">
				Department: {nodeDatum.attributes?.Department}
			</text>
		)}
		<circle r="20" />
	</g>
);

export default function OrgChartTree() {
	var finalChart = test();
	const [dimensions, translate, containerRef] = useCenteredTree();
	return (
		<><div style={containerStyles} ref={containerRef}>
			<Tree
				data={finalChart}
				zoomable={false}
				dimensions={dimensions}
				translate={translate}
				renderCustomNodeElement={renderRectSvgNode}
				orientation="vertical"
				enableLegacyTransitions={true}
				separation={{ siblings: 1, nonSiblings: 1 }}
				nodeSize={{ x: 192, y: 70 }} />
		</div>
				console.log(depTree);
		
		</>
	);
}
