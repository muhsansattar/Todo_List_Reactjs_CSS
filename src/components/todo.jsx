import React, {useState, useEffect, useDebugValue} from "react";
import '../App';
import todologo from '../../public/images/list.jfif';
import { FiPlus, FiDelete } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";

// here i am gonna making a function to fetch data from localstorage
const getLocalData=()=>{
    const lists=localStorage.getItem("Todo List");
    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
}
const Todo=()=>{
    const [inputData, setInputData]=useState("");
    const [item, setItem]=useState(getLocalData());
    const [isEditedItem, setIsEditedItem]=useState("");
    const [toogleButton, setToggleButton]=useState(false)
    // here i am gonna defining addItems function
    const addItem=()=>{
        if(!inputData){
            alert("Please fill the form data");
        }
        else if(inputData && toogleButton){
            setItem(
                item.map((curElem)=>{
                  if(curElem.id===isEditedItem){
                    return{...curElem, name:inputData}
                  }
                  return curElem;
                })
            );
            setInputData("");
            setIsEditedItem(null)
            setToggleButton(false)
        }
        else{
            const newInputData={
                id:new Date().getTime().toString(),
                name:inputData,
            }
            setItem([...item,newInputData])
            setInputData("")
        }
    };
    // here i am gonna makig a function to edit the item
    const editItem=(id)=>{
        const item_todo_edited=item.find((curElem)=>{
            return curElem.id===id;
        })
        setInputData(item_todo_edited.name);
        setIsEditedItem(id)
        setToggleButton(true)
    }
    // here i am gonna making a function to delete 
    const deleteItem=(id)=>{
        const updatedItems=item.filter((curElem)=>{
            return curElem.id!==id;
        })
        setItem(updatedItems);
    }; 
    // here i am gonna making remove all function
    const removeAll=()=>{
        setItem([]);
    } 
    // here i am gonna using useEffect hook to store data in local storage
    useEffect(()=>{
        localStorage.setItem("Todo List", JSON.stringify(item))
    },[item])
    return(
        <>
        <div className="main-div">
            <div className="child-div">
                <figure>
                    <img src={todologo} alt="TodoLogo"/>
                    <figcaption>Add Your List Here ✌.</figcaption>
                </figure>
                <div className="addItems">
                    <input
                    type="text"
                    placeholder="✍ Add Items"
                    className="form-control"
                    value={inputData}
                    onChange={(event)=>setInputData(event.target.value)}
                    />
                    {toogleButton?(
                        // <i className="edit-after-click fa-regular fa-pen-to-square" onClick={addItem}></i>
                        <FaEdit className="edit-after-click" onClick={addItem}/>
                    ):
                    
                    // <i className="fa fa-plus add-btn" onClick={addItem}></i>
                    <FiPlus className='fa-plus' onClick={addItem}/>
                    }
                </div>
                {/* show our items */}
                <div className="show-items">
                    {/* here i am gonna running a loop so whenever any item is added new item is created */}
                    {item.map((curElem)=>{
                        return (
                            <div className="each-item">
                            <h3>{curElem.name}</h3>
                            <div className="todo-btn">
                            <i class="fa-sharp fa-regular fa-pen-to-square" onClick={()=>editItem(curElem.id)}></i>
                            <FaEdit onClick={()=>editItem(curElem.id)}/>
                            <i class="fa-solid fa-trash-can" onClick={()=>deleteItem(curElem.id)}></i>
                            <FiDelete onClick={()=>deleteItem(curElem.id)}/>
                            </div>
                        </div>
                        )
                    })}
                </div>
                {/* remove  all buttons */}
                <div className="show-items">
                    <button className="btn" data-sm-link-text="Remove All" onClick={removeAll}>
                        <span>CHECK LIST</span>
                    </button>
                </div>
            </div>
        </div>
        </>
    );
};

export default Todo;