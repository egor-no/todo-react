import App from "../App"
import { BiTrash, BiCheckbox, BiCheckboxChecked } from "react-icons/bi"
import { useState } from 'react' 

const DoneThing = ({isDone, onThingDone, setIsDone}) => {
    
    if (!isDone) {
        return <button type="button" onClick={() => {onThingDone(); setIsDone(!isDone) }}
            className="p-1 mr-3 mt-2 rounded text-blue-800  hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <BiCheckbox width="100%" /></button>
    } else {
        return <button type="button" onClick={  () => {onThingDone(); setIsDone(!isDone) }}
            className="p-1 mr-3 mt-2 rounded text-white bg-blue-400 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <BiCheckboxChecked /></button>
    }
}

const ToDoInfo = ({thingToDo, onDeleteThing, onThingDone}) => { 
    const [isDone, setIsDone] = useState(thingToDo.status);
    return (
        <li className="px-3 py-3 flex items-start">
            
        <div className="flex-none">
            <button type="button" onClick={ () => onDeleteThing(thingToDo.id) }
                className="p-1 mr-3 mt-2 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <BiTrash /></button>
        <DoneThing isDone={isDone} onThingDone={onThingDone} setIsDone={setIsDone} />
        </div>
        <div className="flex-grow">
        <div className="flex items-center">
            <span className="flex-none font-medium text-2xl text-blue-500">{thingToDo.title}</span>
            <span className="flex-grow text-right">{thingToDo.date}</span>
        </div>
        <div className="leading-tight">{thingToDo.notes}</div>
        <div className="font-bold text-blue-500">{thingToDo.duration} min</div>
        </div>
        </li>
    )
}

export default ToDoInfo;