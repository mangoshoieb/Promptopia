"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [SearchedResults, setSearchedResults] = useState([]);

  const fetchData = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setPosts(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter(
      (item) =>
        regex.test(item.prompt) ||
        regex.test(item.tag) ||
        regex.test(item.creator.username)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
       const searchedResults = filterPrompts(e.target.value);
        setSearchedResults(searchedResults);
      }, 500)
    );
  };
  const handleTagClick = (tagname) => {
    setSearchText(tagname);
   const  searchedResults = filterPrompts(tagname);
    setSearchedResults(searchedResults);
  };
  return (
    <section className="feed">
      <form className="w-full relative felx-center">
        <input
          type="text"
          placeholder="Search for tags or username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList
          data={SearchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
