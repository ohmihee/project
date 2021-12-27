const express = require('express'); 
const router = express.Router();
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

const run = async ()=>{ 
    const extraData = html =>{
        const data = {
            title:null,
            link:null,
            desc:null,
            image:null,
        };

        const $ = cheerio.load(html);
        const $items = $('ul.list_news>li');
        $itmes.each(function(i,ele){
            data.title = $(this).find('a.news_tit').attr('title');
            console.log(data);
        });
    }

    const browserOption = {
        headless : true,
    };

    const browser = await puppeter.launch(browserOption);
    const page = await browser.newPage();

    try{
        const url = 'https://search.naver.com/search.naver?where=news&sm=tab_jum&query=%EC%BD%94%EC%9D%B8';
        const response = await page.goto(url);
        const html = await response.text();
        extraData(html);
    }catch(e){
        console.log(e);
    }finally{
        await page.close();
        await browser.close();
    }
}