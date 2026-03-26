import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);

    
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/v1/posts/get"
        );
        setBooks(res.data.posts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBooks();
  }, []);


  const addToCart = (book) => {
    setCart([...cart, book]);
  };


  const totalPrice = cart.reduce((total, item) => {
    return total + (item.price || 10); 
  }, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Book Store</h1>


      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {books.map((book) => (
          <div
            key={book._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "10px",
              width: "200px",
              textAlign: "center",
            }}
          >
            <img
              src={book.image || "https://via.placeholder.com/150"}
              alt={book.title}
              width="120"
              style={{ borderRadius: "8px" }}
            />

            <h3>{book.title}</h3>
            <p>{book.content}</p>

            <p>
              <strong>{book.price || 10} €</strong>
            </p>

            <button onClick={() => addToCart(book)}>
              Buy 🛒
            </button>
          </div>
        ))}
      </div>


      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          borderTop: "2px solid black",
        }}
      >
        <h2>🛒 Cart</h2>

        <p>Items: {cart.length}</p>
        <p>Total: {totalPrice} €</p>

        
        {cart.map((item, index) => (
          <p key={index}>• {item.title}</p>
        ))}

        <button onClick={() => setCart([])}>
          Clear Cart ❌
        </button>
      </div>
    </div>
  );
}

export default Home;