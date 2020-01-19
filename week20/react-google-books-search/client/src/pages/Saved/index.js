import React, { Component } from "react";
import { Row, Col } from "../../components/Grid";
import { BookList, BookListItem } from "../../components/BookList";
import EmptyList from "../../components/EmptyList";
import RemoveBookBtn from "../../components/RemoveBookBtn";

import axios from "axios";

class Saved extends Component {
  state = {
    savedBooks: [],
    initialized: true
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    axios
      .get("/api/books")
      .then(res => {
        this.setState({ savedBooks: res.data });
      })
      .catch(err => console.log(err));
  };

  deleteFromDB = id => {
    console.log(id);

    axios
      .delete(`/api/books/${id}`)
      .then(() => {
        // toast.error("Book Deleted");
        this.getBooks();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Row>
          <Col size="md-12">
            {this.state.savedBooks.length > 0 ? (
              <BookList>
                {this.state.savedBooks.map(book => {
                  console.log(book);
                  return (
                    <div>
                      <BookListItem
                        key={book._id}
                        title={book.title}
                        authors={book.authors}
                        description={book.description}
                        image={book.image}
                        link={book.link}
                        dateAdded={book.dateAdded}
                        delete={() => this.deleteFromDB(book._id)}
                      />
                      <RemoveBookBtn
                        onClick={() => this.deleteFromDB(book._id)}
                      />
                    </div>
                  );
                })}
              </BookList>
            ) : (
              <EmptyList />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Saved;
