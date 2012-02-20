/*globals chrome */

(function() {
    var host = 'http://localhost:3000';

    chrome.history.onVisited.addListener(function(result) {
        var url = host + '/api/log';
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            data: {
                url: result.url,
                timestamp: result.lastVisitTime
            },
            error: function() {
                chrome.browserAction.setIcon({
                    path: '../assets/icon1.png'
                });
            },
            success: function(data) {
                if (!data.success) {
                    chrome.browserAction.setIcon({
                        path: '../assets/icon2.png'
                    });
                }
            }
        });
    });
})();
