import { useState, useEffect, useCallback } from 'react' 
import { TbCheckupList } from "react-icons/tb"
import Search from "./components/Search";
import AddThingToDo from "./components/AddThingToDo";
import ToDoInfo from "./components/ToDoInfo";

function App() {

  var [toDoList, setToDoList] = useState([]);
  var [query, setQuery] = useState("");
  var [sortBy, setSortBy] = useState("date");
  var [orderBy, setOrderBy] = useState("asc"); 
  var [undoneFirst, setUndoneFirst] = useState(true); 
  var [reDraw, setReDraw] = useState(0); 
  var [folder, setFolder] = useState(""); 
  var [doneFilter, setDoneFilter] = useState(false); 
  var [date, setDate] = useState(null);

  const filteredToDoList = toDoList.filter(
    item => {
      
      let filterDate = date === null ? null : new Date(date); 
      let itemDate = new Date(item.date); 
      return (
        item.title.includes(query)  
        && (item.folder === undefined  || item.folder.includes(folder))
        && (!item.status || !doneFilter)
        && (filterDate === null || 
          itemDate.getDate() === filterDate.getDate() 
          && itemDate.getMonth() === filterDate.getMonth() 
          && itemDate.getFullYear() === filterDate.getFullYear())
      )
    }
  ).sort((a,b) => { 
    let order = (orderBy==='asc') ? 1 : -1; 
    if (undoneFirst && a.status === false && b.status === true) {
        return -1;
    } else if (undoneFirst && a.status === true && b.status === false) {
        return 1; 
    } else { 
        if (typeof a[sortBy] === 'string' || a[sortBy] instanceof String
            && typeof b[sortBy] === 'string' || b[sortBy] instanceof String)
          return (
            a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
              ? -1 * order : 1 * order 
          )
        else return (
            a[sortBy] < b[sortBy]
              ? -1 * order : 1 * order
        )
    }
  })

  const fetchData = useCallback( () => {
    fetch('./todo-list.json')
      .then(response => response.json())
      .then(data => {
        setToDoList(data);
      })
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData]) 

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <TbCheckupList className="inline-block text-red-300 mb-2" /> To-Do List
      </h1>
      <AddThingToDo
          onSendThing={myThing => setToDoList([...toDoList, myThing])}
          lastId={toDoList.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0 )}
      /> 
      <Search query = {query} 
        onQueryChange = {myQuery => setQuery(myQuery)} 
        orderBy = {orderBy} 
        onOrderByChange = {mySort => setOrderBy(mySort)}
        sortBy = {sortBy}
        onSortByChange = {mySort => setSortBy(mySort)}
        undoneFirst = {undoneFirst}
        onUndoneFirstByChange = {() => setUndoneFirst(!undoneFirst)}
        onFilterByDate = {filterDate => setDate(filterDate)}
        doneFilter = {doneFilter} 
        onFilterByDone = {() => setDoneFilter(!doneFilter)}
      />

      <ul className="divide-y divide-gray-200">
        {filteredToDoList
          .map(thing => (
              <ToDoInfo key={thing.id} 
                thingToDo={thing}
                onDeleteThing={
                  thingId => 
                    setToDoList(toDoList
                      .filter(thing => thingId !== thing.id))
                }
                onThingDone={ 
                  () => {thing.status = !thing.status}
                }
                onDoneAndFocusLost={
                  () => {setReDraw(reDraw+1)}
                }
              />
          ))
        }
      </ul>
    </div>
  );
}

export default App;
