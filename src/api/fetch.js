import {API_BASE_URL,CONTENT_BASE_URL, SEARCH_BASE_URL, IMG_ENDPOINT} from './setting'

export const FetchData = (page, query)=>{
    var url = query ? (SEARCH_BASE_URL+'&page='+page).replace('%query%',query):(API_BASE_URL+'&page='+page).replace('%desc%','popularity.desc')
    var moviearr = []
    return(
    fetch(url,{
        headers:{
        "Origin":'https://developer.mozilla.org',
        "Referer": 'https://developer.mozilla.org',}
    })
    .then(response=>response.json())
    .then(data=>data.results)
    .then(movies=>{
        movies.map(movie=>{
        moviearr.push({
            'id':movie.id,
            'img': IMG_ENDPOINT+movie.poster_path,
            'title':movie.title,
            'score':movie.vote_average,
        })
      })
        return moviearr
    }
    ))
}

export const FetchDetail = (id)=>{
    var url = CONTENT_BASE_URL.replace('%movieid%',id)
    var detail = []
    return(
    fetch(url)
    .then(response=>response.json())
    .then(movie=>{
        var movieinfo = {
            'id':movie.id,
            'img':IMG_ENDPOINT+movie.backdrop_path,
            'title':movie.title,
            'score':movie.vote_average,
            'duration':movie.runtime,
            'description':movie.overview,
            'hotcomment':movie.criticConsensus,
            'rating':movie.mpaaRating,
            'actors':movie.actors,
            'releasedate':movie.release_date,
        }
        return movieinfo
    }))
}



// function getDetails(id){
//     var movie = {}
//     var url = CONTENT_BASE_URL+id

//     fetch(url)
//     .then(response=>response.json())
//     .then(info=>{
//         if (info){
//             movie['img'] = info.get('imageUrl')
//             movie['duration'] = info.get('runningTime')
//             movie['title'] = info.get('title')
//             movie['description'] = info.get('synopsis')
//             movie['hotcomment'] = info.get('criticConsensus')
//             movie['rating'] = info.get('mpaaRating')
//             movie['actors'] = info.get('actors')
//             movie['score'] = info.get('tomatometerScore')
//             movie['releasedate'] = info.get('theaterReleaseDate')
//         }
//     })
//     return movie
// }

