let loginField = document.getElementById('codestatsLogin');

chrome.storage.sync.get('codestatsLogin', function (data) {
    if (typeof data.codestatsLogin !== 'undefined') {
        loginField.setAttribute('value', data.codestatsLogin);
    }
});

document.getElementById('saveButton').addEventListener('click', function () {
   chrome.storage.sync.set({codestatsLogin: loginField.value}, function () {
       let saveMessage = document.getElementById('saveMessage');
       saveMessage.style.display = 'block';
       setTimeout(function () {
            saveMessage.style.display = 'none'
       }, 3000);
   }) 
});
