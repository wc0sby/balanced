const handleErrors=(res)=>{
  if(!res.ok){
    throw Error(res.statusText)
  }
  return res
  
}

export const loadMain=()=>{
  return (dispatch) =>{
    fetch(`/transaction`)
      .then(handleErrors)
      .then(res => res.json())
      .then(
        (transactions)=>{
        dispatch(mainLoaded(transactions))
    })
  }
}

const mainLoaded=(transactions)=>{
  return{
    type: "TRANSACTIONS_LOADED",
    value: transactions
  }
}

//Post new transaction
export const postNewMainTrx=(main)=>{
  return (dispatch)=>{
    fetch("/transaction",{
      method: 'post',
      body: JSON.stringify(main),
      headers:{
        'content-type': 'application/json'
      } 
    })
    .then(handleErrors)
    .then(res=>res.json())
    .then((trx)=>{
      dispatch(loadMain(trx))
    })
  }
}

//Delete transaction
export const deleteMainTrx=(id)=>{
  return (dispatch)=>{
    fetch(`/transaction/${id}`,{
      method: 'DELETE'
    })
    .then(handleErrors)
    .then(res=>res.json())
    .then((trx)=>{
      dispatch(loadMain(trx))
    })
  }
}

export const postUpdateMainTrx=(main, id)=>{
  return (dispatch)=>{
    fetch(`/transaction/${id}`,{
      method: 'put',
      body: JSON.stringify(main),
      headers:{
        'content-type': 'application/json'
      } 
    })
    .then(handleErrors)
    .then(res=>res.json())
    .then((trx)=>{
      dispatch(loadMain(trx))
    })
  }
}