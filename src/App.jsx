import { useState , useCallback , useEffect , useRef } from 'react'
import './index.css'

function App() {
  const [password , setPassword] = useState("");
  const [length , setLength] = useState(8);
  const [numbersAllowed , setNumbersAllowed] = useState(false);
  const [charactersAllowed , setCharactersAllowed] = useState(false);

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if(numbersAllowed) {str += '1234567890'}
    if(charactersAllowed) {str += '!@#$%^&*-_+=[]{}~`'}

    for(let i = 0 ; i <= length ; i++){
      let char = Math.floor(Math.random()*str.length + 1);
      pass += str[char];
    }

    setPassword(pass);
  } , [length , numbersAllowed , charactersAllowed , setPassword])

  useEffect(()=>{
    passwordGenerator();
  },[length , numbersAllowed ,charactersAllowed , passwordGenerator])

  return (
    <div className='flex justify-center items-center bg-white'  >
      <div className="w-full h-100px max-w-md mx-auto shadow-md rounded-lg  px-4 py-3 my-20 bg-gray-300 text-orange-500">
      <h1 className='text-gray-600 text-center text-2xl my-3 mb-8 font-bold'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-7">
          <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="Password"
              readOnly
              ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >copy</button>
          
      </div>
      <div className='flex text-sm gap-x-4 items-center'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
        <input
            type="checkbox"
            defaultChecked={numbersAllowed}
            id="numberInput"
            onChange={() => {
                setNumbersAllowed((prev) => !prev);
            }}
        />
        <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
            <input
                type="checkbox"
                defaultChecked={charactersAllowed}
                id="characterInput"
                onChange={() => {
                    setCharactersAllowed((prev) => !prev )
                }}
            />
            <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
  </div>
    </div>
  )
}

export default App
