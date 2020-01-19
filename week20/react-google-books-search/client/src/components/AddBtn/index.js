import React from "react";
import Button from "../Button";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class AddBookBtn extends React.Component {
  postToDB = book => {
    var dbBook = {
      title: book.title,
      authors: book.authors,
      description: book.description,
      image: book.image,
      link: book.link,
      dateAdded: book.dateAdded
    };

    axios
      .post("/api/books", dbBook)
      .then(() => console.log(`You added ${book.title} to your saved books`))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Button
          type="primary"
          onClick={() => {
            this.postToDB(this.props);
          }}
        >
          Save This Book
        </Button>
      </div>
    );
  }
}

export default AddBookBtn;
