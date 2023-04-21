import { useState } from 'react';

import './App.css';

const App = () => {
  let [value,setValue] = useState('0')
  let [equal,setEqual] = useState('0')

  let clearValue = () =>{
    setValue('0')
    setEqual('0')
  }

  let changeValueNumOrSubtract = (num) => {
    if(value === '0'){
      setValue(num)
      setEqual('0')
    }
    else if(value.length > 24){
      clearValue()
    }else{
      setValue((prev)=> prev + num)
    }
  }

  let changeValueDecimal = (decimal) => {
    let res = value.split(/[\+\-\*\/]/g).slice(-1)
    
    if(res[0] == ''){
      setValue((prev)=>prev + `0${decimal}`)
    }else if(!res[0].includes(decimal)){
      setValue((prev)=>prev + decimal)
    }
  }

  let changeValueSymbol = (symbol) => {
    if( isNaN(+value.slice(-1)) ){
      if(value.slice(-1) == '-' && value.length > 1){
        setValue((prev)=>prev.slice(0,prev.length - 2) + symbol)
      }else{
        setValue((prev)=>prev.slice(0,prev.length - 1) + symbol)
      }
    }else{
      setValue((prev)=>prev + symbol)
    }
  }

  let changeEqual = () => {
    try{
      let res = Math.fround(eval(value)).toString()
      setEqual(res)
      setValue(res)
    }catch{
      setEqual('NaN')
      setValue('0')
    }    
  }


  return (
    <div className="wrapper_app">
      <div className='calculator'>
        <div className='display' id='display'>
          <div className='answer'>{equal}</div>
          <input type="text"
                 className='expression'
                 value={value}  
                 disabled/>
        </div>
        <div className='buttons_panel'>
          <button onClick={clearValue} className='doubleWidth' id='clear' style={{backgroundColor : 'rgb(161, 54, 54)'}}>AC</button>
          <button onClick={()=>changeValueSymbol("/")} className='symbol' id='divide'>/</button>
          <button onClick={()=>changeValueSymbol("*")} className='symbol' id='multiply'>*</button>
          <button onClick={()=>changeValueNumOrSubtract("7")} id='seven'>7</button>
          <button onClick={()=>changeValueNumOrSubtract("8")} id='eight'>8</button>
          <button onClick={()=>changeValueNumOrSubtract("9")} id='nine'>9</button>
          <button onClick={()=>changeValueNumOrSubtract("-")} className='symbol' id='subtract'>-</button>
          <button onClick={()=>changeValueNumOrSubtract("4")} id='four'>4</button>
          <button onClick={()=>changeValueNumOrSubtract("5")} id='five'>5</button>
          <button onClick={()=>changeValueNumOrSubtract("6")} id='six'>6</button>
          <button onClick={()=>changeValueSymbol("+")} className='symbol' id='add'>+</button>
          <button onClick={()=>changeValueNumOrSubtract("1")} id='one'>1</button>
          <button onClick={()=>changeValueNumOrSubtract("2")} id='two'>2</button>
          <button onClick={()=>changeValueNumOrSubtract("3")} id='three'>3</button>
          <button onClick={changeEqual} className='doubleHeight' id='equals'>=</button>
          <button onClick={()=>changeValueNumOrSubtract("0")} className='doubleWidth' id='zero'>0</button>
          <button onClick={()=>changeValueDecimal(".")} id='decimal'>.</button>
        </div>
      </div>
    </div>
  );
};


export default App;
