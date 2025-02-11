/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// eslint-disable-next-line react/prop-types
function Rating({ resourceId, userId }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [totalStars, setTotalStars] = useState(5);

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    if (rating === null) {
      // console.error("Please select a rating");
      return;
    }

    try {
      const storedUserData = localStorage.getItem("userData");
      if (!storedUserData) {
        console.error("User data not found in local storage");
        return;
      }
      const parsedUserData = JSON.parse(storedUserData);

      // if (rating === null || rating === "") {
      //   console.error("Please select a rating");
      //   // userRating = 0;
      //   return;
      // }
      const data = {
        resource_id: resourceId,
        rating: parseFloat(rating),
      };

      console.log(data);
      console.log("Request data:", data);

      const username = parsedUserData.username;
      const password = parsedUserData.password;
      const base64Credentials = btoa(`${username}:${password}`);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/rating/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
      console.log("Response data:", response.data);

      if (response.status === 200 || response.status === 201) {
        toast.success("Rating Submitted Successfully !");
        console.log("Rating submitted successfully");
        setRating(null);
      } else {
        console.error("Error submitting rating");
      }
    } catch (error) {
      console.error("Error submitting rating:", error.response.status);
      console.error("Error data:", error.response.data);
    }
  };

  return (
    <div className="h-[80px] w-auto text-center cursor-pointer">
      {[...Array(totalStars)].map((star, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <input
              className="hidden"
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => setRating(currentRating)}
            />
            <span
              className="cursor-pointer text-3xl m-0.5"
              style={{
                color:
                  currentRating <= (hover || rating) ? "#ffc107" : "#FFFFFF",
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
              // onClick={handleRatingSubmit} // Call the submit function when a rating is clicked
            >
              &#9733;
            </span>
          </label>
        );
      })}
      {/* <div>Your Rating is: {rating}</div> */}
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-1"
          onClick={handleRatingSubmit}
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
}

export default Rating;
