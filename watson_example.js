//will have to modify to fit our code structure
//this file needs to be duplicated before putting in credentials
//gitignore should remove duplicate with credentials
//delete comments for duplicate to reduce data

/*leave comments alone..do not uncomment*/

var watson = require('watson-developer-cloud');

var tone_analyzer = watson.tone_analyzer({
  username: '{username}',
  password: '{password}',
  version: 'v3',
  version_date: '2016-05-19 '
});


/*Example code below for reference*/

//this is node input

// tone_analyzer.tone({ text: 'A word is dead when it is said, some say. Emily Dickinson' },
//   function(err, tone) {
//     if (err)
//       console.log(err);
//     else
//       console.log(JSON.stringify(tone, null, 2));
// });

/*take note of the main key inside the input object..."text"*/

//this object is the output of tone score

// {
//   "document_tone": {
//     "tone_categories": [
//       {
//         "tones": [
//           {
//             "score": 0.25482,
//             "tone_id": "anger",
//             "tone_name": "Anger"
//           },
//           {
//             "score": 0.345816,
//             "tone_id": "disgust",
//             "tone_name": "Disgust"
//           },
//           {
//             "score": 0.121116,
//             "tone_id": "fear",
//             "tone_name": "Fear"
//           },
//           {
//             "score": 0.078903,
//             "tone_id": "joy",
//             "tone_name": "Joy"
//           },
//           {
//             "score": 0.199345,
//             "tone_id": "sadness",
//             "tone_name": "Sadness"
//           }
//         ],
//         "category_id": "emotion_tone",
//         "category_name": "Emotion Tone"
//       },
//       {
//         "tones": [
//           {
//             "score": 0.999,
//             "tone_id": "analytical",
//             "tone_name": "Analytical"
//           },
//           {
//             "score": 0.999,
//             "tone_id": "confident",
//             "tone_name": "Confident"
//           },
//           {
//             "score": 0.694,
//             "tone_id": "tentative",
//             "tone_name": "Tentative"
//           }
//         ],
//         "category_id": "language_tone",
//         "category_name": "Language Tone"
//       },
//       {
//         "tones": [
//           {
//             "score": 0.271,
//             "tone_id": "openness_big5",
//             "tone_name": "Openness"
//           },
//           {
//             "score": 0.11,
//             "tone_id": "conscientiousness_big5",
//             "tone_name": "Conscientiousness"
//           },
//           {
//             "score": 0.844,
//             "tone_id": "extraversion_big5",
//             "tone_name": "Extraversion"
//           },
//           {
//             "score": 0.257,
//             "tone_id": "agreeableness_big5",
//             "tone_name": "Agreeableness"
//           },
//           {
//             "score": 0.497,
//             "tone_id": "emotional_range_big5",
//             "tone_name": "Emotional Range"
//           }
//         ],
//         "category_id": "social_tone",
//         "category_name": "Social Tone"
//       }
//     ]
//   }
// }

//this is node input

// tone_analyzer.tone({ utterances: [
//         {"text": "Hello, can you help me", "user": "customer"},
//         {"text": "How are you ?", "user": "agent"},
//         {"text": "Nothing is working" :, "user": "customer"},
//         {"text": "Sorry to hear this", "user": "agent"}
//     ]},
//   function(err, tone) {
//     if (err)
//       console.log(err);
//     else
//       console.log(JSON.stringify(tone, null, 2));
// });

/*take note of the main key inside the input object..."utterances"*/

//this is node output

// {  
//    "utterances_tone":[  
//       {  
//          "utterance_id":0,
//          "utterance_text":"Hello, can you help me",
//          "tones":[  
//             {  
//                "score":0.794472,
//                "tone_id":"polite",
//                "tone_name":"polite"
//             }
//          ]
//       },
//       {  
//          "utterance_id":1,
//          "utterance_text":"How are you ?",
//          "tones":[  

//          ]
//       },
//       {  
//          "utterance_id":2,
//          "utterance_text":"Nothing is working",
//          "tones":[  
//             {  
//                "score":0.801019,
//                "tone_id":"sad",
//                "tone_name":"sad"
//             },
//             {  
//                "score":0.66593,
//                "tone_id":"frustrated",
//                "tone_name":"frustrated"
//             }
//          ]
//       },
//       {  
//          "utterance_id":3,
//          "utterance_text":"Sorry to hear this",
//          "tones":[  
//             {  
//                "score":0.987011,
//                "tone_id":"polite",
//                "tone_name":"polite"
//             },
//             {  
//                "score":0.746323,
//                "tone_id":"sympathetic",
//                "tone_name":"sympathetic"
//             }
//          ]
//       }
//    ]
// }

//does seem like only tone outputs are those with a score higher than .5

/*Expected object for error handling*/

// {
//   "code" : 400,
//   "error" : "The request does not contain a Content-Type"
// }

//Possible codes:

/*
200: success
201: created
400: bad request
401: unauthorized
404: not found
429: trottle limit --probably the more important code to watch--
500: server errors
*/