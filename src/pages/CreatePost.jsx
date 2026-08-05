import { useState } from "react";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";


export default function CreatePost(){

    const navigate = useNavigate();

    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [imageUrl,setImageUrl] = useState("");


    async function handleSubmit(e){

        e.preventDefault();


        const {error} = await supabase
        .from("posts")
        .insert([
            {
                title:title,
                content:content,
                image_url:imageUrl,
                upvotes:0
            }
        ]);


        if(error){
            console.log(error);
        }
        else{
            navigate("/");
        }

    }



    return(

        <div>

            <h1>Create Post</h1>


            <form onSubmit={handleSubmit}>


                <input
                type="text"
                placeholder="Post title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                required
                />


                <textarea
                placeholder="Post content (optional)"
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                />


                <input
                type="text"
                placeholder="Image URL (optional)"
                value={imageUrl}
                onChange={(e)=>setImageUrl(e.target.value)}
                />


                <button type="submit">
                    Create Post
                </button>


            </form>

        </div>

    )

}