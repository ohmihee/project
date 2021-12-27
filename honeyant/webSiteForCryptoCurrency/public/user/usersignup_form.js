let submit = document.querySelector('.submit');

window.addEventListener('change',()=>{    
    let id = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let passwordChk = document.querySelector('#password_chk').value;
    let birth = document.querySelector('.birth').value.length;
    let gender = document.querySelector('.gender').value;
    let name = document.querySelector('#user_name').value;
    let tel1 = document.querySelector('.phone1').value.length;
    let tel2 = document.querySelector('.phone2').value.length;
    let tel3 = document.querySelector('.phone3').value.length;

    if(id&&password&&passwordChk&& birth==6 && gender && name &&tel1==3 && tel2>=3 && tel3 ==4){
        submit.style.background="rgb(253, 195, 27)";
        submit.removeAttribute('disabled');
    }
    else{
        submit.setAttribute('disabled','true');
        submit.style.background="rgb(255,253,219)";
    }
})


submit.addEventListener('click',()=>{
    let idchk = document.querySelector('.idchk');
    let id = document.querySelector('#email');
    let password = document.querySelector('#password');
    let pwchk = document.querySelector('.pwchk').value;
    if(idchk.style.color == "red" || idchk.value == ""){
        submit.setAttribute('disabled','true');
        id.focus();
        alert('아이디를 확인하세요.');
    }else if (pwchk){
        submit.setAttribute('disabled','true');
        password.focus();
        alert('비밀번호를 확인하세요');
    }
});



let pwChk = document.querySelector('#password_chk');

function pwcheck(){
    console.log('pwcheck들어옴');
    let pwchk = document.querySelector('.pwchk');
    let password = document.querySelector('#password').value;
    let passwordChk = document.querySelector('#password_chk').value;
    if(password != passwordChk){
        pwchk.style.color = "red";
        pwchk.innerHTML="입력하신 비밀번호가 다릅니다.";  
        
    }else{
        pwchk.innerHTML="";
    }
}

pwChk.addEventListener('focusout',pwcheck);
