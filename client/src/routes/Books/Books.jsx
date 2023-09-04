import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Books = () => {
  const baseUrl = "http://localhost:8000/api/books";
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl;
        if(selectedCategory){
          url += `?category=${selectedCategory}`
        }

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch any data!");
        }
        const jsonData = await res.json();
        setData(jsonData);
        setIsLoading(false)
      } catch (error) {
        console.log(error);
        setError("Error while data fetching. Please try again later...")
        setIsLoading(false)
      }
    };
    fetchData();
  }, [selectedCategory]);

  // console.log(selectedCategory)

  return (
    <div>
      <h1>Books</h1>
      <Link to='/createbook'> + New Book</Link>

      <h2>Fetching Examples</h2>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      <div className="filters">
        <label>Categories</label>
        <select onChange={(e)=> setSelectedCategory(e.target.value)}>
          <option value="">All</option>
          <option value="romance">Romance</option>
          <option value="science">Science</option>
          <option value="crime">Crime</option>
          <option value="food">Food</option>
          <option value="adventure">Adventure</option>
          <option value="thriller">Thriller</option>
          <option value="fiction">Fiction</option>
          <option value="other">other</option>
        </select>
      </div>

    { isLoading ? (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress color="success" />
      </Box>
    ) : error ? (
      <p>{error}</p>
    ) : (
      <ul className="books">
        {data.map((item) => (
          <li key={item._id}>
            <Link to={`/book/${item.slug}`}>
              <img
                src={`http://localhost:8000/uploads/${item.thumbnail}`}
                alt={item.title}
                />
              <h3>{item.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    )}
    </div>
  );
};

export default Books;
