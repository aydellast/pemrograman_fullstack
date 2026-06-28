import { useEffect, useState } from "react";

import api from "../../services/api";

function Income() {

const [income,setIncome]=useState([]);

const [amount,setAmount]=useState("");

const [description,setDescription]=useState("");

const [editId,setEditId]=useState(null);

useEffect(()=>{

getIncome();

},[]);


const getIncome = async()=>{

try{

const token=localStorage.getItem("token");

const response=await api.get(
"/income",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

setIncome(response.data);

}catch(error){

console.log(error);

}

};


const addIncome=async()=>{

try{

const token=localStorage.getItem("token");

await api.post(

"/income",

{
amount,
description,
id_category:1
},

{
headers:{
Authorization:`Bearer ${token}`
}
}

);

setAmount("");

setDescription("");

getIncome();

}catch(error){

console.log(error);

}

};


const updateIncome=async()=>{

try{

const token=localStorage.getItem("token");

await api.put(

`/income/${editId}`,

{
amount,
description,
id_category:1
},

{
headers:{
Authorization:`Bearer ${token}`
}
}

);

setEditId(null);

setAmount("");

setDescription("");

getIncome();

}catch(error){

console.log(error);

}

};


const deleteIncome=async(id)=>{

try{

const token=localStorage.getItem("token");

await api.delete(

`/income/${id}`,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);

getIncome();

}catch(error){

console.log(error);

}

};


return(

<div>

<h2>Income</h2>

<input

type="number"

placeholder="Amount"

value={amount}

onChange={(e)=>setAmount(e.target.value)}

/>

<input

placeholder="Description"

value={description}

onChange={(e)=>setDescription(e.target.value)}

/>

<button

onClick={

editId

?

updateIncome

:

addIncome

}

>

{editId ? "Update":"Tambah"}

</button>

{

income.map((item)=>(

<div key={item.id_transaction}>

<p>{item.amount}</p>

<p>{item.description}</p>

<button

onClick={()=>{

setEditId(item.id_transaction);

setAmount(item.amount);

setDescription(item.description);

}}

>

Edit

</button>

<button

onClick={()=>deleteIncome(item.id_transaction)}

>

Hapus

</button>

</div>

))

}

</div>

);

}

export default Income;