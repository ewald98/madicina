// Your web app's Firebase configuration
var firebaseConfig = {
        apiKey: "AIzaSyBeZhzQ5vavurtV2yMsNKNPpSP82xGZbm4",
        authDomain: "text-adjuster.firebaseapp.com",
        databaseURL: "https://text-adjuster.firebaseio.com",
        projectId: "text-adjuster",
        storageBucket: "text-adjuster.appspot.com",
        messagingSenderId: "1083495676045",
        appId: "1:1083495676045:web:ea329aa9f1038707928ac4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const COLLECTION_NAME = "questions_etica";


// var worker = new Worker('background2.js');


// console.log(firebase);
var db = firebase.firestore();

chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {

                if (request.type === "questionSwitch") {
                        // chrome.tabs.executeScript(null,{file:"cbl.js", runAt:"document_end"});
                } else if (request.type === "questionInfo") {
                        console.log(request.info.questionText);

                        // search for question in db
                        db.collection(COLLECTION_NAME).doc(request.info.questionText)
                                .get()
                                .then(function(querySnapshot) {
                                        if (querySnapshot.exists) {
                                                // old question
                                                var date = querySnapshot.data();
                                                console.log(date.A);
                                                console.log(date.Aa);
                                                console.log(date.B);
                                                console.log(date.Ba);
                                                console.log(date.C);
                                                console.log(date.Ca);
                                                console.log(date.D);
                                                console.log(date.Da);
                                                console.log(date.E);
                                                console.log(date.Ea);
                                        } else {
                                                // new question
                                                console.log('new question!:(');
                                                db.collection(COLLECTION_NAME).doc(request.info.questionText).set({
                                                        A: request.info.a,
                                                        B: request.info.b,
                                                        C: request.info.c,
                                                        D: request.info.d,
                                                        E: request.info.e,
                                                        Aa: 0,
                                                        Ba: 0,
                                                        Ca: 0,
                                                        Da: 0,
                                                        Ea: 0
                                                })
                                                .then(function() {
                                                        console.log("Question recorded in DataBase!\n===============================\n");
                                                })
                                                .catch(function(error) {
                                                        console.error("Error recording question: ", error);
                                                        console.log("Question not recorded!\n===========================\n");
                                                })

                                        }
                                });
                } else if (request.type === "questionAnswers") {
                        const increment = firebase.firestore.FieldValue.increment(1);
                        const decrement = firebase.firestore.FieldValue.increment(-1);

                        var doc = db.collection(COLLECTION_NAME).doc(request.info.questionText)

                        doc.get().then(function(querySnapshot) {
                                var datum = querySnapshot.data();
                                if ((datum.A === request.info.aText && request.info.a) ||
                                    (datum.A === request.info.bText && request.info.b) ||
                                    (datum.A === request.info.cText && request.info.c) ||
                                    (datum.A === request.info.dText && request.info.d) ||
                                    (datum.A === request.info.eText && request.info.e)) {
                                        doc.update({Aa: increment});
                                }
                                if ((datum.B === request.info.aText && request.info.a) ||
                                    (datum.B === request.info.bText && request.info.b) ||
                                    (datum.B === request.info.cText && request.info.c) ||
                                    (datum.B === request.info.dText && request.info.d) ||
                                    (datum.B === request.info.eText && request.info.e)) {
                                        doc.update({Ba: increment});
                                }
                                if ((datum.C === request.info.aText && request.info.a) ||
                                    (datum.C === request.info.bText && request.info.b) ||
                                    (datum.C === request.info.cText && request.info.c) ||
                                    (datum.C === request.info.dText && request.info.d) ||
                                    (datum.C === request.info.eText && request.info.e)) {
                                        doc.update({Ca: increment});
                                }
                                if ((datum.D === request.info.aText && request.info.a) ||
                                    (datum.D === request.info.bText && request.info.b) ||
                                    (datum.D === request.info.cText && request.info.c) ||
                                    (datum.D === request.info.dText && request.info.d) ||
                                    (datum.D === request.info.eText && request.info.e)) {
                                        doc.update({Da: increment});
                                }
                                if ((datum.E === request.info.aText && request.info.a) ||
                                    (datum.E === request.info.bText && request.info.b) ||
                                    (datum.E === request.info.cText && request.info.c) ||
                                    (datum.E === request.info.dText && request.info.d) ||
                                    (datum.E === request.info.eText && request.info.e)) {
                                        doc.update({Ea: increment});
                                }
                        });
                        console.log("Answers saved:");
                        console.log(request.info.a);
                        console.log(request.info.b);
                        console.log(request.info.c);
                        console.log(request.info.d);
                        console.log(request.info.e);
                }

                sendResponse({farewell: "goodbye"});
        }
);

// chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
//     chrome.tabs.executeScript(null,{file:"cbl.js", runAt:"document_end"});
//
// });
// console.log(questionText)
