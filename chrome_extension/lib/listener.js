/*globals chrome, parseUri */

(function() {
    var host = 'http://localhost:3000';
    var serverUrl = host + '/api/log';

    chrome.history.onVisited.addListener(function(result) {
        var visitedUrl = result.url;
        var visitedUrlParts = parseUri(result.url);
        var visitedTimestamp = result.lastVisitTime;
        
        $.ajax({
            url: serverUrl,
            type: 'post',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            data: {
                url: visitedUrl,
                host: visitedUrlParts.host,
                timestamp: visitedTimestamp 
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
