/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// creating new tweet element
$(document).ready(function () {

  $("#error-message-noTweet").hide();
  $("#error-message-tooManyCharacters").hide();

  const data = [];

  // Test / driver code (temporary). Eventually will get this from the server.
  // render tweets
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    for (let tweet of tweets) {
      const $tweet = newTweetElement(tweet);
      $('#tweets-container').append($tweet)
    }
  };
  // creating new tweets
  const newTweetElement = function (tweetData) {
    let $tweets = $(`
      <article class="tweet">
        <header class="tweet-header">
          <div class="user-profile">
            <img class="user-icon" src=${tweetData.user.avatars}/>
            <span class="user-name">${tweetData.user.name}</span>
          </div>  
          <span class="user-handle">${tweetData.user.handle}</span>
        </header>
        <div class="tweet-text">
          ${escape(tweetData.content.text)}
        </div>
        <footer class="tweet-footer">
          <span class="tweetDate">
            ${timeago.format(tweetData.created_at)}
          </span>
          <div class="responses">
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
            <i class="fa-regular fa-comment"></i>
          </div>
        </footer>
        
      </article> `);
    return $tweets
  };
  //making const loadTweets function
  const loadTweets = function () {
    $.get("/tweets/", function (newTweets) {
      renderTweets(newTweets.reverse());
    });
  };
  loadTweets();

  // add a new tweet when clicking submit id
  $("#new-tweet-form").submit(function (event) {
    // add event.preventDefault to prevent default submission behaviour
    event.preventDefault();
    const maxCharacters = 140;
    const inputValue = $(this).find("#tweet-text").val().length;

    $("#error-message-noTweet").slideUp("slow");
    $("#error-message-tooManyCharacters").slideUp("slow");

    if (!inputValue) {
      $("#error-message-noTweet").slideDown("slow");
      $("#error-message-tooManyCharacters").hide();
    } else if (inputValue - maxCharacters > 0) {
      $("#error-message-tooManyCharacters").slideDown("slow");
      $("#error-message-noTweet").hide();
    } else {
      const newTweets = $(this).serialize();
      $.post("/tweets/", newTweets, () => {
        $(this).find("#tweet-text").val("");
        $(this).find(".counter").val(maxCharacters);
        loadTweets();
      });
    }
  });
});
