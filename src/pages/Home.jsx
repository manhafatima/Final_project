import { useEffect, useState } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";


export default function Home() {

    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("newest");


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



    // Search posts by title
    const filteredPosts = posts.filter((post) =>
        post.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );



    // Sort posts
    const sortedPosts = [...filteredPosts];


    if (sort === "upvotes") {

        sortedPosts.sort(
            (a, b) => b.upvotes - a.upvotes
        );

    } 
    else {

        sortedPosts.sort(
            (a, b) =>
            new Date(b.created_at) -
            new Date(a.created_at)
        );

    }



    return (

        <div className="home-container">


            <h1>
                Home Feed
            </h1>



            <div className="feed-controls">


                <input
                    type="text"
                    placeholder="Search posts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />



                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >

                    <option value="newest">
                        Latest Posts
                    </option>


                    <option value="upvotes">
                        Most Upvoted
                    </option>


                </select>


            </div>




            {sortedPosts.map((post) => (


                <div 
                    className="post-card" 
                    key={post.id}
                >


                    <Link to={`/post/${post.id}`}>

                        <h2>
                            {post.title}
                        </h2>

                    </Link>



                    <p>
                        Created:
                        {" "}
                        {new Date(post.created_at)
                        .toLocaleString()}
                    </p>



                    <p>
                        👍 {post.upvotes}
                    </p>


                </div>


            ))}



        </div>

    );

}