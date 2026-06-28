import {useEffect,useState} from "react";

import api from "../../services/api";

function Category(){

const [categories,setCategories]=useState([]);

const [name,setName]=useState("");

const [editId,setEditId]=useState(null);


useEffect(()=>{

getCategories();

},[]);


const getCategories=async()=>{

try{

const response=await api.get(
"/categories"
);

setCategories(response.data);

}catch(error){

console.log(error);

}

};


const addCategory=async()=>{

try{

await api.post(

"/categories",

{
user_id:1,
name
}

);

setName("");

getCategories();

}catch(error){

console.log(error);

}

};


const updateCategory=async()=>{

try{

await api.put(

`/categories/${editId}`,

{
name
}

);

setEditId(null);

setName("");

getCategories();

}catch(error){

console.log(error);

}

};


const deleteCategory=async(id)=>{

try{

await api.delete(
`/categories/${id}`
);

getCategories();

}catch(error){

console.log(error);

}

};


return(

<div>

<h2>Category</h2>

<input

value={name}

onChange={(e)=>setName(e.target.value)}

/>

<button

onClick={

editId

?

updateCategory

:

addCategory

}

>

{editId ? "Update":"Tambah"}

</button>

{

categories.map((item)=>(

<div key={item.id_category}>

<p>{item.name}</p>

<button

onClick={()=>{

setEditId(item.id_category);

setName(item.name);

}}

>

Edit

</button>

<button

onClick={()=>deleteCategory(item.id_category)}

>

Hapus

</button>

</div>

))

}

</div>

);

}

export default Category;