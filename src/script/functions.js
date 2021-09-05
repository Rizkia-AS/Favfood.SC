import $ from "jquery";
const capitalize = require('lodash.capitalize');

const lsEpKey = `ls_endpoint`

class LearnApi {
    static getEndpoint() {
        return fetch(`https://crudcrud.com`)
        .then(res => res.text())
        .then(text => {
            return `${text}`.slice(`${text}`.indexOf(`api`) + 4,`${text}`.indexOf(`api`) +36);
        });
    }

    static getQuota(endpoint) {
        return fetch(`https://crudcrud.com/Dashboard/${endpoint}`)
        .then(res => res.text())
        .then(text => {
            return `${text}`.slice(`${text}`.indexOf(`Requests`) + 50,`${text}`.indexOf(`100`)+3);
        });
    }

    static getExpiration(endpoint){
        return fetch(`https://crudcrud.com/Dashboard/${endpoint}`)
        .then(res => res.text())
        .then(text => {
            return `${text}`.slice(`${text}`.indexOf(`Expiration`) + 56,`${text}`.indexOf(`hours`)+5);
        });
    }

    static post(endpoint,data) {
        return fetch(`https://crudcrud.com/api/${endpoint}/makanan`, {
            headers: {"Content-Type": "application/json;charset=UTF-8"},
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => console.log(json.message))
        .catch(e => console.log(e));
    }

    static put(endpoint,data,id) {
        return fetch(`https://crudcrud.com/api/${endpoint}/makanan/${id}`, {
            headers: {"Content-Type": "application/json;charset=UTF-8"},
            method: "PUT",
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => console.log(json.message))
        .catch(e => console.log(e));
    }

    static delete(endpoint,id) {
        return fetch(`https://crudcrud.com/api/${endpoint}/makanan/${id}`,{method: "DELETE"})
        .then(res => res.json())
        .then(json => console.log(json.message))
        .catch(e => console.log(e));
    }

    static get(endpoint) {
        return fetch(`https://crudcrud.com/api/${endpoint}/makanan`, {method : `GET`})
        .then(res => res.json())
        .then(json => json);
    }
}



class themealdbApi {
    static randomArea() {
        return fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        .then(res => res.json())
        .then(json => {
            let r = Math.round(Math.random()*(json.meals.length));
            if(r == json.meals.length) {r = r -1; }
            return json.meals[r].strArea;
        });
    }

    static randomMeal(area) {
        return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
        .then(res => res.json())
        .then(json => {
            let r = Math.round(Math.random()*(json.meals.length));
            if(r == json.meals.length) {r = r -1; }
            return {
                nama : `${json.meals[r].strMeal}`,
                gambar : `${json.meals[r].strMealThumb}`
            };
        });
    }
}



const getEl = (selector) => {
    return document.querySelector(`${selector}`);
}



const upData = (key,data) => {
    localStorage.setItem(key, JSON.stringify(data));
}



const loadData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}



const renderLimitInfo = async (endpoint) => {
    const quota = await LearnApi.getQuota(endpoint);
    const expiration = await LearnApi.getExpiration(endpoint);
    $(`.req-lim`).html(`${quota}`);
    $(`.time-lim`).html(`${expiration}`);
}



const renderList = (dataList,category) => {
    if(category && category != `Semua`) {
        const filteredData = dataList.filter(data => data.kategori == category)
        getEl(`grid-list`).makanans = filteredData;
    } else {getEl(`grid-list`).makanans = dataList;}
}

export {lsEpKey,LearnApi,getEl,loadData,upData,renderLimitInfo,renderList,themealdbApi,$,capitalize};
