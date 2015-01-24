$.InfiniteTweets = function (el) {
  this.$el = $(el);
  this.maxCreatedAt = null;
  this.fetchTweets();
  $(".fetch-more").on("click", this.fetchTweets.bind(this));
  $("#feed").on("insert-tweet", this.insertTweet.bind(this))
};

$.InfiniteTweets.prototype.fetchTweets = function () {
  var data ={};
  if (this.maxCreatedAt !== null){
    data["max_created_at"] = this.maxCreatedAt;
  }
  $.ajax({
    url: "/feed.json",
    type: 'GET',
    dataType: 'json',
    data: data,
    success: this.insertTweets.bind(this)
  });
};

$.InfiniteTweets.prototype.insertTweets = function (tweets) {
  this.maxCreatedAt = tweets[tweets.length-1].created_at
  var tempFunc = _.template($("#feed-template").html());
  $("#feed").append(tempFunc({tweets: tweets}));
  if (tweets.length < 20) {
    $(".fetch-more").remove()
    $(".infinite-tweets").append("There are no more tweets!")
  }
}

$.InfiniteTweets.prototype.insertTweet = function (event, tweet) {
  var tempFunc = _.template($("#feed-template").html());
  $("#feed").prepend(tempFunc({tweets: [tweet]}));
};


$.fn.infiniteTweets = function () {
  return this.each(function () {
    new $.InfiniteTweets(this);
  });
};

$(function () {
  $("div.infinite-tweets").infiniteTweets();
});
