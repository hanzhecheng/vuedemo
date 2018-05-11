
export function GetToken() {
    return localStorage.getItem("ID")
}
//sessionStorage存token,防止刷新后vuex数据清空问题
export function SetToken(token) {
    return localStorage.setItem("ID", token)
}