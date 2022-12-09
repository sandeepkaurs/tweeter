/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// creating new tweet element
$(document).ready(function () {

  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1670382605101
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1670469005101
    }
  ]

  // render tweets
  const renderTweets = function(tweets) {
    // console.log(tweets)
    $('#tweets-container').empty();
    for (let tweet of tweets) {
      // console.log(tweet)
      const $tweet = newTweetElement(tweet);
      $('#tweets-container').append($tweet)
    }
  };
  const newTweetElement = function (tweetData) {
    let $tweets = $(`
      <article class="tweet">
        <header class="tweet-header">
          <div>
            <img class="user-icon" src=${tweetData.user.avatars}/>
            <span class="user-name">${tweetData.user.name}</span>
          </div>  
          <span class="user-handle">${tweetData.user.handle}</span>
        </header>
        <div class="tweet-text">
          ${tweetData.content.text}
        </div>
        <footer class="tweet-footer">
          <div class="tweetDate">
            ${tweetData.created_at}
          </div>
          <div class="responses">
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-light fa-heart"></i>
            <i class="fa-regular fa-comment"></i>
          </div>
        </footer>
        
      </article> `);
    return $tweets
  };
  
  // const $tweet = newTweetElement(tweetData);
  // console.log("hi there");
  // // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  renderTweets(tweetData);
});