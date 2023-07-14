import React, { useState,useEffect ,useRef} from 'react'
import { toast, ToastContainer } from 'react-toastify'
import './App.css'
import {numbers,upperCaseLetters,lowerCaseLetters,specialCharacters} from './characters'
import 'react-toastify/dist/ReactToastify.css'
import { SUCCESS_MSG_COPY } from './message'
import StrengthBar from './PasswordStrengthBar';
import ProgressBar from './ProgressBar'

function App() {
    
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(10)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const prevIncludesUpperCase = useRef(false);
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [passwordScore,setPasswordScore] = useState(0)

  const handleGeneratePassword = (e) => {
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notify('Select atleast one option', true)
    }
    let characterList = ''

    if (includeLowercase) {
      characterList = characterList + lowerCaseLetters
    }

    if (includeUppercase) {
      characterList = characterList + upperCaseLetters
    }

    if (includeNumbers) {
      characterList = characterList + numbers
    }

    if (includeSymbols) {
      characterList = characterList + specialCharacters
    }

    setPassword(createPassword(characterList))
  
  }


  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }

  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      toast(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const handleCopyPassword = (e) => {
    if (password === '') {
      notify('Nothing To Copy', true)
    } else {
      copyToClipboard()
      notify(SUCCESS_MSG_COPY)
    }
  }


  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (/[a-z]/.test(password)) {
      score++;
    }
    if (/[A-Z]/.test(password)) {
      score++;
    } 
    if (/[0-9]/.test(password)) {
      score++;
    }
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score++;
    }
    if (password.length < 5 && password != "") {
      score = 2
    }

    return score;
  };

  const calculateStrengthLevel = (passwordStrength) => {
    let strengthLevel = ""
    if (passwordStrength == 1) {
      strengthLevel= "VERY WEAK"
    }
    if (passwordStrength == 2) {
      strengthLevel = "WEAK"
    }
    if (passwordStrength == 3) {
      strengthLevel = "MEDIUM"
    }
    if (passwordStrength == 4) {
      strengthLevel = "STRONG"
    }

    return strengthLevel;
  }

  const passwordStrength = calculatePasswordStrength(password);
  const strengthLevel = calculateStrengthLevel(passwordStrength);

    return ( 
        <div className='App'>
          <div className='container'>
            <div className='generator'>
              <p className='generator__header'>Password Generator</p>
              <div className='generator__password'>
                <h3>{password}</h3>
                <button onClick={handleCopyPassword} className='copy__btn'>
                  <i className='far fa-copy'></i>
                </button>
              </div>
  
              <div className='password_info'>
                <div className='form-char-length'>
                  <label htmlFor='password-strength'>Character Length</label>
                  <input
                    defaultValue={passwordLength}
                    onChange={(e) => setPasswordLength(e.target.value)}
                    type='number'
                    id='password-strength'
                    name='password-strength'
                    max='20'
                    min='10'
                    className='char-length'
                  />
                </div>
                <ProgressBar number={passwordLength} max="20"/>

                <div className='form-group'>
                  <input
                    checked={includeUppercase}
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                    type='checkbox'
                    id='uppercase-letters'
                    name='uppercase-letters'
                  />
                  <label htmlFor='uppercase-letters' className='validation-text'>Include Uppercase Letters</label>
                </div>
  
                <div className='form-group'>
                  <input
                    checked={includeLowercase}
                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                    type='checkbox'
                    id='lowercase-letters'
                    name='lowercase-letters'
                  />
                  <label htmlFor='lowercase-letters'>Include Lowercase Letters</label>
                </div>
  
                <div className='form-group'>
                  <input
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    type='checkbox'
                    id='include-numbers'
                    name='include-numbers'
                  />
                  <label htmlFor='include-numbers'>Include Numbers</label>
                </div>
  
                <div className='form-group'>
                  <input
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                    type='checkbox'
                    id='include-symbols'
                    name='include-symbols'
                  />
                  <label htmlFor='include-symbols' style={{fontWeight: '100'}}>Include Symbols</label>
                </div>
  
                <div className='form-strength'>
                  <label htmlFor='passcode-strength'>STRENGTH LEVEL</label>
                  {strengthLevel}
                  <div className="level">
                     <StrengthBar strength={passwordStrength}/>  
                  </div>
                </div>

                <button onClick={handleGeneratePassword} className='generator__btn'>
                  GENERATE<i className='fa-solid fa-arrow-right'></i>
                </button>
                <ToastContainer
                  position='top-center'
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
            </div>
          </div>
        </div>
      </div>
    );
}

export default App;