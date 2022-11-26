import { useLayoutEffect, useEffect, useRef, useState, React } from 'react';
import useCenteredTree from "./Helper"
import Tree from 'react-d3-tree';
import orgJson from '../data/org-chart.json';
import deptJson from "../data/dept.json"
import "../App.css"

// export default function OrgChartTree() {

// 	const ref = useRef(null);
// 	const [height, setHeight] = useState(0);
// 	const [width, setWidth] = useState(0);

// 	useEffect(() => {
// 		const { width, height } = ref.current.getBoundingClientRect();
// 		setHeight(height);
// 		setWidth(width);
// 	}, []);

// 	const renderNodeWithCustomEvents = ({
// 		nodeDatum,
// 		toggleNode,
// 		handleNodeClick
// 	}) => {
// 		return (
// 			<g>
// 				{/* <circle r="15"  />
// 				<text className="wave" x="15">👋</text>
// 				<text fill="black" strokeWidth="1" x="40" onClick={toggleNode}>
// 					{nodeDatum.name}  
// 				</text>
// 				{nodeDatum.attributes?.Department && (
// 					<text fill="black" x="20" dy="20" strokeWidth="1">
// 						Department: {nodeDatum.attributes?.Department}
// 					</text>
// 				)} */}

// 				<circle r="15" width="20" height="20" x="-10" onClick={toggleNode} />
// 				<text fill="black" strokeWidth="1" x="20">
// 				{nodeDatum.name}
// 				</text>
// 				{nodeDatum.attributes?.department && (
// 				<text fill="black" x="20" dy="20" strokeWidth="1">
// 					Department: {nodeDatum.attributes?.department}
// 				</text>
// 				)}
// 			</g>
// 		)
// 	};

// 	const handleNodeClick = (nodeDatum) => {
// 		// window.alert(
// 		// 	nodeDatum.children ? "Clicked a branch node" : "Clicked a leaf node."
// 		// );
// 	};

// 	return (
// 		// `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
// 		<div ref={ref} id="treeWrapper" 
// 			className="h-screen"
// 		// style={{ width: '100em', height: '200em' }}
// 		>
// 			<Tree
// 				data={orgJson}
// 				zoomable={false}
// 				collapsible={true}
// 				translate={{ x: width / 4 * 3, y: height / 3 }}
// 				scaleExtent={{ min: 0.1, max: 1 }}
// 				separation={{ siblings: .5, nonSiblings: 1 }}
// 				rootNodeClassName="node__root"
// 				onNodeClick={(node, evt) => {
// 					console.log('onNodeClick', node, evt);
// 				}}
// 				orientation="vertical"
// 				renderCustomNodeElement={(rd3tProps) => {
// 					console.log(rd3tProps);
// 					return renderNodeWithCustomEvents({ ...rd3tProps, handleNodeClick })
// 				}}
// 				// TreeNodeEventCallback={(node, evt) => { console.log(node, evt) }}
// 			// renderCustomNodeElement={
// 			// true
// 			//     ? rd3tProps => {}
// 			//     : undefined
// 			// }
// 			/>
// 		</div>
// 	);
// };

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
	const [dimensions, translate, containerRef] = useCenteredTree();
	return (
		<div style={containerStyles} ref={containerRef} >
			<Tree
				data={orgJson}
				zoomable={false}
				dimensions={dimensions}
				translate={translate}
				renderCustomNodeElement={renderRectSvgNode}
				orientation="vertical"
				enableLegacyTransitions={true}
				separation={{ siblings: 1, nonSiblings: 1 }}
				nodeSize={{ x: 192, y: 70 }}
			/>
		</div>
	);
}
