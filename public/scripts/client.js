/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$( document ).ready(()=>{
  const area = document.getElementById("tweet-text");
  const errorlog = document.getElementById('error-log');
  $(errorlog).slideToggle();

  /**Method to use to negate cross site scripting */
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  

/**Creates the tweet element and adds it to the user page*/
  const createTweetElement  = function(tweet) {
    let date = timeago.format(tweet.created_at);
    const tweetTemplate = `<section class="tweet-container">
      <div class="user-row">
        <img name="avatar" src="${tweet.user.avatars}"></img>
        <h3 name="user">${tweet.user.name}</h3>
        <h4 name="handle">${tweet.user.handle}</h4>
      </div>
      <p class="tweet">${escape(tweet.content.text)}</p>
      <div class="other-row">
        <p class="time">${date}</p>
        <div class="tweet-intrv">
          <button type="submit"><i class="fa-solid fa-flag"></i></button>
          <button type="submit"><i class="fa-solid fa-retweet"></i></button>
          <button type="submit"><i class="fa-solid fa-heart"></i></button>
        </div>
      </div>
    </section>`
  
    $('.tweetline').append(tweetTemplate)
  }
  
  /**Add whole list of tweet to be showcased  */
  const renderTweets = function(tweets) {
    area.value = "";
    for (const tweet of tweets) {
      createTweetElement(tweet)
    }
  }
  

  /**Gets the list of tweet from database*/
  const loadTweets = function() {
    $.ajax({
      url: `/tweets`,
      method: 'GET',
      dataType: 'JSON'
  }).then(function(response) {
      $('.tweetline').empty();
      renderTweets(response);
  })

  }

  /**Allows user to submit their tweet, shows an error if it does not fit into requirement */
  $('#tweetsend').submit(function(event) {
    event.preventDefault();
    if (!area.value) {
      errorlog.innerHTML= "Please input a message to tweet";
      return $(errorlog).slideDown();
    }
    if (area.textLength > 140) {
      errorlog.innerHTML= "Message must be under 140 character to post";
      return $(errorlog).slideDown(); 
    }

    /**Hides the error bar if it is already there but there is no more error */
    if(errorlog.innerHTML){
      errorlog.innerHTML="";
      $(errorlog).slideUp(); 

    }

    $.ajax({
      url:"/tweets",
      method:"POST",
      data : $( this ).serialize(), 
      success : (ev) => {
        loadTweets();
      }
  })

})
/** Loads all the tweets first when the user first land on the page */
loadTweets();
  })
