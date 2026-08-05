import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";


export default function EditPost() {

    const { id } = useParams();

    const navigate = useNavigate();


    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [loading, setLoading] = useState(true);



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

            setTitle(data.title);
            setContent(data.content || "");
            setImageUrl(data.image_url || "");

        }


        setLoading(false);

    }




    async function updatePost(e) {

        e.preventDefault();


        const { error } = await supabase
            .from("posts")
            .update({

                title: title,

                content: content,

                image_url: imageUrl

            })
            .eq("id", Number(id));



        if (error) {

            console.error("Error updating post:", error);

        } 
        else {

            navigate(`/post/${id}`);

        }

    }





    useEffect(() => {

        fetchPost();

    }, []);





    if (loading) {

        return <h2>Loading...</h2>;

    }





    return (

        <div className="post-page">


            <h1>
                Edit Post
            </h1>



            <form onSubmit={updatePost}>


                <input
                    type="text"
                    placeholder="Post title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    required
                />



                <textarea

                    placeholder="Post content"

                    value={content}

                    onChange={(e)=>setContent(e.target.value)}

                />



                <input

                    type="text"

                    placeholder="Image URL"

                    value={imageUrl}

                    onChange={(e)=>setImageUrl(e.target.value)}

                />



                <button type="submit">

                    Save Changes

                </button>



            </form>


        </div>

    );

}