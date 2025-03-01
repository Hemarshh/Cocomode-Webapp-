import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader, Star, Trash2 } from "lucide-react";
import { backendurl } from "../App";
import toast from "react-hot-toast";

const Reviews = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${backendurl}/api/reviews/`);
      if (response.data.success) {
        setComments(response.data.reviews);
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `${backendurl}/api/reviews/${commentId}`
      );
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );

      console.log(response.data);

      if (response.data.success) {
        toast.success("Comment deleted successfully!.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader className="animate-spin h-12 w-12 text-[#82543c]" />
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="p-6 flex justify-center items-center">
        <p className="text-xl font-medium text-[#4E342E]">No Reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b ">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-medium font-serif text-[#D99328] text-center mb-12 relative ">
          Sweet Reviews
          <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#D4A55A] rounded-full"></span>
        </h2>

        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="relative group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-[#D4A55A]"
            >
              <button
                onClick={() => deleteComment(comment._id)}
                className="absolute top-4 right-4 text-[#A0522D]/50 hover:text-[#A0522D] transition-all p-2 hover:bg-[#FFF8F0] rounded-full"
                aria-label="Delete review"
              >
                <Trash2 size={20} />
              </button>

              <div className="flex items-start gap-6">
                {comment.product?.image && (
                  <div className="flex-shrink-0">
                    <img
                      src={comment.product.image}
                      alt={comment.product.name}
                      className="w-24 h-24 rounded-lg object-cover border-4 border-[#F5E6D8] shadow-sm"
                    />
                  </div>
                )}

                <div className="flex-1">
                  <div className="mb-3">
                    {comment.product?.name && (
                      <h3 className="text-xl font-semibold text-[#3D2B1F] font-playfair">
                        {comment.product.name}
                      </h3>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-[#D4A55A]">
                        {comment.author}
                      </span>
                      <span className="text-[#A0522D]/50">•</span>
                      <span className="text-sm text-[#A0522D]/80">
                        {new Date(parseInt(comment.date)).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>

                  <p className="text-[#3D2B1F]/90 leading-relaxed mb-4">
                    {comment.content}
                  </p>

                  <div className="flex items-center gap-1 text-[#D4A55A]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        fill={
                          i < (comment.rating || 0) ? "#D4A55A" : "transparent"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
