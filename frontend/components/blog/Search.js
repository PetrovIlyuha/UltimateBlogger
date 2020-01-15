import Link from "next/link";
import renderHTML from "react-render-html";
import { useState, useEffect } from "react";
import { listSearch } from "../../actions/blog";

const Search = () => {
  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false,
    message: ""
  });

  const { search, results, searched, message } = values;

  const searchSubmit = e => {
    e.preventDefault();
    listSearch({ search }).then(data => {
      setValues({
        ...values,
        results: data,
        searched: true,
        message: `${data.length} blogs found`
      });
    });
  };

  const handleChange = e => {
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      results: []
    });
  };

  const searchedBlogs = (results = []) => {
    console.log(results);
    return (
      <div className="jumbotron" style={searchResultsStyles}>
        {message && <p className="pt-4 text-muted fonr-italic">{message}</p>}
        {results.map((blog, index) => (
          <div key={index}>
            <Link href={`/blogs/${blog.slug}`}>
              <a className="text-primary">{blog.title}</a>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit} style={searchPanel}>
      <div>
        <input
          type="search"
          className="form-control"
          placeholder="Search"
          onChange={handleChange}
        />
      </div>
      <div>
        <button className="btn btn-block btn-outline-primary" type="submit">
          Search
        </button>
      </div>
    </form>
  );
  return (
    <>
      <div style={{ background: "black" }}>
        {searchForm()}
        {searched && <div>{searchedBlogs(results)}</div>}
      </div>
    </>
  );
};

const searchPanel = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "flex-end",
  justifyContent: "space-around",
  width: "300px",
  padding: "80px 0 10px 0",
  background: "black"
};

const searchResultsStyles = {
  background: "black",
  color: "white"
};

export default Search;
