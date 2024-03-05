import { useState , useCallback ,useEffect, useRef} from 'react'

import './App.css'

function App() {
  
  let [length ,setLength] = useState(8)
  let [numbersAllowed ,setNumbersAllowed] = useState(false)
  let [charAllowed , setCharAllowed] = useState(false)
  const [password , setPassword] = useState("")

  // Ref Hook
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback (()=>{

    let pass = "";    
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(charAllowed){
      string += `!"#$%&'()*+,-./:;<=>?@[\]^_{|}~`;
    }
    if(numbersAllowed){
      string += "0123456789";
    }

    for(let i=0; i<length; i++){
      let indexInString = Math.round(Math.random() * string.length + 1);

      //Append the character  at that position in the string to our password.
      pass += string.charAt(indexInString);
    }
    // Set the Password 
    setPassword(pass);

  } , [length, numbersAllowed, charAllowed])


  const generatePassword = ()=>{
    passwordGenerator();
  }

  useEffect(()=>{
    passwordGenerator();
  } , [length , numbersAllowed, charAllowed])

  // Copy Function
  const copyPasswordToClipboard = useCallback(()=>{
    // NOTE : ? only means that select the value if it is not null like you'll call the select if only passwordref is holding a value
    passwordRef.current?.select(); // Select the Password  
    // passwordRef.current?.setSelectionRange(0,31)
    
    // Copy Password to Clipboard
    window.navigator.clipboard.writeText(password) 
  } , [password])

  return (
  <>
  {/* <h1 className='font-serif text-2xl text-blue-300 text-center m-10 hover:underline cursor-pointer tracking-wider'>Click  Generate Button to generate the Password</h1> */}

    {/* Main DIV */}
    <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      
    {/* Heading */}
    <h1 className='text-white text-center my-3 font-mono text-2xl font-bold tracking-wide'>Password generator</h1>
      
      {/* Password Feild */}
      <div className="flex shadow overflow-hidden mb-4 gap-4">
          <input type="text" placeholder="Password"
              className=" text-green-700 font-mono text-lg tracking-wide outline-none w-full py-1 px-3 rounded-sm" 
              value={password}
              readOnly ref = {passwordRef}
          />

          {/* Copy Button */}
          <button 
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-sm'>Copy</button>

          <button 
          onClick={generatePassword}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 gap-4 rounded-sm'>Generate</button>

      </div>

      <div className='flex flex-wrap text-base gap-x-2 font-mono'>
          { /* Range */ }
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={30} 
            value = {length} className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>

          {/* Check Box For Numbers */}
          <div className="flex items-center gap-x-1">
            <input className='cursor-pointer'  type="checkbox" defaultChecked = {numbersAllowed} id='numberInput'
            onChange={()=>{
              setNumbersAllowed((prev)=> !prev)
            }}
            />
            <label className='cursor-pointer'  for= "numberInput">Numbers</label>
          </div>

          {/* Check Box For Characters */}
          <div className="flex items-center gap-x-1">
              <input className='cursor-pointer' id='charInput' type="checkbox" defaultChecked = 
              {charAllowed}
              onChange={()=>{
                setCharAllowed((prev)=> !prev)
              }}
              />
              <label className='cursor-pointer'  for="charInput">Characters</label>
          </div>
      </div>

    </div>

    </>
  )
}

export default App;