/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

const tweetsubmit = document.getElementById('tweetsend')

$( document ).ready(()=>{

  const createTweetElement  = function(tweet) {
    //let date = timeago.format(tweet.created_at);
    //let date = new Date(tweet.created_at);
  
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
  
  const loadTweets = function() {
    $.ajax({
      url: `/tweets`,
      method: 'GET',
      dataType: 'JSON'
  }).then(function(response) {
      console.log(response);
      $('.tweetline').empty();
      renderTweets(response);
  })

  }
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
        loadTweets();
      }
  })

})

loadTweets();



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
