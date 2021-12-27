const Main = require("../coin_info")
const fetch = require('node-fetch');
const { JSON } = require("sequelize");


// async function a(){
//     /*
//     const b = await Main();
//     console.log(b);
//    */ 
// }
// a();




let  main  = async (req, res) => {
    
    const data = await Main();

    // const info = await apiCall.start(cnt);

    res.render('./main/index.html',{
        userid:req.session.uid,
        isLogin:req.session.islogin,
        issue:data,
    });
};
    
exports.mainCon = main;