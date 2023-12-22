﻿import JSZip from "jszip";
import axios from "axios";

export const service = {
    get,
    post,
    put,
    delete: _delete,
    getImages
};

const config = {

}
function get(url) {
    return axios.get(url, {}).then(res => res.data);
}

function getImages(url){
    const requestOptions = {
        method: 'GET'
    };
    return fetch(url, requestOptions).then(response => response.blob()).then(async data => {
        const zip = await JSZip.loadAsync(data)
        const files = zip.files

        const imageNames = Object.keys(files)
        const images = []
        for(var imageName of imageNames){
            const image = await files[imageName].async("blob")
            images.push(URL.createObjectURL(image))
        }
        return images
    });
}

function post(url, body) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            "Accept" :"application/json"
        }
      }
    return axios.post(url, JSON.stringify(body), options).then(res => res);
}

function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
    const requestOptions = {
        method: 'DELETE'
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}