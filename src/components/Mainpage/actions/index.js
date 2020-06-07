export const ChangePage = (page)=>({
    type: 'CHANGE_PAGE',
    page
})

export const ChangeSort = (sort) => ({
  type: 'CHANGE_SORT',
  sort
})

export const ChangeQuery = (query) => ({
  type: 'CHANGE_QUERY',
  query
})

export const ChangeMaxpage = (maxpage)=>({
  type:'CHANGE_MAX',
  maxpage
})