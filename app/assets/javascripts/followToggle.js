$.FollowToggle = function (el, options) {
  this.$el = $(el);
  this.userId = this.$el.data("user-id") || options.userId;
  if (this.$el.data("initial-follow-state") || options.followState) {
    this.followState = "followed";
  } else {
    this.followState = "unfollowed";
  }

  this.render();

  this.$el.on("click", this.handleClick.bind(this))

};

$.FollowToggle.prototype.render = function () {
  if (this.followState === "followed") {
    this.$el.text("Unfollow");
    this.$el.prop("disabled", false)
  } else if (this.followState === "unfollowed"){
    this.$el.text("Follow");
    this.$el.prop("disabled", false)
  } else if (this.followState === "following" || "unfollowing") {
    this.$el.prop("disabled", true)
  }
};

$.FollowToggle.prototype.handleClick = function (event) {
  event.preventDefault();
  var that = this;
  if (this.followState === "unfollowed") {
    that.followState = "following";
    $.ajax( {
      url: "/users/" + this.userId + "/follow",
      type: "POST",
      dataType: "json",
      success: function () {
        that.followState = "followed"
        that.render();
      }
    });
  } else if (this.followState === "followed") {
    that.followState = "unfollowing";
    $.ajax ( {
      url: "/users/" + this.userId + "/follow",
      type: "DELETE",
      dataType: "json",
      success: function () {
        that.followState = "unfollowed"
        that.render();
      }
    });
  }

}

$.fn.followToggle = function (options) {
  return this.each(function () {
    new $.FollowToggle(this, options);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});
