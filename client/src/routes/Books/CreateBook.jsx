import React, { useState } from "react";
import { Link } from "react-router-dom";
import NoImageSelected from '../../assets/no-image-selected.jpg'


const CreateBook = () => {
    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [stars, setStars] = useState(0);
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [submitted, setSubmitted] = useState();
    const [image, setImage] = useState(NoImageSelected)

    const createBook = async (e) => {
      e.preventDefault();
      console.table([title, slug]);
  
      const formData = new FormData();
      // formData.append("bookId", bookId);
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("stars", stars);
      formData.append("description", description);
      formData.append("category", categories);
      formData.append("thumbnail", thumbnail)

  

      try {
        const response = await fetch("http://localhost:8000/api/books", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          setTitle("");
          setSlug("");
          setSubmitted(true);
        } else {
          console.log("Failed to submit data.");
        }
      } catch (error) {
        console.log(error);
      }
    };
        
        const handleCategoryChange = (e) => {
          setCategories(e.target.value.split(",").map((category) => category.trim()));
          if(!categories){
            setCategories(["other"])
          }
        }
        
        
      const onImageChange = (e) => {
        if(e.target.files && e.target.files[0]) {
          setImage(URL.createObjectURL(e.target.files[0]));
          setThumbnail(e.target.files[0]);
        }
      }
      
      return (
        <div>
        <h1>Create your own book</h1>
        <p>This is where we use NodeJS, Express & MongoDB to Post some data onto the database</p>

        {submitted ? (
          <div>
              <h3>Data submitted successfully!</h3>
              <Link to='/books'>⬅️ Books</Link>
            </div>
        ) : (
          
          <form onSubmit={createBook} className="bookdetails">
            <div className="col-1">
                <label>Upload Thumbnail</label>
                <img src={image} alt="Preview Image" style={{ maxHeight: 400, maxWidth: 300, margin: 'auto' }}/>
                <input type="file" accept="image/gif, image/jpeg, image/png" onChange={onImageChange}/>
            </div>

            <div className="col-2">
                <div>
                    <label>Title</label>
                    <input required type="text" placeholder="Add a title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <div>
                    <label>Slug</label>
                    <input required
                    placeholder="Please add a unique slug"
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    />
                </div>

                <div>
              <label>Stars</label>
              <input
                type="text"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
              />
            </div>

            <div>
              <label>Description</label>
              <textarea
                rows="4"
                cols="50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div>
              <label>Categories (comma-seperated)</label>
              <input
                type="text"
                value={categories}
                onChange={handleCategoryChange}
                />
            </div>

                <div>
                    <input type="submit" style={{ borderRadius: 20, }}/>
                </div>
            </div>

        </form>
        )}

    </div>
  )
}

// const res = await fetch("http://localhost:8000/api/books", {
//     method:"POST",
//     headers: { "Content-Type": "application/json"},
//     body: JSON.stringify(
//         {
//             title: title,
//             slug: slug,
//             stars: stars,
//             description: description,
//             category: categories,
//             // thumbnail: thumbnail,
//         }
//     )
// })
export default CreateBook