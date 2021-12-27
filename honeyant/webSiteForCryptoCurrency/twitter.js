// const Twit = require('twit');
// const notifier = require('node-notifier');
// const open = require('open');
// const franc = require('franc');

// const apikey = '0f9WLamWm0ZiUMkbtlidMLem3'
// const apiSecretKey = 'm7xSsRbu3wjNutWpgXaWcAT0KIbBRBZXVOfEbuOIlCVqLx7IJq'
// const accessToken = '1394454344733319170-cKDMaBZreVkyvKmPTnU1mIElGAKP8v'
// const accessTokenSecret = 'FnQGVoZHqqass5SzZNwsHLGveRBG0ZMAU0qC1QEAFJS0e'

// var T = new Twit({
//     consumer_key: apikey,
//     consumer_secret: apiSecretKey,
//     access_token: accessToken,
//     access_token_secret: accessTokenSecret,
// });
//
// (async () => {
//     T.get('search/tweets', {q: '#tesla since:2021-05-01', count: 100 }, function(err, data, response){
//         const tweets = data.statuses
//         .map(tweet => `LANG: ${franc(tweet.text)}: ${tweet.text}`)
//         .filter(tweet => tweet.toLowerCase().includes('@elonmusk'));
//         console.log(tweets);
//     })

//     //     //2. REAL TIME MONITORING USING STREAM (HASHTAG)
//     // var stream = T.stream('statuses/filter', { track: '#tesla'} , { track: '#elon'})
//     // stream.on('tweet', function (tweet) {
//     //     console.log(tweet.text);
//     //     console.log('Language: ' + franc(tweet.text));
//     //     console.log('------');
//     // })
// })();


const axios = require("axios");
const cheerio = require("cheerio");

const getHtml = async () => {
  try {
    return await axios.get("https://twitter.com/elonmusk");
  } catch (error) {
    console.error(error);
  }
 
};

async function Twitter(){
  const item = await getHtml();
  let ulList = [];
  const $ = cheerio.load(item.data);
  const $bodyList = $("div.css-1dbjc4n").children("section")
  $bodyList.each(function(i, elem) {
    ulList[i] = {
        title: $(this).find('div.css-1dbjc4n').text(),
        url: 'search.naver.com/search.naver'+$(this).find('div.news_wrap.api_ani_send div.news_area a').attr('href')
    };
  });

  const data = ulList.filter(n => n.title);
  return data;

}
module.exports = Twitter;
