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

    } 
    else {

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

      console.error("Error updating upvotes:", error);

    } 
    else {

      fetchPost();

    }

  }
  async function fetchComments() {

    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", post.id)
      .order("created_at", { ascending: true });



    if (error) {

      console.error("Error fetching comments:", error);

    } 
    else {

      setComments(data);

    }

  }





  async function addComment(e) {

    e.preventDefault();


    if (!newComment.trim()) {

      return;

    }



    const { error } = await supabase
      .from("comments")
      .insert([
        {
          post_id: post.id,
          content: newComment
        }
      ]);



    if (error) {

      console.error("Error adding comment:", error);

    } 
    else {

      setNewComment("");

      fetchComments();

    }

  }

    useEffect(() => {

      fetchPost();

    }, []);

    useEffect(() => {

      if(post){

        fetchComments();

      }

      }, [post]);

      if (loading) {

        return <h2>Loading...</h2>;

      }

      if (!post) {

        return <h2>Post not found.</h2>;

    }


  return (

    <div className="post-page">


      <h1>
        {post.title}
      </h1>



      <p>
        {post.content}
      </p>

      {post.image_url && (

        <img
          src={post.image_url}
          alt={post.title}
        />

      )}

      <h3>
        Upvotes: {post.upvotes}
      </h3>

      <div className="button-div">

        <button onClick={handleUpvote}>
          👍 Upvote
        </button>

      </div>

      <hr />

      <h2>
        Comments
      </h2>

      {comments.map((comment)=>(

        <div
          className="comment"
          key={comment.id}
        >

          <p>
            {comment.content}
          </p>


        </div>


      ))}

      <form onSubmit={addComment}>


        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e)=>setNewComment(e.target.value)}
        />



        <button type="submit">
          Add Comment
        </button>


      </form>
    </div>

  );

}