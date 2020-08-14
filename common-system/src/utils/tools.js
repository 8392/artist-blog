// 工具类函数
export const changeBase64 = (file) => { //转换图片为base64,返回promise
    return new Promise((resolve, reject) => {
        let obj = new FileReader();
        obj.readAsDataURL(file);
        obj.onload = (e) => {
            // 压缩图片
            let img = new Image();
            img.src = obj.result;
            img.onload = () => {
                const w = img.width;
                const h = img.height;
                const scale = w / h;
                const max_w = w > 1080 ? 1080 : w;
                const max_h = h * max_w / w;
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext('2d');
                canvas.width = max_w;
                canvas.height = max_h;
                ctx.drawImage(img, 0, 0, max_w, max_h);
                const res = canvas.toDataURL('image/jpeg', 0.7);
                resolve(res)
            }
        };
    })
}

export const changeFormData = (data) => {  //图片上传格式
    let formData = new FormData()
    for (let key in data) {
        formData.append(key, data[key]);
    }
    return formData
}

export const judgeFile = (fileName) => {  //判断文件格式
    const obj = {
        img: ['png', 'jpg', 'jpeg', 'bmp', 'gif'],
        excel: ['xls', 'xlsx'],
        word: ['doc', 'docx'],
        ppt: ['ppt', 'pptx'],
        pdf: ['pdf'],
        zip: ['zip']
    }
    let imgURl = "";
    for (let key in obj) {
        if (obj[key].includes(fileName)) {
            imgURl = require(`@/assets/img/${key}.png`)
        }
    }
    return imgURl
}

export const changeDate = (dateStr, getDay) => { //日期时间格式化
    var date = new Date(dateStr);
    var year = "" + date.getFullYear() + "";
    var month = "" + (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1) + "";
    var day = "" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate()) + "";
    var hour = "" + (date.getHours() < 10 ? ("0" + date.getHours()) : date.getHours()) + "";
    var minute = "" + (date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes()) + "";
    var second = "" + (date.getSeconds() < 10 ? ("0" + date.getSeconds()) : date.getSeconds()) + "";
    var returnDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    if (getDay) {
        returnDate = year + '-' + month + '-' + day
    }
    return returnDate
}