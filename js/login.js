$(function () {
    document.getElementById("username").value = localStorage.getItem('username');
    document.getElementById("password").value = localStorage.getItem('password');
    document.getElementById("remember").checked = localStorage.getItem('checked');
});

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let remember = document.getElementById("remember");
    if(remember.checked === true){
        localStorage.username = username;
        localStorage.password = password;
        localStorage.checked = true;
    }
    if(remember.checked === false) {
        localStorage.username = '';
        localStorage.password = '';
        localStorage.checked = false;
    }
    if(username===""||password===""){
        alert("用户名及密码不能为空，请您重新输入！");
    }else{
        $.ajax({
            type: 'POST',
            url: baseURL + loginAdmin,
            data: JSON.stringify({
                'username':username,
                'password':password
            }),                     //将数据进行json化处理
            contentType: 'application/json; charset=utf-8',
            success: function(res,status,xhr) {
                if(res.status === 0){
                    // let token = xhr.getResponseHeader('authorization');
                    let token = res.data.optVal;
                    localStorage.setItem('verification',token);
                    window.location.href = 'index.html';
                } else {
                    alert("对不起！您的账号或密码出现错误！请仔细检查！");
                }
            }
        })
    }
}

