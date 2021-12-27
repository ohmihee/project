const fetch = require('node-fetch');
const url = 'https://api.upbit.com/v1/market/all?isDetails=false';
const options = {method: 'GET', headers: {Accept: 'application/json'}};



async function showPrice(item){
    const url2 = 'https://api.upbit.com/v1/ticker?markets='+item;
    const options2 = {method: 'GET', headers: {Accept: 'application/json'}};

    const response = await fetch(url2, options2);

    const data = await response.json();
    return data;


    
}

async function showAll(){
    const response = await fetch(url, options);
    const result = await response.json();
    let = marketArr = []
    for(var i=0; i<result.length;i++){
        if(!result[i].market.indexOf('KRW')){
            
            marketArr.push(result[i].market);
            
        }
    }
    
    return marketArr;
}



async function main(cnt){
    let arr = [];
    const result = await showAll();

    for(var i=cnt; i<cnt+10;i++){
        if(i>=result.length){
            cnt=0;
            break;
        }
        
        const coin = await showPrice(result[i]);
        arr.push(coin);  
    }return arr;
   
    
}



async function getLength(){
    const coinList = await showAll();
    return coinList.length; 
}
const timer = ms => new Promise(res => setTimeout(res,ms));

let arr = [];
async function coinInfo(){
     
    // console.log(info);
    console.log('start');
    const getLen = await getLength();
    console.log(getLen);
    
    for(var cnt=0; cnt<getLen+10; cnt=cnt+10){
        const info = await main(cnt);
        arr.push(info[0]);
        console.log(cnt);
        
        await timer(6500);
    }
    return arr;
}

let start = async (req, res) => {
    
    try{
        const info = await main(0);
        res.json({
            coin:info,
        });
    }catch{
        console.log('try start()');
    }

    
    
  
};



module.exports = {
    start:main,
    showAll:showAll,
    coinInfo:start,
    timer:timer,
};