const {Join} = require('../../models/index');

let login = (req,res) =>{
    res.render('./user/login.html',{
        flag:req.query.flag
    });
}

let signUp= (req,res) =>{
    res.render('./user/signup_agree.html');
}
//post
let signupForm = async(req,res) =>{
    let flag = await req.body.chk[2];
    res.render('./user/signup_form.html',{
        chk:flag
    })
}
//post
let signSuccess = async(req,res) =>{
    let email = req.body.email;
    let pw = req.body.password;
    let gender = req.body.gender;
    let birthnumber = req.body.birth;
    let name = req.body.user_name;
    let add_option = req.body.add_option;
    if (add_option =='') add_option =0;
    let phonenum1 = req.body.phone_num[0];
    let phonenum2 = req.body.phone_num[1];
    let phonenum3 = req.body.phone_num[2];
    let phonenum = phonenum1+phonenum2+phonenum3;


    try{
        let rst = await Join.create({
            email,pw,gender,name,add_option,contact:phonenum,birth:birthnumber
        })
    }catch(e){
        console.log(e);
    }


    res.render('./user/signup_success.html',{
        name,
    });
}

let findPw = (req,res) =>{
    res.render('./user/find_pw.html');
}

//post
let pwSuccess = (req,res) =>{
    res.render('./user/find_pw_success.html',{

    })
} 

let info = async(req,res) =>{
    let userList= await Join.findAll({});
     res.render('./user/info.html',{
         userList,
    });
}

let idCheck = async (req,res)=>{
    let idFlag = false;
    
    let email = req.body.email;
    let result = await Join.findOne({
        where:{email,}
    });
    if (result ==undefined)idFlag= true;
    res.json({
        check:idFlag,
        email,
    });
    
}


let loginCheck=async(req,res)=>{
    let email = req.body.email;
    let pw = req.body.password;
    let result = await Join.findOne({
        where:{email,pw,}
    })

    if(result == null){
        console.log('없음');
        res.redirect('/user?flag=0');
    }else{
        console.log('있음');
        req.session.uid=email;
        console.log(req.session.uid);
        req.session.islogin=true;
        console.log(req.session.islogin);
        req.session.save(()=>{
            res.redirect('/');
        })    
    }
}

let logout = (req,res)=>{
    req.session.destroy(()=>{
        console.log('로그아웃들어옴');        
            res.redirect('/');            
    })
}
/*
let login_check = async (req,res) =>{
    let userid = req.body.userid;
    let userpw = req.body.userpw;
    let result = await User.findOne({
        where:{userid, userpw }//res.redirect();//다시 처음 index로 가게됨
    })
    
    if(result == null){
        //로그인실패
        res.redirect('/user/login?flag=0');
    }else{
    req.session.uid = userid;
    req.session.isLogin = true;
    //전체적 서버에서 공통적으로 쓰는 변수가 됨. uid, isLogin

    req.session.save(()=>{
        res.redirect('/');
        })
    }
}

let logout = async(req,res)=>{
    //req.session.destroy(()=>{
    //    res.redirect('/');
    delete req.session.isLogin;
    delete req.session.uid;

    req.session.save(()=>{
        res.redirect('/');
    })
}


let userid_check = async(req,res) =>{
    let userid = req.query.userid;
    let flag = false;
    let result = await User.findOne({fafd
        where:{userid}
    })
    
    //result==undefined>>생성가능
    //result != undefined 생성불가능
    if(result == undefined){
        flag = true;//생성가능
    } else{
        flag = false;
    } 
    res.json({login:flag, userid,})
}
*/
module.exports={
    login,signUp,signupForm,signSuccess,findPw,pwSuccess,info,idCheck,loginCheck,logout,
}

//fighiting;;