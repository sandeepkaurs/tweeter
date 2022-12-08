$(document).ready(function () {
  console.log("Document's ready");
  // --- our code goes here ---
  // use input event, tweet-text is area where counter is
  $("textarea").on("input", function() {
    //max character count is 140
    const maxCharacter = 140;
    //const input character we can get using length
    //using val(jquery) to get value of a textarea
    let charCount = $(this).val().length;
    //const counter should be max characters less inputted characters
    let charactersLeft = maxCharacter - charCount;

    let $counterButton = $(this).parent().find(".counter");
    $counterButton.val(charactersLeft)

    if (charactersLeft < 0) {
      $counterButton.addClass("invalid");
    } else {
      $counterButton.removeClass("invalid");
    }
  });
});