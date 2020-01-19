import React from "react";
import { Container, Row, Col } from "../Grid";

export function BookList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

export class BookListItem extends React.Component {
  render() {
    console.log(this.props);
    return (
      <li>
        <Container>
          <Row>
            <Col size="xs-4 sm-2">
              <img src={this.props.image} alt="" />
            </Col>
            <Col size="xs-8 sm-9">
              <h3>
                {this.props.title}
                <span>
                  <h5>{this.props.authors.join(", ")}</h5>
                </span>
              </h3>
              <p>{this.props.description}</p>
              <a
                /* When you open another page using target="_blank", the other page may run on the same process as your page, unless Site Isolation is enabled. If the other page is running a lot of JavaScript, your page's performance may also suffer.
              The other page can access your window object with the window.opener property. This exposes an attack surface. Add rel="noopener" or rel="noreferrer" to each of the links. */
                target="_blank"
                href={this.props.link}
                rel="noopener noreferrer"
              >
                Go to the book!
              </a>
            </Col>
          </Row>
        </Container>
      </li>
    );
  }
}
