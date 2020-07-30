
import { $requestFormData, $requestBody,request } from './axios.js';
global.$Log = function () {
    const args = Array.from(arguments);
    if (process.env.NODE_ENV === 'development') {
        global.console.log(...args);
    }
}
global.$request = request;
global.$requestFormData = $requestFormData;
global.$requestBody = $requestBody;
global.$getPageTitle = (title) => {
    const defaultTitle = '会员管理系统';
    return title ? title : defaultTitle;
}

function copyDeepObject(obj) {
    let newObj;
    if (Object.prototype.toString.call(obj) === "[object Object]") {
        newObj = {};
        for (let key in obj) {
            if (typeof obj[key] == "object") {
                newObj[key] = copyDeepObject(obj[key]);
            } else {
                newObj[key] = obj[key];
            }
        }
    } else if (Object.prototype.toString.call(obj) === "[object Array]") {
        newObj = [];
        obj.forEach(item => {
            if (typeof item == "object") {
                newObj.push(copyDeepObject(item));
            } else {
                newObj.push(item);
            }
        });
    }
    return newObj;
}

function parseTime(time, cFormat) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string')) {
            if ((/^[0-9]+$/.test(time))) {
                // support "1548221490638"
                time = parseInt(time)
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(new RegExp(/-/gm), '/')
            }
        }

        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        return value.toString().padStart(2, '0')
    })
    return time_str
}
global.$copyDeepObject = copyDeepObject;
global.$parseTime = parseTime;


export const debounce = function (func, wait) {
    let timeout;
    return function() {
      let context = this;
      let args = arguments;
  
      if (timeout) clearTimeout(timeout);
  
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }