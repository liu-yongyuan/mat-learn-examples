import React from 'react';
import { useParams } from 'react-router-dom';

export default function Book() {
  let { bookId } = useParams();
  return <div>Book, [view: {bookId}] </div>;
}
