"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Icons } from "./icons";

export default function LeaveReview({ listingId }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (rating === 0 || !comment) {
      return toast({
        title: "Error",
        description: "Please provide a rating and a comment.",
        variant: "destructive",
      });
    }
    setIsLoading(true);
    try {
      await axios.post("/api/reviews", {
        listingId,
        rating,
        comment,
      });
      toast({
        title: "Success",
        description: "Your review has been submitted!",
      });
      setComment("");
      setRating(0);
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: error?.response?.data?.error || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-semibold">Leave a Review</h3>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              key={starValue}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
              className="transition-colors duration-200"
            >
              <Icons.StarIcon
                className={`h-8 w-8 cursor-pointer ${
                  starValue <= (hover || rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          );
        })}
      </div>
      <Textarea
        placeholder="Write your comment here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
      />
      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit Review"}
      </Button>
    </div>
  );
}
