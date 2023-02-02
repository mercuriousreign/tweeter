/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// $(() => {
 

// })

const createTweetElement  = function(tweet) {
  //let date = timeago.format(tweet.created_at);
  let date = new Date(tweet.created_at);

  const tweetTemplate = `<section class="tweet-container">
    <!--flex row this-->
    <div class="user-row">
      <img name="avatar" src="${tweet.user.avatars}"></img>
      <h3 name="user">${tweet.user.name}</h3>
      <h4 name="handle">${tweet.user.handle}</h4>
    </div>
    <p class="tweet">${tweet.content.text}</p>
    <!--flex row this-->
    <div class="other-row">
      <p class="time">${date}</p>
      <div class="tweet-intrv">
        <button type="submit"><i class="fa-solid fa-angles-down"></i></button>
        <button type="submit"><i class="fa-solid fa-angles-down"></i></button>
        <button type="submit"><i class="fa-solid fa-angles-down"></i></button>
      </div>
    </div>
  </section>`

  $('.tweetline').append(tweetTemplate);
  //$(document).append(tweetTemplate);

}

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    createTweetElement(tweet)
  }
}

const tweetsubmit = document.getElementById('tweetsend')




$( document ).ready(()=>{
  //renderTweets(data);
  //$form.on("submit", (event) => {
  $('#tweetsend').submit(function(event) {
    event.preventDefault();
    const tweetsubmit = document.getElementById('tweetsend')
    console.log("after line 74",$( this ).serialize());
    
    $.ajax({
      url:"/tweets",
      method:"POST",
      data : $( this ).serialize(), 
      success : (ev) => {
        console.log("a string");
      }
  })

})

  // $('#tweetsend').on("submit", function(event){
  //   event.preventDefault();
  //   console.log("something is ",$( this ).serialize());

  //   $.ajax({
  //         url:"/tweets",
  //         method:"POST",
  //         data : $( this ).serialize(), 
  //         success : (ev) => {
  //           console.log("a string");
  //         }

  // })
    // $.ajax(console.log($(this).serialize()));
    
    // $.ajax($(this).serialize());
  
  })
