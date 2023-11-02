import React, { useEffect, useState } from "react";
import { Quotes } from "../../models/quote";
import Quote from "./Quote";
import api from "../../api/api";
import { User } from "../../models/user";
import { Vote } from "../../models/vote";
import { useUser } from "../../stores/userContext";

const QuoteLiked = () => {
  const [quote, setQuote] = useState<any[]>([]);
  const [vote, setVote] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const [voteResponse, quoteResponse] = await Promise.all([
        api.get(`votes/me/${user?.id}`),
        api.get(`quotes?page=${page}`),
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
      /*setQuote((prevQuotes) => {
        const newQuotes = quotesWithVotes
          .filter((d: any) => !prevQuotes.find((p) => p.id === d.id))
          .map((d: any) => {
            const matchingVote = userVotes.data.find(
              (v: any) => v.vote.quote.id === d.id
            );
            console.log("matchingVote: ", matchingVote);
            return {
              ...d,
              voteType: matchingVote ? matchingVote.voteType : null,
            };
          });
        return [...prevQuotes, ...newQuotes];
      });
*/
      setLastPage(quoteResponse.data.meta.last_page);
    };

    fetchData();
  }, [user?.id, page]);

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
          <span className="text-primary">Most upvoted quotes</span>
        </h1>
        <h2 className="text-center text-black">
          Most upvoted quotes on the platform Give a like to the ones you like
          to<br></br>
          keep them saved in your profile
        </h2>
      </div>

      <div className="">
        <div className="grid lg:grid-cols-3  ">
          {quote.map((quote: any) => (
            <Quote
              key={quote.id}
              id={quote.id}
              content={quote.content}
              date_time={quote.date_time}
              karma={quote.karma}
              author_id={quote.author_id}
              vote={quote.vote.id}
              voteType={quote.voteType}
              user_name={quote.author.first_name}
              user_lastname={quote.author.last_name}
              user_check={user?.id}
            />
          ))}
        </div>
        <div className="flex justify-center py-5" onClick={next}>
          <button className="px-8 py-2 text-primary bg-white border-primary border  rounded-3xl ">
            Load more
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteLiked;
