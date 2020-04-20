import {API_BASE_URL,CONTENT_BASE_URL, proxyUrl} from './setting'

export const FetchData = (page)=>{
    var url = proxyUrl+API_BASE_URL+'&page='+page

    var moviearr = []
    return(
    fetch(url,{
        'origin':'https://developer.mozilla.org',
    })
    .then(response=>response.json())
    .then(data=>data.results)
    .then(movies=>{
        movies.map(movie=>{
        moviearr.push({
            'id':movie.id,
            'img':movie.posters.primary,
            'title':movie.title,
            'score':movie.tomatoScore,
        })
      })
        return moviearr
    }
    ))
}

export const FetchDetail = (id)=>{
    var url = CONTENT_BASE_URL+ id
    var detail = []
    return(
    fetch(url)
    .then(response=>response.json())
    .then(movie=>{
        var movieinfo = {
            'id':movie.id,
            'img':movie.imageUrl,
            'title':movie.title,
            'score':movie.tomatometerScore,
            'duration':movie.runningTime,
            'description':movie.synopsis,
            'hotcomment':movie.criticConsensus,
            'rating':movie.mpaaRating,
            'actors':movie.actors,
            'releasedate':movie.theaterReleaseDate,
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

