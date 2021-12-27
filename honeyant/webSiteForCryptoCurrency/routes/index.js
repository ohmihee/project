const express = require('express');
const axios = require('axios');
const router = express.Router();
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const log = console.log;
const mainRouter = require('./main/index');
const userRouter = require('./user/index');

router.use('/user',userRouter);
router.use('/',mainRouter);



/*router.get('/',(req,res)=>{
           /* data.title = $(this).find('div.news_wrap.api_ani_send div.news_area a.news_tit').attr('title');*/  
           /*const getHtml = async () => {
            try {
              return await axios.get("https://www.yna.co.kr/sports/all");
            } catch (error) {
              console.error(error);
            }
          };

          
//           getHtml()
//             .then(html => {
//               let ulList = [];
//               const $ = cheerio.load(html.data);
//               const $bodyList = $("div.headline-list ul").children("li.section02");
          

//               $bodyList.each(function(i, elem) {
//                 ulList[i] = {
//                     title: $(this).find('strong.news-tl a').text(),
//                     /*
//                     url: $(this).find('strong.news-tl a').attr('href'),
//                     image_url: $(this).find('p.poto a img').attr('src'),
//                     image_alt: $(this).find('p.poto a img').attr('alt'),
//                     summary: $(this).find('p.lead').text().slice(0, -11),
//                     date: $(this).find('span.p-time').text()
//                     */
//                 };
//               });

          
//               const data = ulList.filter(n => n.title);
//               return data;
//             })
//             .then(res => log(res));
//             getHtml();
// })


module.exports = router;

