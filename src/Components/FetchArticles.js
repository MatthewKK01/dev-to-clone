import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment/moment";
import { RiHeart3Line } from "react-icons/ri";
import { BiComment } from "react-icons/bi";
import {toast , ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Person from "./Person";
import Buttons from "./Buttons";

function FetchArticles() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [tag,setTag] = useState("discuss")

  const fetchData = () =>
    axios
      .get(`https://dev.to/api/articles?per_page=10&page=${page}&tag=${tag}`)
      .then((response) => {
        setArticles(response.data);
      });

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
    window.scrollTo(0,0);
  },[page, tag]);

  const handlePrev = () => {
    if(page === 1){
      setPage(1)
      toast("You are already on the first page")
      window.scrollTo(0,0)
    }else{
      setPage(page - 1);
    }
  }

  return (
    <div>
      <section className="max-width">
        {isLoading ? (
          <div className="spinner">
            <article></article>
          </div>
        ) : (
          <>
          <Buttons handlePrev={handlePrev} page={page} setPage={setPage}/>

            <ToastContainer position="top-right"/>

            <section className="grid grid-col-1 gap-5">
              {articles.map(
                ({
                  id,
                  title,
                  description,
                  reading_time_minutes,
                  url,
                  comments_count,
                  published_timestamp,
                  positive_reactions_count,
                  cover_image,
                  tag_list,
                  user,
                }) => (
                  <article
                    key={id}
                    className="border border-slate-200 rounded-lg"
                  >
                    {cover_image && (
                      <a href={url} target="_blank" rel="noreferrer">
                        <img
                          src={cover_image}
                          alt={title}
                          loading="lazy"
                          className="rounded-t"
                        />
                      </a>
                    )}

                    <div className="p-5 relative">
                      <article className="flex items-center justify-start mb-5">
                        {user.profile_image_90 && <img
                          src={user.profile_image_90}
                          alt={user.name}
                          loading="lazy"
                          className="mr-3 w-14 rounded-2xl"
                        />}
                        <ul className="name">
                          <li className="font-bold text-slate-700">
                            {user.name}
                          </li>
                          
                          <li>
                            {moment(published_timestamp).format("MMMM Do YYYY")}
                          </li>
                          <article className="person1">
                          <Person user={user} />
                          </article>
                        </ul>
                      </article>

                      <article className="mb-5">
                        <a
                          href={url}
                          className="font-bold text-3xl hover:text-indigo-700"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {title}
                        </a>
                        <p className="mt-5">{description}</p>
                      </article>

                      <article className="mb-5">
                        <ul className="flex items-center justify-start flex-wrap gap-1">
                          {tag_list.map((tags, index) => (
                            <li
                            onClick={() => setTag(tags)}
                              key={index}
                              className="bg-slate-100 px-1 rounded-lg cursor-pointer hover:bg-slate-200"
                            >
                              #{tags}
                            </li>
                          ))}
                        </ul>
                      </article>

                      <article className="flex flex-wrap items-center justify-between">
                        <ul className="flex ">
                          <li className="text-sm flex mr-3  items-center justify-start">
                            <RiHeart3Line className="mr-1" />
                            {positive_reactions_count} Reactions
                          </li>
                          <li className="text-sm flex  items-center justify-start">
                            {" "}
                            <BiComment className="mr-1" /> {comments_count}{" "}
                            Comments
                          </li>
                        </ul>
                        <p className="text-sm">
                          {reading_time_minutes} min read
                        </p>
                      </article>
                    </div>
                  </article>
                )
              )}
            </section>
          </>
        )}
        <Buttons handlePrev={handlePrev} page={page} setPage={setPage}/>
      </section>

    </div>
  );
}

export default FetchArticles;
