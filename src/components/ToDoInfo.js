import App from "../App"
import { BiTrash, BiCheckbox, BiCheckboxChecked } from "react-icons/bi"
import { useState } from 'react' 

function chooseHeaderColor(isDone, isPast) {
    if (isDone && isPast)
        return "flex-none font-medium text-2xl text-green-200";
    if (isDone && !isPast)
        return "flex-none font-medium text-2xl text-green-600";
    if (!isDone && isPast) {
        return "flex-none font-medium text-2xl text-red-500";
    }
    if (!isDone && !isPast)
        return "flex-none font-medium text-2xl text-blue-500";
}

function chooseTextColor(isDone) {
    if (isDone) 
        return "leading-tight text-gray-300";
    else
        return "leading-tight text-gray-600";
}

function chooseDurationColor(isDone) {
    if (isDone) 
        return "font-bold text-gray-300";
    else
        return "font-bold text-blue-500";
}

function chooseCheckBoxDesign(isDone) {
    if (isDone) 
        return "p-1 mr-3 mt-2 rounded text-white bg-blue-400 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
    else 
        return "p-1 mr-3 mt-2 rounded text-blue-800  hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
}

function getIcon(isDone) {
    if (isDone) 
        return <BiCheckboxChecked width="100%" />
    else 
        return <BiCheckbox width="100%" />
}

const DoneThing = ({isDone, isPast, onThingDone, setIsDone, setHeaderColor, setTextColor, setDurationColor}) => {
    const [buttonDesign, setButtonDesign] = useState(chooseCheckBoxDesign(isDone));
    let newIsDone = !isDone;

    return <button type="button" 
        onClick={() => {
            onThingDone(); 
            setIsDone(newIsDone);
            setHeaderColor(chooseHeaderColor(newIsDone, isPast));
            setTextColor(chooseTextColor(newIsDone));
            setButtonDesign(chooseCheckBoxDesign(newIsDone));
            setDurationColor(chooseDurationColor(newIsDone));
        }}
        className={buttonDesign} >
        {getIcon(isDone)}</button>
}

const ToDoInfo = ({thingToDo, onDeleteThing, onThingDone}) => { 
   
    let now = new Date(); 
    let date = new Date(thingToDo.date);
    const isPast = date < now ? true : false;
    
    const [isDone, setIsDone] = useState(thingToDo.status);
    const [headerColor, setHeaderColor] = useState(chooseHeaderColor(thingToDo.status, isPast));
    const [textColor, setTextColor] = useState(chooseTextColor(thingToDo.status));
    const [durColor, setDurColor] = useState(chooseDurationColor(thingToDo.status));

    return (
        <li className="px-3 py-3 flex items-start">
            
        <div className="flex-none">
            <button type="button" onClick={ () => onDeleteThing(thingToDo.id) }
                className="p-1 mr-3 mt-2 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <BiTrash /></button>
        <DoneThing isDone={isDone} isPast={isPast} onThingDone={onThingDone} setIsDone={setIsDone} 
            setHeaderColor={setHeaderColor} setTextColor={setTextColor} setDurationColor={setDurColor} />
        </div>
        <div className="flex-grow">
        <div className="flex items-center">
            <span className={headerColor}>{thingToDo.title}</span>
            <span className="flex-grow text-right">{thingToDo.date}</span>
        </div>
        <div className={textColor}>{thingToDo.notes}</div>
        <div className={durColor}>{thingToDo.duration} min</div>
        </div>
        </li>
    )
}

export default ToDoInfo;