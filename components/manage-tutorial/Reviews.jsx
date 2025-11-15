"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaStar, 
  FaReply, 
  FaCheck, 
  FaTimes, 
  FaFilter,
  FaSearch,
  FaUser,
  FaClock,
  FaBook
} from "react-icons/fa";

const ReviewManagementPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const reviews = [
    {
      id: 1,
      user: "Alex Chen",
      rating: 5,
      comment: "This course completely changed how I build web applications. The App Router explanation was exceptional!",
      date: "2 weeks ago",
      tutorial: "Mastering Next.js 14",
      tutorialId: 1,
      reply: null,
      status: "pending"
    },
    {
      id: 2,
      user: "Maria Garcia",
      rating: 4,
      comment: "Great content, but some sections could use more real-world examples. Overall very valuable.",
      date: "1 month ago",
      tutorial: "Advanced React Patterns",
      tutorialId: 2,
      reply: "Thank you for your feedback, Maria! I'll add more practical examples in the next update.",
      status: "replied"
    },
    {
      id: 3,
      user: "John Smith",
      rating: 3,
      comment: "The course content is good but the audio quality in some videos could be improved.",
      date: "3 days ago",
      tutorial: "TypeScript Masterclass",
      tutorialId: 3,
      reply: null,
      status: "pending"
    }
  ];

  const filteredReviews = reviews.filter(review => {
    const matchesFilter = activeFilter === "all" || review.status === activeFilter;
    const matchesSearch = review.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.tutorial.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleReply = (reviewId) => {
    // In real app, this would call an API
    const updatedReviews = reviews.map(review => 
      review.id === reviewId 
        ? { ...review, reply: replyText, status: "replied" }
        : review
    );
    setReplyingTo(null);
    setReplyText("");
  };

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const stats = {
    total: reviews.length,
    replied: reviews.filter(r => r.reply).length,
    pending: reviews.filter(r => !r.reply).length,
    averageRating: (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <div className="glass border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Review Management</h1>
              <p className="text-[var(--muted)]">Manage and respond to student reviews</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
          initial="initial"
          animate="animate"
          variants={fadeUp}
        >
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-[var(--foreground)]">{stats.total}</div>
            <div className="text-[var(--muted)] text-sm">Total Reviews</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-[var(--foreground)]">{stats.replied}</div>
            <div className="text-[var(--muted)] text-sm">Replied</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-[var(--foreground)]">{stats.pending}</div>
            <div className="text-[var(--muted)] text-sm">Pending</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-[var(--foreground)]">{stats.averageRating}</div>
            <div className="text-[var(--muted)] text-sm">Avg Rating</div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div 
          className="glass rounded-2xl p-6 mb-8"
          variants={fadeUp}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {["all", "pending", "replied"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-xl font-medium capitalize transition ${
                    activeFilter === filter
                      ? "bg-[var(--accent)] text-white"
                      : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]/10"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted)]" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>
          </div>
        </motion.div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial="initial"
              animate="animate"
              variants={fadeUp}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                {/* User Avatar */}
                <div className="w-12 h-12 bg-[var(--accent)] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {review.user.charAt(0)}
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-[var(--foreground)]">{review.user}</h3>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={`${
                              star <= review.rating
                                ? "text-[var(--accent)]"
                                : "text-[var(--muted)]"
                            } text-sm`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-[var(--muted)]">{review.date}</span>
                  </div>

                  {/* Tutorial Info */}
                  <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-3">
                    <FaBook className="text-xs" />
                    <span>{review.tutorial}</span>
                  </div>

                  {/* Review Comment */}
                  <p className="text-[var(--foreground)] mb-4 leading-relaxed">{review.comment}</p>

                  {/* Existing Reply */}
                  {review.reply && (
                    <div className="bg-[var(--accent)]/10 border-l-4 border-[var(--accent)] rounded-r-xl p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-[var(--accent)]">Your Reply</span>
                        <span className="text-xs bg-[var(--accent)] text-white px-2 py-1 rounded-full">Instructor</span>
                      </div>
                      <p className="text-[var(--foreground)]">{review.reply}</p>
                    </div>
                  )}

                  {/* Reply Section */}
                  {replyingTo === review.id ? (
                    <div className="space-y-3">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your response..."
                        rows={3}
                        className="w-full p-3 rounded-xl bg-[var(--background)] border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleReply(review.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-xl hover:bg-[var(--accent-hover)] transition"
                        >
                          <FaCheck />
                          Send Reply
                        </button>
                        <button
                          onClick={() => setReplyingTo(null)}
                          className="flex items-center gap-2 px-4 py-2 border border-[var(--border-color)] text-[var(--muted)] rounded-xl hover:text-[var(--foreground)] transition"
                        >
                          <FaTimes />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    !review.reply && (
                      <button
                        onClick={() => setReplyingTo(review.id)}
                        className="flex items-center gap-2 px-4 py-2 text-[var(--accent)] hover:bg-[var(--accent)]/10 rounded-xl transition"
                      >
                        <FaReply />
                        Reply to Review
                      </button>
                    )
                  )}
                </div>

                {/* Status Badge */}
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  review.reply 
                    ? "bg-green-500/20 text-green-500" 
                    : "bg-yellow-500/20 text-yellow-500"
                }`}>
                  {review.reply ? "Replied" : "Pending"}
                </div>
              </div>
            </motion.div>
          ))}

          {filteredReviews.length === 0 && (
            <motion.div
              variants={fadeUp}
              className="glass rounded-2xl p-12 text-center"
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                No reviews found
              </h3>
              <p className="text-[var(--muted)]">
                {searchTerm ? "Try adjusting your search terms" : "No reviews match the current filters"}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewManagementPage;