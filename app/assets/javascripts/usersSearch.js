$.UsersSearch = function (el) {
  this.$el = $(el);
  this.$input = $("input");
  this.$ul = $("ul.users");
  $("input").on("input", this.handleInput.bind(this));
};

$.UsersSearch.prototype.handleInput = function (event) {
  var that = this;

  $.ajax( {
    url: "/users/search",
    type: "GET",
    dataType: "json",
    data: {query: event.currentTarget.value},
    success: function (users) {
      that.renderResults(users);
    }
  });
};

$.UsersSearch.prototype.renderResults = function (users) {
  this.$ul.html("");
  for (var i = 0; i < users.length; i++) {
    var $li = $("<li>");
    var $button = $("<button>");
    $button.followToggle({
      userId: users[i].id,
      followState: users[i].followed
    });
    $li.append(users[i].username).append($button);
    this.$ul.append($li);
  };
};

$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
};

$(function () {
  $("div.users-search").usersSearch();
});
