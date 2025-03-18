const blogModel = require('../Model/blogModel.js');
const fs = require("fs");
const path = require("path");

// Add a new blog
const addBlog = async (req, res) => {
    try {
        const { name, description,content } = req.body;
        // console.log("dara u send",req.body);

        // Validate required fields
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "Name and description are required."
            });
        }

        if (!req.file || !req.file.path) {
            return res.status(400).json({
                success: false,
                message: "File not chosen."
            });
        }

        // Save the image path locally
        const imgPath = req.file.path;

        const data = new blogModel({ 
            image: imgPath, 
            name, 
            description ,
            content
        });

        await data.save();

        res.status(201).json({
            success: true,
            message: "Blog created successfully.",
            data
        });

    } catch (error) {
        console.error("Error adding blog:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};

// Get all blogs
const getBlog = async (req, res) => {
    try {
        const blogs = await blogModel.find();

        res.status(200).json({
            success: true,
            message: "Blogs retrieved successfully.",
            data: blogs
        });

    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};

// Update a blog
const updateBlog = async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params.id);
        // console.log(blog);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found."
            });
        }

        if (req.file) {
            // Construct full path of old image
            const oldImgPath = path.join(__dirname, "..", blog.image);

            // Save new image path
            const imgPath = req.file.path;
            blog.image = imgPath;

            // Delete old image (if it exists)
            fs.unlink(oldImgPath, (err) => {
                if (err) {
                    console.error("Error deleting old image:", err);
                }
            });
        }

        // Update other fields
        const { name, description ,content} = req.body;
        if (name) blog.name = name;
        if (description) blog.description = description;
        if (content) blog.content = content;

        await blog.save();

        res.status(200).json({
            success: true,
            message: "Blog updated successfully.",
            data: blog
        });

    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};


// Delete a blog
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found."
            });
        }

        // Delete associated image file if it exists
        if (blog.image) {
            const imagePath = path.join(__dirname, "..", blog.image);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Error deleting image:", err);
                }
            });
        }

        // Delete the blog document
        await blogModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully."
        });

    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};


//
const singleBlog = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find the blog by ID
        const blog = await blogModel.findById(id);

        // If no blog found, return a 404 response
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found.",
            });
        }

        // Send the blog data in the response
        res.status(200).json({
            success: true,
            message: "Blog fetched successfully.",
            data: blog
        });

    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};



module.exports = { addBlog, getBlog, updateBlog, deleteBlog,singleBlog };
