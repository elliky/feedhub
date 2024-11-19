"use client";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseConfig";
import { Box, Typography, Card, CardContent, TextField, Button, Rating } from "@mui/material";
import { getAuth } from "firebase/auth"; // Firebase Auth functions
import dayjs from "dayjs";

export default function Page() {
  // State to store the selected star rating
  const [rating, setRating] = useState<number | null>(0);
  // State to store the feedback text
  const [feedbackText, setFeedbackText] = useState<string>("");

  // Form submission handler
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Get the logged-in user information
    const auth = getAuth(); // Use Firebase Auth to get user information
    const user = auth.currentUser; // The logged-in user

    // Log user information to verify if it exists
    console.log("Current user:", user); // Kullanıcı bilgisini konsola yazdır

    // If rating or feedbackText is empty, alert the user
    if (rating === 0 || feedbackText === "") {
      alert("Please provide a rating and feedback.");
    } else {
      try {
        // Add feedback to Firestore
        await addDoc(collection(db, "feedbacks"), {
          rating: rating,
          feedback: feedbackText,
          user: user ? user.email : "Anonymous", // Add user information if available, otherwise set to "Anonymous"
          createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"), // Timestamp formatted using dayjs
        });
        // Show success message and clear the form
        alert(`Feedback submitted successfully!\nRating: ${rating}\nFeedback: ${feedbackText}`);
        setRating(0);
        setFeedbackText("");
      } catch (error) {
        console.error("Error adding feedback: ", error);
        alert("Error submitting feedback.");
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ maxWidth: 600, width: "100%", padding: 4 }}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                color: "primary.main", // Color scheme
                fontWeight: "bold", // Bold font style
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)", // Reduced text shadow
              }}
            >
              Send Feedback
            </Typography>
            <Typography variant="body1" gutterBottom textAlign="center">
              On this page, you can submit your feedback, rate your experience, and provide detailed comments.
            </Typography>
          </Box>

          {/* Form container with flex */}
          <Box component="form" onSubmit={handleSubmit} mt={3} display="flex" flexDirection="column" alignItems="center">
            {/* Star Rating */}
            <Box mb={3} display="flex" flexDirection="column" alignItems="center">
              <Typography component="legend">Rating (1-5 stars)</Typography>
              <Rating name="simple-controlled" value={rating ?? 0} size="large" onChange={(event, newValue) => setRating(newValue)} />
            </Box>

            {/* Feedback Input */}
            <TextField label="Your Feedback" multiline rows={4} fullWidth variant="outlined" value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} placeholder="Enter your feedback" sx={{ mb: 3 }} />

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
