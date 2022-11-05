import { useLayoutEffect, useEffect, useRef, useState, React } from 'react';
import Tree from 'react-d3-tree';
import flareJson from '../data/demo-data.json';


const orgChart = {
	"name": "CEO",
	"children": [
		{
			"name": "Manager",
			"attributes": {
				"department": "Production"
			},
			"children": [
				{
					"name": "Foreman",
					"attributes": {
						"department": "Fabrication"
					},
					"children": [
						{
							"name": "Worker"
						}
					]
				},
				{
					"name": "Foreman",
					"attributes": {
						"department": "Assembly"
					},
					"children": [
						{
							"name": "Worker"
						}
					]
				}
			]
		},
		{
			"name": "Manager",
			"attributes": {
				"department": "Production"
			},
			"children": [
				{
					"name": "Foreman",
					"attributes": {
						"department": "Fabrication"
					},
					"children": [
						{
							"name": "Worker"
						}
					]
				},
				{
					"name": "Foreman",
					"attributes": {
						"department": "Assembly"
					},
					"children": [
						{
							"name": "Worker"
						}
					]
				}
			]
		}, {
			"name": "Manager",
			"attributes": {
				"department": "Production"
			},
			"children": [
				{
					"name": "Foreman",
					"attributes": {
						"department": "Fabrication"
					},
					"children": [
						{
							"name": "Worker"
						}
					]
				},
				{
					"name": "Foreman",
					"attributes": {
						"department": "Assembly"
					},
					"children": [
						{
							"name": "Worker"
						}
					]
				}
			]
		}
	]
};

export default function OrgChartTree() {

	const ref = useRef(null);
	const [height, setHeight] = useState(0);
	const [width, setWidth] = useState(0);

	useEffect(() => {
		const { width, height } = ref.current.getBoundingClientRect();
		setHeight(height);
		setWidth(width);
	}, []);

	const renderNodeWithCustomEvents = ({
		nodeDatum,
		toggleNode,
		handleNodeClick
	}) => {
		let qq = nodeDatum.name;

		return (
			<g>
				<circle r="15" onClick={() => handleNodeClick(nodeDatum)} />
				<text fill="black" strokeWidth="1" x="20" onClick={toggleNode}>
					{nodeDatum.name} (click me to toggle 👋)
					<img className="gb_Ba gbii" src="https://lh3.googleusercontent.com/ogw/AOh-ky2I2R0FJJH7NP0XGszk-hBF32-txNIzSZl7vJzY=s32-c-mo" alt="" aria-hidden="true" data-noaft=""></img>
				</text>
				{nodeDatum.attributes?.department && (
					<text fill="black" x="20" dy="20" strokeWidth="1">
						Department: {nodeDatum.attributes?.department}
					</text>
				)}
			</g>
		)
	};

	const handleNodeClick = (nodeDatum) => {
		window.alert(
			nodeDatum.children ? "Clicked a branch node" : "Clicked a leaf node."
		);
	};

	return (
		// `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
		<div ref={ref} id="treeWrapper" className="h-screen w-screen"
		// style={{ width: '100em', height: '200em' }}
		>
			<Tree
				data={flareJson}
				translate={{ x: width / 2 - 300, y: height / 2 }}
				scaleExtent={{ min: 0.1, max: 1 }}
				separation={{ siblings: .5, nonSiblings: 1 }}
				rootNodeClassName="node__root"
				onNodeClick={(node, evt) => {
					console.log('onNodeClick', node, evt);
				}}
				// orientation="vertical"
				renderCustomNodeElement={(rd3tProps) => {
					console.log(rd3tProps);
					return renderNodeWithCustomEvents({ ...rd3tProps, handleNodeClick })
				}}
				TreeNodeEventCallback={(node, evt) => { console.log(node, evt) }}
			// renderCustomNodeElement={
			// true
			//     ? rd3tProps => {}
			//     : undefined
			// }
			/>
		</div>
	);
};
