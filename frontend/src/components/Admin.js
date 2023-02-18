import {useState, useEffect} from 'react';
import axios from 'axios';
import "./css/admin.css"
import Navi from './Navi';


function Admin() {
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');
  const [enteredPassword,setEnteredPassword]=useState('');
  const [istrue,setIstrue]=useState(false);
  const password="123321";

  function matchPassword(){
    if(password.localeCompare(enteredPassword)==0){
      setEnteredPassword(true);
      setIstrue(true);
    }
  }


  //add new todo item to database
  const addItem = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:6001/api/item', {item: itemText})
      setListItems(prev => [...prev, res.data]);
      setItemText('');
    }catch(err){
      console.log(err);
    }
  }

  //Create function to fetch all todo items from database -- we will use useEffect hook
 

  // Delete item when click on delete
  const deleteItem = async (id) => {
    try{
      const res = await axios.delete(`http://localhost:6001/api/item/${id}`)
      const newListItems = listItems.filter(item=> item._id !== id);
      setListItems(newListItems);
    }catch(err){
      console.log(err);
    }
  }

  //Update item
  const updateItem = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.put(`http://localhost:6001/api/item/${isUpdating}`, {item: updateItemText})
      console.log(res.data)
      const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
      const updatedItem = listItems[updatedItemIndex].item = updateItemText;
      setUpdateItemText('');
      setIsUpdating('');
    }catch(err){
      console.log(err);
    }
  }
  //before updating item we need to show input field where we will create our updated item
  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e)=>{updateItem(e)}} >
      <input className="update-new-input" type="text" placeholder="New Item" onChange={e=>{setUpdateItemText(e.target.value)}} value={updateItemText} />
      <button className="update-new-btn" type="submit">Update</button>
    </form>
  )

  useEffect(()=>{},[enteredPassword]);

  return (
    <>
  <Navi/>
    <div className="App">
      <h2 className='message'>To Update Timeline</h2>
      
      {!istrue &&
      <>
      <div>
      <input type="password" className="enterpassword" placeholder='Enter admin password' onChange={e => {setEnteredPassword(e.target.value)} } />
      <button type="submit" className="btnenterpassword" onClick={matchPassword}>Enter</button>
      </div>
      </>}

      {istrue &&
      <>
      <div>

      <form className="form" onSubmit={e => addItem(e)}>
        <input type="text" className="enterpassword" placeholder='Add Event' onChange={e => {setItemText(e.target.value)} } value={itemText} />
        <button type="submit" className="btnenterpassword">Add</button>
      </form>
      </div>
      </>}
      
      
      {/* <div>Sorry! You entered the wrong password</div> */}

    </div>
    </>
  );
}

export default Admin;