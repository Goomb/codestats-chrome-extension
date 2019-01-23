let loginField = document.getElementById('codestatsLogin');
let refreshField = document.getElementById('codestatsRefreshTime');

chrome.storage.sync.get('codestatsLogin', function (data) {
    if (typeof data.codestatsLogin !== 'undefined') {
        loginField.setAttribute('value', data.codestatsLogin);
    }
});

chrome.storage.sync.get('codestatsRefreshTime', function (data) {
    if (typeof data.codestatsRefreshTime !== 'undefined') {
        refreshField.setAttribute('value', data.codestatsRefreshTime);
    }
});

document.getElementById('saveButton').addEventListener('click', function () {
    let saveMessage = document.getElementById('saveMessage');

    chrome.storage.sync.set({codestatsLogin: loginField.value});
    chrome.storage.sync.set({codestatsRefreshTime: refreshField.value});

    saveMessage.style.display = 'block';

    setTimeout(function () {
        saveMessage.style.display = 'none'
    }, 3000);
});
