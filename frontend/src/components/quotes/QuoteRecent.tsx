import React, { useContext, useEffect, useState } from "react";
import api from "../../api/api";
import Quote from "./Quote";
import { useUser } from "../../stores/userContext";

const QuoteRecent = () => {
  const [quote, setQuote] = useState<any[]>([]);
  const [vote, setVote] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const [voteResponse, quoteResponse] = await Promise.all([
        api.get(`votes/me/${user?.id}`),
        api.get(`quotes/recent?page=${page}`),
      ]);

      const userVotes = voteResponse.data;
      const quotes = quoteResponse.data.data;

      const quotesWithVotes = quotes.map((quote: any) => {
        const matchingVote = userVotes.data.find(
          (vote: any) => vote.vote.quote.id === quote.id
        );

        return {
          ...quote,
          voteType: matchingVote ? matchingVote.voteType : null,
        };
      });

      setVote(userVotes);
      setQuote(quotesWithVotes);
      setLastPage(quoteResponse.data.meta.last_page);
    };

    fetchData();
  }, [user?.id, page]);

  /*useEffect(() => {
    const getQuote = async () => {
      const { data } = await api.get(`quotes/recent?page=${page}`);
      setQuote((prevQuotes) => {
        // check if quotes already exists in state, if not add it
        const newQuotes = data.data.filter(
          (d: any) => !prevQuotes.find((p) => p.id === d.id)
        );
        return [...prevQuotes, ...newQuotes];
      });
      setLastPage(data.meta.last_page);
      //console.log(data.data);
    };
    getQuote();
  }, [page]);*/

  const next = () => {
    if (page >= lastPage) {
    } else {
      setPage(page + 1);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen pt-6 justify-center sm:pt-6 ">
      <div>
        <h1 className="text-4xl text-black text-center">
          <span className="text-primary">Most Recent quotes</span>
        </h1>
        <h2 className="text-center text-black">
          Most upvoted quotes on the platform Give a like to the ones you like
          to<br></br>
          keep them saved in your profile
        </h2>
      </div>
      <div className="">
        <div className="grid lg:grid-cols-3 ">
          {quote.map((quote: any) => (
            <Quote
              key={quote.id}
              id={quote.id}
              content={quote.content}
              date_time={quote.date_time}
              karma={quote.karma}
              author_id={quote.author_id}
              vote={quote.vote}
              voteType={quote.voteType}
              user_name={quote.author.first_name}
              user_lastname={quote.author.last_name}
              user_check={user?.id}
            />
          ))}
        </div>

        <div
          className="flex content-center items-center justify-center py-5"
          onClick={next}
        >
          <button className="px-8 py-2 text-primary bg-white border-primary border  rounded-3xl ">
            Load more
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteRecent;
