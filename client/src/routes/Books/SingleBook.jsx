import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const SingleBook = () => {
    const [data, setData] = useState([]);
    const urlSlug = useParams()
    console.log(urlSlug.slug)
    const baseUrl = `http://localhost:8000/api/books/${urlSlug.slug}`;

    useEffect(() => {
        const fetchData = async () => {
          try {
    
            const res = await fetch(baseUrl);
            if (!res.ok) {
              throw new Error("Failed to fetch any data!");
            }
            const jsonData = await res.json();
            setData(jsonData);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

      function StarRating({ numberOfStars }){
        const stars = [];
        for(let i=0; i < numberOfStars; i++ ){
            stars.push(<span key={i}>⭐</span>)
        }
        return <div>
             Rating: {stars}
        </div>
      }

  return (
    <div>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre>  */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Link to='/books'>⬅️ Books</Link>
            <Link to={`/editbook/${data.slug}`}>📝 Edit</Link>
        </div>

        <div className="bookdetails">
            <div className="col-1">
                <img src={`http://localhost:8000/uploads/${data?.thumbnail}`}
                alt={data?.title} 
                style={{ marginTop: 10 }}
                />
            </div>

            <div className="col-2">
                <h1>{data?.title}</h1>
                <p>{ <data className="description"></data> }</p>
                <StarRating numberOfStars={data?.stars} />

                <p>Category</p>
                <ul>
                    {data?.category?.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

        </div>

    </div>
  )
}

export default SingleBook