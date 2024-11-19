import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseConfig";
import { useParams } from "next/navigation";
import dayjs from "dayjs";

interface Feedback {
  user: string;
  feedback: string;
  rating: number;
  createdAt: any; // Date field
}

export default function FeedbackDetailModal({ onClose }) {
  const { id } = useParams(); // To get the Firestore document ID
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  // Fetch feedback data from Firestore
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const docRef = doc(db, "feedbacks", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFeedback(docSnap.data() as Feedback);
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchFeedback();
  }, [id]);

  return (
    <div className="modal-overlay">
      <div className="custom-modal">
        <h2>Feedback Detail</h2>
        {feedback ? (
          <>
            <p>User: {feedback.user}</p>
            <p>Date: {feedback.createdAt ? dayjs(feedback.createdAt.toDate()).format("MMMM D, YYYY h:mm A") : "N/A"}</p>
            <p>Feedback: {feedback.feedback}</p>
            <p>Rating: {feedback.rating}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
