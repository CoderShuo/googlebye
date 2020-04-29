
//import {API_BASE_URL,CONTENT_BASE_URL, BaseProxy, ContentProxy} from './setting'

const {createProxyMiddleware}= require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    createProxyMiddleware("/api/private/v1.0/sponsored/movies/details/?movieId=",
    {
      target: "https://www.rottentomatoes.com",
      changeOrigin: true,
      ingorePath: false,
    },
  )),
  app.use(
    createProxyMiddleware("/api/private/v2.0/browse?maxTomato=100&services=amazon%3Bhbo_go%3Bitunes%3Bnetflix_iw%3Bvudu%3Bamazon_prime%3Bfandango_now&certified&sortBy=release&type=dvd-streaming-all",
    {
        target: "https://www.rottentomatoes.com",
        changeOrigin: true,
        ingorePath: false,
    },
  ))
};