import React, { useEffect, useState } from 'react';
import './todolist.css'
import { MdDeleteOutline } from "react-icons/md";
import { HiPencilAlt } from "react-icons/hi";
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

const TodoList = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    const token = JSON.parse(localStorage.getItem("authToken"))
    const headers = {Authorization: `Bearer ${token}`}
    const url = "https://free-todo-api.vercel.app/create-todo"
    
    const createTodo = async (e) => {
        e.preventDefault();
    
        try {
            const res = await axios.post(url, { title, description }, { headers });
            console.log(res);
            setList([...list, res.data]);
            setTitle("");
            setDescription("");
            if(res.status === 201){
              toast.success("Todo successfully created")
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.error)
            navigate("/login")
        }
    }
    

const url2 = "https://free-todo-api.vercel.app/get-all-todos"

const getAllTodo = async () => {
    // e.preventDefault();

    try{
        const res = await axios.get(url2)
        setList(res.data)
        console.log(res.data)

    }catch(err){
        console.log(err)
    }
}
useEffect(() =>{
    getAllTodo()
}, [])



const deleteTodo = async (todoId) =>{
const url3 = `https://free-todo-api.vercel.app/delete-todo/${todoId}`
    
    try{
        const res = await axios.delete(url3);
        console.log(res)
        toast.success(res?.data?.message);
        setList(list.filter((todo) => todo._id !== todoId));

    }catch(err){
        console.log(err)
        toast.error("Error deleting to-do");
    }
}

const trashTodo = async (todoId) =>{
const url4 = `https://free-todo-api.vercel.app/trash-todo/${todoId}`

try{
  const res = await axios.patch(url4, {status: "trashed"}, {headers})
  console.log(res)
  setList(prevList =>
    prevList.map(todo =>
        todo._id === todoId ? { ...todo, isTrash: res.data.isTrash } : todo
    )
);

}catch(err){
  console.log(err)
}
}

      return (
        <>
        <div className='body'>
          <ToastContainer />
            <div className='header'>
              <h1>TODO LIST</h1>
            </div>
            <div className='user'>
              <input type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder='Title...' />

              <input type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder='add description...' />
              <button onClick={createTodo}>ADD</button>
            </div>
      
            <div className='output'>
              {list.map((props, id) => (
                <div className='result' key={id} style={{textDecoration: props?.isTrash === true ? "line-through" : "",
                  color: props?.isTrash === true ? "gray" : ""
                }}>
                  <p style={{width: "20%", height: "100%", padding: "5px", textAlign: "center", display: "flex", alignItems: "center"}}>{props.title}</p>
                  <p style={{width: "50%", height: "100%", padding: "5px", textAlign: "center", display: "flex", alignItems: "center"}}>{props.description}</p>
                  <MdDeleteOutline onClick={() => deleteTodo(props._id)} style={{fontSize: "30px", color: "red", cursor: "pointer"}}/> 
                  <HiPencilAlt onClick={() => trashTodo(props. _id)}style={{fontSize: "30px", color: "green", cursor: "pointer"}}/></div>
              ))}
            </div>
          </div>
        </>
      )
    }
    
    
    
export default TodoList;