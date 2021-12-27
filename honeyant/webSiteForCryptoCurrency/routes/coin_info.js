const axios = require("axios");
const cheerio = require("cheerio");

const getHtml = async () => {
  try {
    return await axios.get("https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EC%BD%94%EC%9D%B8&oquery=%EC%BD%94%EC%9D%B8+%EC%9D%B4%EC%8A%88&tqi=h6c69sprvhGssMz9Avhssssssld-154039");
  } catch (error) {
    console.error(error);
  }
 
};

async function Main(){
  const item = await getHtml();
  let ulList = [];
  const $ = cheerio.load(item.data);
  const $bodyList = $("ul.list_news").children("li")
  $bodyList.each(function(i, elem) {
    ulList[i] = {
        title: $(this).find('div.news_wrap.api_ani_send div.news_area a.news_tit').text(),
        url: $(this).find('div.news_wrap.api_ani_send div.news_area a.news_tit').attr('href')
    };
  });

  const data = ulList.filter(n => n.title);
  return data;
  /*
  
  const item = await getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("ul.list_news").children("li")
    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).find('div.news_wrap.api_ani_send div.news_area a.news_tit').text(),
          url: 'search.naver.com/search.naver'+$(this).find('div.news_wrap.api_ani_send div.news_area a').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(res => {
    let arr = []

    for(var i=0; i<res.length;i++){
      arr.push(res[i]);
    }
    return res;
  });

  return Promise.resolve('aaa');
  */
}
module.exports = Main;
