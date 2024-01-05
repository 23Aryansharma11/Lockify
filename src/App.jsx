import React, { useCallback, useEffect, useState } from 'react';
import weak from './assets/weakPass.png';
import good from './assets/goodPass.png'
import strong from './assets/strongPass.png'
import Vstrong from './assets/veryStrongPass.png'
import { CopyToClipboard } from 'react-copy-to-clipboard';


const App = () => {
  // Variables
  const [StenghtImage, setStenghtImage] = useState(weak)
  const [strengthlevel, setstrengthlevel] = useState('Weak');
  const [strengthcolor, setstrengthcolor] = useState('#ff4122'); // Set a default color
  const [password, setpassword] = useState('');
  const [length, setlength] = useState(7);
  const [numInvolved, setnumInvolved] = useState(false);
  const [charInvolve, setcharInvolved] = useState(false);

  // Functions
  const MakePassword = useCallback(() => {
    let pass = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmonpqrstuvwxyz';
    if (charInvolve) pass += '!@#$%^&*_-';
    if (numInvolved) pass += '1234567890';
    let str = '';
    for (let i = 1; i <= length; i++) {
      let random = Math.floor(Math.random() * pass.length);
      str += pass.charAt(random);
    }
    setpassword(str);
  }, [numInvolved, charInvolve, length]);

  const checkStrength = useCallback(() => {
    // Pass weak
    if (length < 8) {
      setstrengthlevel('Weak');
      setStenghtImage(weak)
      setstrengthcolor('#ff4122');
    }
    // Pass Good
    else if (length >= 8 && length <= 12) {
      setstrengthlevel('Good');
      setStenghtImage(good)
      setstrengthcolor('#facc15');
    }
    // Pass Strong
    else if (length > 12 && length <= 25) {
      setstrengthlevel('Strong');
      setStenghtImage(strong)
      setstrengthcolor('#eab308');
    }
    // Pass Very Strong
    else if (length > 25) {
      setstrengthlevel('Very Strong');
      setStenghtImage(Vstrong)
      setstrengthcolor('#22c55e');
    }
  }, [length]);
  
  
  

  useEffect(() => {
    MakePassword();
    checkStrength();
  }, [length, charInvolve, numInvolved, MakePassword, checkStrength]);

  return (
  <div className='w-full  flex justify-center flex-col items-center '>
      <h1 className='font-bold text-balance text-center text-4xl p-1 m-2'>Lockify: Generate Random Password</h1>
      <div className='IMAGEst h-200'>
        <img src={StenghtImage} alt="Password strength" className='object-cover' />
      </div>
      <div style={{backgroundColor:strengthcolor}} className=' w-80 flex rounded-full border-solid border-2 border-black '>
        <input
          type="text"
          readOnly
          value={password}
          className='w-4/3 bg-transparent rounded-l-full text-center '
          placeholder='Password'
        />
        <div style={{ backgroundColor: strengthcolor }}className="rounded-r-full w-full text-center font-semibold cursor-pointer">
            {strengthlevel}
        </div>


      </div> 
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-5'>
        <CopyToClipboard text={password}>
          <div className="copy">Copy</div>
        </CopyToClipboard>
      </button>
      <div className=' pass flex justify-center items-center flex-col '>
        <input
          type="range"
          name="textlength"
          onChange={(e) => {
            setlength(e.target.value);
          }}
          id="length"
          className='h-10 p-1 ml-3 cursor-pointer w-60 accent-blue-600'
          min={1}
          max={30}
          value={length}
        />
        <label htmlFor='length' className='mb-5'>Password length:{length}</label>
          <div className='Allows text-lg font-bold flex  cursor-pointer'>
          <label htmlFor='num'>Num </label>
          <input
            type="checkbox"
            name="Use numbers"
            id="num"
            className='mr-4 ml-2'
            checked={numInvolved}
            onChange={() => {
              setnumInvolved(!numInvolved);
            }}
          />
          <label htmlFor='char' className='ml-4'>Char </label>
          <input
            type="checkbox"
            name="Use special characters"
            id="char"
            checked={charInvolve}
            className=' ml-2'
            onChange={() => {
              setcharInvolved(!charInvolve);
            }}
          />
          </div>
      </div>
  </div>
  );
}

export default App;
