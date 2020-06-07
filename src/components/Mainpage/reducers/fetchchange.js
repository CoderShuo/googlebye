const storedata = (page,query,sort,maxpage)=>{
    sessionStorage.setItem("page",page)
    sessionStorage.setItem("query",query)
    sessionStorage.setItem("sort",sort)
    sessionStorage.setItem("maxpage",maxpage)
}

const fetchchange = (state={
    query: sessionStorage.getItem("query")?sessionStorage.getItem("query"):null,
    page: sessionStorage.getItem("page")?parseInt(sessionStorage.getItem("page")):1,
    sort: sessionStorage.getItem("sort")?sessionStorage.getItem("sort"):'popularity.desc',
    maxpage: sessionStorage.getItem("maxpage")?sessionStorage.getItem("maxpage"):1,
    }, action)=>{
        switch (action.type) {
            case 'CHANGE_PAGE':
                let data = {
                    page:action.page,
                    query:state.query,
                    sort:state.sort,
                    maxpage: state.maxpage
                }
                storedata(data.page,data.query,data.sort,data.maxpage)
                return data

            case 'CHANGE_SORT':
                data = {
                    page:1,
                    query:null,
                    sort:action.sort,
                    maxpage: state.maxpage
                }
                storedata(data.page,data.query,data.sort,data.maxpage)
                return data

            case 'CHANGE_QUERY':
                data = {
                    page:1,
                    query:action.query,
                    sort:state.sort,
                    maxpage: state.maxpage
                }
                storedata(data.page,data.query,data.sort,data.maxpage)
                return data
            
            case 'CHANGE_MAX':
                data ={
                    page:state.page,
                    query:state.query,
                    sort:state.sort,
                    maxpage: action.maxpage
                }
                storedata(data.page,data.query,data.sort,data.maxpage)
                return data

            default:
                return state
        }
    }

    
export default fetchchange