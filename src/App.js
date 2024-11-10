import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Shivam",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Alisha",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Ashraf",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friends , setFriends] = useState(initialFriends)
  const [addfreind , setAddfriend] = useState(false)
  const [selectedFriend , setSelectedFriend] = useState(null)

  function handle(){
    console.log("inside handle")
    setAddfriend(addfreind=>(!addfreind))
  }

  function handleAdd(item){
    setFriends(x=>[...x , item])
  }

  function handleSelect(obj){
    console.log(obj)
    setSelectedFriend(obj)
    setAddfriend(false)
  }

  function handleSplitBill(val){
    console.log(val) 
    setFriends((friends)=>
      friends.map((friend)=>
        friend.id === selectedFriend.id 
          ? {...friend , balance:friend.balance + val } 
          : friend))

          setSelectedFriend(null)
  }

  return (
    <div className="app">
      <div className="sidebar">

        <FriendsList 
        friends={friends} 
        setFriends={setFriends}
        handleSelect={handleSelect}
        selectedFriend={selectedFriend}
        />

        {addfreind && <FormAddFriend 
        
        handleAdd={handleAdd} />}

        <Button onClick={handle}>
          {addfreind ? "close" : "Add Friend"}</Button>
      </div>

        {selectedFriend && <Splitbill 
        selectedFriend={selectedFriend}
        handleSplitBill={handleSplitBill}/>}
    </div>
  );
}

export default App;


function FriendsList({friends , setFriends , handleSelect , selectedFriend}){
  const friend = friends;
  return <ul>
    {/* cons */}
    {friend.map((friend)=>(
      <Friend 
      friend={friend} 
      key={friend.id} 
      handleSelect={handleSelect} 
      selectedFriend={selectedFriend}
      />
    ))}
  </ul>
}

function Friend({friend , handleSelect , selectedFriend}){

  console.log(JSON.stringify(friend))
  console.log(JSON.stringify(selectedFriend))

  let isSelected = selectedFriend && friend.id === selectedFriend.id;
  console.log(isSelected);
    // console.log(isSelected)

  // console.log(friend)

  return <>
   <li className={isSelected ? "selected" : ""}>
    <img src={friend.image} alt={friend.name}/>
    <h3>{friend.name}</h3>
    {/* <p>You owe {friend.balance}</p> */}
    {/* {friend.balance < 0 ? <p className="red">you owe friend.balance</p> : <p className="green">you owe friend.balance } */}
    {friend.balance < 0 
  ? <p className="red">You owe {Math.abs(friend.balance)}$</p> 
  : <p className="green">Your friend owes you {friend.balance}$</p>
}
  <Button onClick={()=>handleSelect(friend)}>{isSelected ? "close" : "select"}</Button>
    {/* <button className="button">Select</button> */}
  </li>

   {/* <button>Add Friend</button> */}
  </>
}

function Button({children , onClick  }){
  return <button className="button" onClick={onClick}>
    {children}
  </button>
}

function FormAddFriend({ handleAdd}){
  const [name , setName] = useState('')
  const [img , setImg] = useState('')
  function handleName(e){
    // console.log(e)
    setName(name=>e)
  }

  function handleImg(e){
    // console.log(e)
    setImg(img=>e)
  }
  function handleNewFriends(e){

    e.preventDefault()
    if(!name || !img){
      return;
    }
    const newFriend = {
      name , 
      img , 
      balance : 0,
      id : crypto.randomUUID(),
    };

    console.log(newFriend)
    handleAdd(newFriend)
    setName('')
    setImg('')
    // console.log(e)
  }
  return <form className="form-add-friend" 
  onSubmit={handleNewFriends}>
    <label>
      Friend Name 
    </label>
    <input type="text" value={name} onChange={(e)=>handleName(e.target.value)}/>

    <label>Img URL</label>
    <input type="text" value={img} onChange={(e)=>handleImg(e.target.value)}/>

    <Button >Add Friend</Button>

  </form>
}

function Splitbill({selectedFriend , handleSplitBill}){

  const [bill, setBill] = useState('')
  const [expense , setExpense] = useState('')
  const [whoIsPaying , setWhoIsPaying] = useState("user")
  const paidByFriend = bill - expense
  function handleBill(num){
    num = Number(num)
    setBill(num)
  }
  function handleExpense(exp){
    exp = Number(exp)
    setExpense(exp)
  }
  function handleSubmit(e){
    e.preventDefault()
    if(!bill || !expense) return 
    handleSplitBill(whoIsPaying === 'user' ? paidByFriend : -expense);
  }

  console.log(selectedFriend.name)
  return <form className="form-split-bill" onSubmit={handleSubmit}>
    <h2>Splitt the bill here</h2>
    <label> 🤑 Bill Value</label>
    <input type="text" 
    value={bill}
    onChange={(e)=>handleBill(e.target.value)}/>

    <label>💰 Your Expenses</label>
    <input type="text" 
    value={expense}
    onChange={(e)=>
    handleExpense(Number(e.target.value) > bill ? expense : e.target.value )}/>

    <label> 💵 {selectedFriend.name} bill</label>
    <input type="text"
     disabled
     value = {bill - expense}/>

    <label> 💷Who is paying bill</label>
    <select value={whoIsPaying} 
    onChange={(e)=>setWhoIsPaying(e.target.value)}>
      <option value="user">You</option>
      <option value="friend">{selectedFriend.name}</option>
    </select>

    <Button>Split Bill</Button>
  </form>
}
