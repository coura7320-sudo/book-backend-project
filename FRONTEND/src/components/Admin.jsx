import { useState, useEffect } from "react";
import axios from "axios";

export default function Admin() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [books, setBooks] = useState([]);

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/posts/get");
      setBooks(res.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createBook = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in");
      return;
    }

    try {
      await axios.post(
        "http://localhost:4000/api/v1/posts/create",
        {
          ...form,
          author: user.user._id
        }
      );

      alert("Book created ✅");
      setForm({ title: "", content: "", image: "" });
      fetchBooks();

    } catch (err) {
      console.log(err);
      alert("Error adding book: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/v1/posts/delete/${id}`);
      alert("Book deleted ✅");
      fetchBooks();
    } catch (err) {
      console.log(err);
      alert("Error deleting book: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container">
      <div className="auth-page">
        <div className="card auth-card">
          <h2>Add a New Book</h2>
          <form onSubmit={createBook}>
            <div className="form-group">
              <label>Book Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter book title"
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Enter book description"
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd", minHeight: "100px" }}
                required
              />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
            </div>
            <button type="submit" className="btn-primary">Add Book</button>
          </form>
        </div>

        <div className="card auth-card" style={{ marginTop: "40px", padding: "20px" }}>
          <h2>Manage Books</h2>
          {books.length === 0 ? (
            <p>No books to manage.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {books.map((book) => (
                <li key={book._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #eee" }}>
                  <span>{book.title}</span>
                  <button 
                    onClick={() => handleDelete(book._id)} 
                    className="logout-btn" 
                    style={{ margin: 0, padding: "5px 15px", borderRadius: "5px" }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}