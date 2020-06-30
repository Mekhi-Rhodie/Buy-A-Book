// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD9K82L8GFGOkRcqQEJGNSj2PXQAyxOd24",
  authDomain: "buy-a-book-4fb17.firebaseapp.com",
  databaseURL: "https://buy-a-book-4fb17.firebaseio.com",
  projectId: "buy-a-book-4fb17",
  storageBucket: "buy-a-book-4fb17.appspot.com",
  messagingSenderId: "583903130141",
  appId: "1:583903130141:web:1c578a70a091c407650cf4",
  measurementId: "G-867SZV6T81"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();

class Book {
  constructor(title, publisher, author, genre, image, description, pages, pubDate, isbn, price) {
    this.title = title
    this.publisher = publisher
    this.author = author
    this.genre = genre
    this.image = image
    this.description = description
    this.pages = pages
    this.pubDate = pubDate
    this.isbn = isbn
    this.price = price
  }
}

$("#nav").on("click", function () {
  $("nav").toggle(1000)
})

$("#search").on("click", function () {
  const searchVal = $("#search-form").val();
  const URL = `https://www.googleapis.com/books/v1/volumes?q=search ${searchVal}`
  console.log(URL)

  $.ajax({
    type: "get",
    url: URL
  }).then(function (response) {
    console.log(response.items)
    const data = response.items
    for (let i = 0; i < data.length; i++) {
      const title = data[i].volumeInfo.title
      const publisher = data[i].volumeInfo.publisher
      const author = data[i].volumeInfo.authors
      const genre = data[i].volumeInfo.categories[0]
      const image = data[i].volumeInfo.imageLinks.thumbnail
      const description = data[i].volumeInfo.description
      const pages = data[i].volumeInfo.pageCount
      const pubDate = data[i].volumeInfo.publishedDate
      const isbn = data[i].volumeInfo.industryIdentifiers[0].identifier
      const price = "$" + data[i].saleInfo.retailPrice
      let book = new Book(title, publisher, author, genre, image, description, pages, pubDate, isbn, price)
      console.log(book)
    }
  }
  );
})