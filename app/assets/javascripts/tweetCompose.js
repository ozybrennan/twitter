$.TweetCompose = function (el) {
  this.$el = $(el);
  this.$el.on("submit", this.submit.bind(this));
  $("textarea").on("input", function (event) {
    $(".chars-left").text(140 - $(event.currentTarget).val().length)
  });
  $(".add-mentioned-user").on("click", this.addMentionedUser.bind(this))
};

$.TweetCompose.prototype.submit = function (event) {
  event.preventDefault();
  var data = $(event.currentTarget).serializeJSON();
  this.$el.children().find(":input").prop("disabled", true);
  var that = this;
  $.ajax({
    url: "/tweets",
    type: "POST",
    dataType: "json",
    data: data,
    success: that.handleSuccess.bind(that)
  });
};

$.TweetCompose.prototype.handleSuccess = function (newTweet) {
  var input = this.$el.children().find(":input");
  this.clearInput(input);
  input.prop("disabled", false);
  $("#feed").trigger("insert-tweet", newTweet)
}

$.TweetCompose.prototype.addMentionedUser = function () {
  $("div.mentioned-users").append($("script.mention").html());
  $(".mention-form").on("click", ".remove-mentioned-user", this.removeMentionedUser)
}

$.TweetCompose.prototype.removeMentionedUser = function (event) {
  $(event.delegateTarget).remove();
}

$.TweetCompose.prototype.clearInput = function (input) {
  input.val("")
  $(".mentioned-users").empty();
  $(".chars-left").empty();
}

$.fn.tweetCompose = function () {
  return this.each(function () {
    new $.TweetCompose(this);
  });
};

$(function () {
  $("form.tweet-compose").tweetCompose();
});
