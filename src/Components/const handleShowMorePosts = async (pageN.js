const handleShowMorePosts = async (pageNo) => {
  const result = await axios.get(
    `http://localhost:4000/display?name=${searchName}&email=${searchEmail}&pageNo=${1}`
  );

  console.log("pageno", pageNo);
  setUser(result.data.users);
  setPer_Page(result.data.options.limit);
  setPage_Count(Math.ceil(result.data.total_data / result.data.options.limit));

  const Length = result.data.total_data;

  const DATA = [...Array(Length).keys()];
  console.log("data", DATA);

  const numberOfItems = showMore ? DATA.data : per_Page;

  //setShowMore = true;
  console.log("users", users);
  console.log("pagesLimit", per_Page);
  console.log(
    "count",
    Math.ceil(result.data.total_data / result.data.options.limit)
  );
  console.log("numberOfItems", numberOfItems);
};
