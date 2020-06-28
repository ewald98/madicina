

chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
                if (request.type === "questionSwitch") {
                        chrome.tabs.executeScript(null,{file:"cbl.js", runAt:"document_end"});
                } else {
                }
                sendResponse({farewell: "goodbye"});
        }
);
