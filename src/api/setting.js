import {ApiConfig} from '../config/dev'

export const API_BASE_URL = "https://api.themoviedb.org/3/discover/movie?api_key=" + ApiConfig.apiKey + "&language=en-US&sort_by=%desc%&include_video=false"
export const CONTENT_BASE_URL = "https://api.themoviedb.org/3/movie/%movieid%?api_key="+ ApiConfig.apiKey + "&language=en-US"
export const SEARCH_BASE_URL = "https://api.themoviedb.org/3/search/movie?api_key="+ ApiConfig.apiKey + "&language=en-US&query=%query%&include_adult=false"
export const IMG_ENDPOINT = "https://image.tmdb.org/t/p/w300_and_h450_bestv2"
export const proxyUrl = 'https://protected-crag-97762.herokuapp.com/'
//https://www.rottentomatoes.com/api/private/v2.0/
//https://www.rottentomatoes.com/api/private/v1.0/