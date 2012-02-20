chrome.history.onVisited.addListener(function(result) {
    var url = 'http://localhost:3000/log';
    var data = {
        url: result.url,
        timestamp: result.lastVisitTime
    };
    $.ajax({
        url: url,
        type: 'post',
        data: data,
        xhrFields: {
            withCredentials: true
        }
    });
});
