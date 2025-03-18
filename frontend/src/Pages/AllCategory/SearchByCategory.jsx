import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './SearchByCategory.css'; // Assuming we are using a custom CSS file

const SearchByCategory = () => {
  const { _id } = useParams(); // Get category ID from the route
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch subcategories from the API
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get('https://api.assortsmachinetools.com/api/subcategory');
        if (response.data.success) {
          setSubcategories(response.data.data);
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="category-page-container">
      <h1>Category Details for ID: {_id}</h1>
      <div className="subcategory-list">
        {subcategories
          .filter(subcat => subcat._id === _id)
          .map(subcategory => (
            <div key={subcategory._id} className="subcategory-item">
              <h2>{subcategory.subcategoryName}</h2>
              <p><strong>Category:</strong> {subcategory.categoryname}</p>
              <p><strong>Subcategory ID:</strong> {subcategory._id}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchByCategory;
