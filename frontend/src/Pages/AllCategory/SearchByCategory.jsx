
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SearchByCategory = () => {
  const { categoryName } = useParams(); // e.g., "Electronics"
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/subcategory"); // Get all subcategories

        const allSubcategories = response.data.data;

        console.log("allSubcategories", allSubcategories);
        
        // Filter based on category name from URL
        const filtered = allSubcategories.filter(
          (sub) => sub.categoryname.toLowerCase() === categoryName.toLowerCase()
        );

        setFilteredSubcategories(filtered);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, [categoryName]);

  return (
    <div>
      <h2>Subcategories for "{categoryName}"</h2>
      {filteredSubcategories.length > 0 ? (
        <ul>
          {filteredSubcategories.map((sub, index) => (
            <li key={index}>{sub.subcategoryName}</li>
          ))}
        </ul>
      ) : (
        <p>No subcategories found.</p>
      )}
    </div>
  );
};

export default SearchByCategory;
