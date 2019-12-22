const http = require("http");
const urlArr = [
    "http://localhost:3000/api/data/a",
    "http://localhost:3000/api/data/b",
    "http://localhost:3000/api/data/c"
]
urlArr.forEach(url => {
    http.get(url, function (data) {
        var str = "";
        data.on("data", function (chunk) {
            str += chunk;//监听数据响应，拼接数据片段
        })
        data.on("end", function () {
            console.log(str.toString())
        })
    })
})
