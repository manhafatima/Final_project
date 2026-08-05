import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";

export default function PostPage() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  async function fetchPost() {
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", Number(id))
        .single();

    if (error) {
      console.error("Error fetching post:", error);
    } else {
      setPost(data);
    }

    setLoading(false);
  }

  async function handleUpvote() {
    const { error } = await supabase
    .from("posts")
      .update({
        upvotes: post.upvotes + 1
    })
    .eq("id", post.id);
    if (error) {
      console.error(error);
    } else {
      fetchPost();
    }
  }

  useEffect(() => {
    fetchPost();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!post) {
    return <h2>Post not found.</h2>;
  }

  return (
    <div>
      <h1>{post.title}</h1>

      <p>{post.content}</p>

      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          width="400"
        />
      )}

      <h3>Upvotes: {post.upvotes}</h3>
      <button onClick={handleUpvote}>
        👍 Upvote
      </button>
    </div>
  );
}