const sightings = require('./ufo.js');

let date;
let time;
let alphabet = 'abcdefghijklmnopqrstuvwxyz ,.-';
let comments;


//remove extraneous symbols from comments
let commentArray;
function returnComment(commentArray){
  let cleanCommentArray = [];
  for (var i = 0; i < commentArray.length; i++){
    if (alphabet.includes(commentArray[i].toLowerCase())) cleanCommentArray.push(commentArray[i]);
    else i++;
  }
  return cleanCommentArray.join('');
};

//format data
const sightingsData = sightings.map(sighting => {
  date = sighting["datetime"].split(' ')[0];
  time = sighting["datetime"].split(' ')[1];
  commentArray = sighting["comments"].split('');
  comments = returnComment(commentArray);
  return {
    date, 
    time, 
    city: sighting["city"],
    state: sighting["state"].toUpperCase(), 
    country: "United States", 
    shape: sighting["shape"], 
    duration: sighting["duration (seconds)"], 
    comments,
    datePosted: sighting["date posted"], 
    latitude: sighting["latitude"], 
    longitude: sighting["longitude"]
  }
})

//to be used once cluster is selected on map
//calculate most common words
const mostCommonWords = (sightings) => {
  let commentsFromSightings = sightings.map(sighting => sighting.comments);
  let frequency = {};
  //creates an array of arrays, each nested array contains a comma separated list generated from commentsFromSightings
  const wordArrays = [];
  let x = [];
  const words = commentsFromSightings.forEach(comment => wordArrays.push(comment.split(' ')));
  //generate frequency table
  wordArrays.forEach(array => {
    for (let word=0; word < array.length; word++){
      //if word or it's plural are already in frequency object, increment frequency. otherwise, set that word's frequency to 1.
      frequency[array[word].toLowerCase()] || frequency[`${array[word]}s`.toLowerCase()]? frequency[array[word].toLowerCase()]++ : frequency[array[word].toLowerCase()] = 1;
    }
  })

  let lowercaseWord;
  Object.keys(frequency).forEach(word => {
    lowercaseWord = word.toLowerCase();
    //don't include commonly used words
    if (lowercaseWord !== 'in' && lowercaseWord !== 'a' && lowercaseWord !== 'on' && lowercaseWord !== 'that' && lowercaseWord !== 'with' && lowercaseWord !== 'and' && lowercaseWord !== '' && lowercaseWord !== 'it' && lowercaseWord !== 'not' && lowercaseWord !== 'this' && lowercaseWord !== 'the' && lowercaseWord !== 'i' && lowercaseWord !== 'to' && lowercaseWord !== 'was' && lowercaseWord !== 'of' && lowercaseWord !== 'at') 
      x.push({word: word, frequency: frequency[word]});
  });

  return x.sort((word1, word2) => word2.frequency - word1.frequency).slice(0, 100);
 
};

const allDataCommonWords = mostCommonWords(sightings).slice(0, 10);

module.exports = {
  sightingsData, 
  mostCommonWords, 
  allDataCommonWords
};





