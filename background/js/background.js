chrome.runtime.onInstalled.addListener(function () {
    // timers
    let timePause = 5000;

    // colors
    const warningColor = "#D32F2F";
    const experienceColor = "#03A9F4";

    // urls
    const serverUrl = "https://codestats.net/api/users/";

    chrome.storage.sync.get(["codestatsLogin", "codestatsRefreshTime"], function (data) {
        if (typeof data.codestatsRefreshTime !== "undefined") {
            timePause = data.codestatsRefreshTime;
        }

        if (typeof data.codestatsLogin !== "undefined") {
            showStatistics(
                serverUrl,
                data.codestatsLogin,
                timePause,
                experienceColor
            );
        } else {
            failedLogin("Login", warningColor);
        }
    });
});

function showStatistics(serverUrl, userLogin, timePause, experienceColor) {
    setInterval(function () {
        let dateNow = new Date();
        let year = dateNow.getFullYear();

        let month = dateNow.getMonth() + 1;

        if (month < 10) {
            month = "0" + month;
        }

        let day = dateNow.getDate();

        if (day < 10) {
            day = "0" + day;
        }

        let today = year + "-" + month + "-" + day;

        fetch(serverUrl + userLogin + "?" + Math.random() * 100000)
            .then(res => res.json())
            .then(out => {
                console.log(out);

                let xp = out.dates[today];

                if (typeof xp === "undefined") {
                    chrome.browserAction.setBadgeText({
                        text: String("0")
                    });
                    chrome.browserAction.setBadgeBackgroundColor({
                        color: experienceColor
                    });
                } else {
                    chrome.browserAction.setBadgeText({
                        text: String(xp)
                    });
                    chrome.browserAction.setBadgeBackgroundColor({
                        color: experienceColor
                    });
                }
            })
            .catch(err => console.error(err));
    }, timePause * 1000);
}

function failedLogin(text, color) {
    chrome.browserAction.setBadgeBackgroundColor({
        color: color
    });
    chrome.browserAction.setBadgeText({
        text: text
    });

    return false;
}

function showCurrentExperience(text, color) {
}
