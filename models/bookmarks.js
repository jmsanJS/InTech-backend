const mongoose = require("mongoose");

const bookmarkSchema = mongoose.Schema(
  {
    source: {
      id: String,
      name: String,
    },
    author: String,
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    pusblishedAt: Date,
    content: String,
  },
  {
    timestamps: true,
  }
);

const Bookmark = mongoose.model("bookmarks", bookmarkSchema);

module.exports = Bookmark;
