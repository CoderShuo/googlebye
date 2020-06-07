import React, {Component, useState} from 'react';



const Pageview=({pages,ChangePage})=>{
    var page=pages.page
    var maxpage = pages.maxpage
    var last = false
    var from = parseInt(page/10)*10
    var arr = [];
    const [financialGoal,setfinancialGoal] = useState()

    for(var i = from; i < from+10; i++){
      arr.push(i);
    }
    var pagehtml = [
      <button 
      className="pagebutton" 
      id="pre" 
      disabled={page==1} 
      key={0}
      onClick={()=>ChangePage(page-1)}
      >pre</button>
    ]
    arr.map((x,indx)=>{
  
      if(x>maxpage){
        last=true
        return
      }
        
  
      if(x===page){
        pagehtml = [...pagehtml, 
        <button className="pagebutton" id={x} 
        key={indx+1} 
        style={{color:"#111"}
    }>{x}</button>]
      }
      else if(x>0){
        pagehtml = [...pagehtml, 
        <button className="pagebutton" 
        id={x} 
        key={indx+1}
        onClick={()=>ChangePage(x)}
        >{x}</button>]
      }
    })

    pagehtml = 
    page==maxpage ? pagehtml:
    [...pagehtml, 
    <button className="pagebutton" 
            id="next" 
            key={11}
            onClick={()=>ChangePage(page+1)}
            >next</button>
]
    pagehtml = [...pagehtml, 
    <span className="pagebutton goto" key={12}>
        <input 
        className="inputno" 
        id="pagebox" 
        maxLength="3" 
        width="3"
        value={financialGoal}
        onChange={event => setfinancialGoal(event.target.value.replace(/\D/,''))}
        onKeyPress={e=>{
          if(e.key=== "Enter")
            document.getElementById('switchpage').click()
        }}
        />
        <div 
        id="switchpage" 
        className="jump"
        onClick={()=>{
          var page = document.getElementById('pagebox').value
          setfinancialGoal('')
          if(!page)
            return
          var to = parseInt(page)>pages.maxpage ? pages.maxpage:parseInt(page)
          ChangePage(to)
          }}
        >Go to page</div></span>]
    return (<div className="pagepart">{pagehtml}</div>)
  }

  export default Pageview