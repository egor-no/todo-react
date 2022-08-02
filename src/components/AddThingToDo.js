import {BiCalendarPlus} from "react-icons/bi"
import {useState } from 'react'; 

const AddThingToDo = ( {onSendThing, lastId} ) => {
    const clearData = {
        title: '',
        notes: '',
        date: '',
        duration: '',
    }
    let [toggleForm, setToggleForm] = useState(false);
    let [formData, setFormData] = useState(clearData)
    let [isChecked, setIsChecked] = useState(false); 

    const checkOnClick = () => {
      setIsChecked(!isChecked);
    };

    function formDataPublic() {
      const todoInfo = {
        id: lastId + 1,
        title: formData.todoTitle,
        notes: formData.todoNotes,
        date: formData.todoDate + ' ' + formData.todoTime,
        duration: formData.todoDuration,
        status: isChecked
      }
      onSendThing(todoInfo);
      setFormData(clearData); 
      setToggleForm(!toggleForm); 
    }

    return (
        <div>
        <button onClick={() => { setToggleForm(!toggleForm) }}
          className={ `bg-blue-400 text-white px-2 py-3 w-full text-left 
              ${toggleForm ? 'rounded-t-md' : 'rounded-md'}` }>
          <div><BiCalendarPlus className="inline-block align-text-top" />  Add Thing To Do</div>
        </button>
        {
          toggleForm && 
          <div className="border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label htmlFor="todoTitle" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Title
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input type="text" name="todoTitle" id="todoTitle"
                onChange={(event) => {setFormData({...formData, todoTitle:  event.target.value})}}
                value={formData.todoTitle}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>
  
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label htmlFor="todoDate" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
               Date
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input type="date" name="todoDate" id="todoDate"
                onChange={(event) => {setFormData({...formData, todoDate:  event.target.value})}}
                value={formData.todoDate}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>
  
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label htmlFor="todoTime" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Time
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input type="time" name="todoTime" id="todoTime"
                onChange={(event) => {setFormData({...formData, todoTime:  event.target.value})}}
                value={formData.todoTime}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label htmlFor="todoDuration" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Duration
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input type="text" name="todoDuration" id="todoDuration"
                onChange={(event) => {setFormData({...formData, todoDuration:  event.target.value})}}
                value={formData.todoDuration}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>
  
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label htmlFor="todoNotes" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Notes
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <textarea id="todoNotes" name="todoNotes" rows="3"
                  onChange={(event) => {setFormData({...formData, todoNotes:  event.target.value})}}
                  value={formData.todoNotes}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Detailed comments about the condition"></textarea>
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
          <label htmlFor="todoNotes" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Done
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input type="checkbox" id="doneCheck" name="doneCheck" 
                  checked={isChecked} onChange={checkOnClick}/>
             </div>
          </div>
  
  
          <div className="pt-5">
            <div className="flex justify-end">
              <button type="submit" onClick={formDataPublic} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                Submit
              </button>
            </div>
          </div>
        </div>
        }
      </div>
    )
}

export default AddThingToDo