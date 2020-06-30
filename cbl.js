// console.log("merge")
function pollDOM () {
    var el = document.querySelectorAll('label');

    console.log("compared" + el[0] + " with " + labels[0]);
    if (!(el[0].textContent === labels[0].textContent)) {
        chrome.runtime.sendMessage({
                type: "questionSwitch",
        },
                function(response) {
                if (response != undefined) {
                        console.log(response.farewell);
                }
        });
    } else {
    setTimeout(pollDOM, 2000);
    }
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}



window.onhashchange = function() {

        pollDOM();
//         console.log('HASH CHANGE');
//         setTimeout(function() {
//
//         console.log('HASH CHANGE INSIDE');
//         chrome.runtime.sendMessage({
//                 type: "questionSwitch",
//         },
//                 function(response) {
//                 if (response != undefined) {
//                         console.log(response.farewell);
//                 }
//         });
// }, 3000);
};

// sleep(2000);

var labels = document.querySelectorAll('label')
console.log(labels);

var questionText = document.querySelector(".qpad").textContent;
console.log(questionText);

chrome.runtime.sendMessage({
        type: "questionInfo",
        info: {
                questionText: questionText,
                a: labels[0].textContent,
                b: labels[1].textContent,
                c: labels[2].textContent,
                d: labels[3].textContent,
                e: labels[4].textContent,
        }
},
        function(response) {
                if (response != undefined) {
                        console.log(response.farewell);
                }
});

var ele = document.querySelector("#questionform")

var cboxes = document.querySelectorAll('input[type="checkbox"]')

document.getElementById("qnext")
var nxt = document.getElementById("qnext")
function submitf() {
        console.log("submit button pressed");
        labels = document.querySelectorAll('label')
        chrome.runtime.sendMessage({
                type: "questionAnswers",
                info: {
                        questionText: questionText,
                        aText: labels[0].textContent,
                        bText: labels[1].textContent,
                        cText: labels[2].textContent,
                        dText: labels[3].textContent,
                        eText: labels[4].textContent,
                        a: cboxes[0].checked,
                        b: cboxes[1].checked,
                        c: cboxes[2].checked,
                        d: cboxes[3].checked,
                        e: cboxes[4].checked,
                }
        },
                function(response) {
                        if (response != undefined) {
                                console.log(response.farewell);
                        }
        });

        return;
}
nxt.addEventListener('click', submitf, false);

var result = {
        type: "questionInfo",
        info: {
                questionText: questionText,
                a: labels[0].textContent,
                b: labels[1].textContent,
                c: labels[2].textContent,
                d: labels[3].textContent,
                e: labels[4].textContent,
        }
};
result;

// let cboxes = document.querySelectorAll('input[type="checkbox"]')
// let labels = document.querySelectorAll('label')

// for (i = 0; i < cboxes.length; i++) {
    // labels[i].style['background-color'] = '#b1c9fa';
// }
