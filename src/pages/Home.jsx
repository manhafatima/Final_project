import { useEffect, useState } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";


export default function Home() {

    const [posts, setPosts] = useState([]);


    async function getPosts() {

        const { data, error } = await supabase
            .from("posts")
            .select("*")
            .order("created_at", { ascending: false });


        if (error) {
            console.log("Error fetching posts:", error);
        } 
        else {
            setPosts(data);
        }

    }


    useEffect(() => {
        getPosts();
    }, []);



    return (
        <>

            <h1>Home Feed</h1>


            <Link to="/create">
                Create New Post
            </Link>



            <div>

                {
                    posts.map((post) => (

                        <div key={post.id}>

                            <Link to={`/post/${post.id}`}>
                                <h2>
                                {post.title}
                                </h2>
                            </Link>


                            <p>
                                Created:
                                {" "}
                                {new Date(post.created_at).toLocaleString()}
                            </p>


                            <p>
                                Upvotes: {post.upvotes}
                            </p>


                        </div>

                    ))
                }


            </div>


        </>
    );

}