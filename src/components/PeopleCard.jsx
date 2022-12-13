import { useState } from "react"

export default function PeopleCard(props) {
    const [peopleCardStatus, setPeopleCardStatus] = useState(false);
    // const [isMouseOnPeopleCard, setIsMouseOnPeopleCard] = useState(false);

  return (
    <>
    <div 
        onMouseLeave={ () => {
            setPeopleCardStatus(false);
            // props.getPeopleCardStatus(false);
            
            props.getIsMouseOnPeopleCard(false);
        }}
        onMouseEnter = { () => {
            // setIsMouseOnPeopleCard(true);
            props.getIsMouseOnPeopleCard(true);
        }}
        id="tooltip" className=" bg-gray-700 border border-gray px-4 w-72 shadow-2xl rounded-xl absolute h-auto max-h-72 overflow-y-auto "
        
        >
        <div className=" ml-56 mt-2 ">
            <div 
                className="rounded-md text-white cursor-pointer border w-6 h-6 text-center"
                onClick={ () => {
                    props.getPeopleCardStatus(false);
                }}
            >
                X
            </div>
        </div>
        
        {props.deptMember.map((m, ind) =>  <>
            <div key={ind} ind={ind} className="flex items-center space-x-4 py-2">
            <img className="w-16 h-16 rounded-full" src={"/IT_Photo/" + m.employeeId + ".png"} alt=""/>
            {m.isManager ? <img className=" -rotate-12 absolute -left-2 top-7  w-6 h-6 rounded-full" src="https://cdn-icons-png.flaticon.com/512/1657/1657088.png" alt=""/> : null }
                {/* <img className="w-16 h-16 rounded-full" src={"https://ehr.moxa.com/cs/HCMPRD/cache/DERIVED_HRCD_PR_" + m.employeeId + ".png"} alt=""/> */}
                <div className="font-bold text-white ">
                    <div>{m.userName}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Joined in {m.hireDate}</div>
                </div>
            </div>
        
        </>)}
    </div>
    </>
  )
}
