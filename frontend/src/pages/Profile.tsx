import React, { useEffect, useState } from "react";
import Quote from "../components/quotes/Quote";
import api from "../api/api";
import { Quotes } from "../models/quote";
import { User } from "../models/user";
import { useUser } from "../stores/userContext";

const Profile = (props: any) => {
  const { user } = useUser();
  const [quoteDate, setQuoteDate] = useState([]);
  const [quoteLiked, setQuoteLiked] = useState([]);
  const [quoteLikedOther, setQuoteLikedOther] = useState([]);
  const [karma, setKarma] = useState(0);
  const [quoteNo, setQuoteNo] = useState(0);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      return; // Don't fetch data if user ID is not available
    }

    const fetchData = async () => {
      try {
        const [
          quoteDateResponse,
          quoteLikedResponse,
          karmaResponse,
          likedQuotesResponse,
          numberOfQuotesResponse,
        ] = await Promise.all([
          api.get(`quotes/recent/${user.id}?page=${page}`),
          api.get(`quotes/mostliked/${user.id}?page=${page}`),
          api.get(`me/karma`),
          api.get(`votes/${user.id}`),
          api.get(`quotes/no/${user.id}`),
        ]);

        setQuoteDate(quoteDateResponse.data.data);
        setQuoteLiked(quoteLikedResponse.data.data);
        setKarma(karmaResponse.data);
        setQuoteLikedOther(likedQuotesResponse.data.quotes);
        setQuoteNo(numberOfQuotesResponse.data);
        setLastPage(quoteDateResponse.data.meta.last_page);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error as needed (e.g., show error message to the user)
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user?.id, page]);

  if (isLoading) {
    return <p>Loading...</p>; // You can display a loading indicator while data is being fetched
  }
  return (
    <div>
      <div className="justify-center bg-primary py-16 ">
        <div className="items-center content-center flex justify-center mt-40">
          <div className="">
            <img
              className="h-12 w-12 object-cover rounded-full lg:mx-6"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
              alt="Current profile"
            />
          </div>
        </div>
        <h1 className="text-4xl text-black text-center">
          <span className="text-white">
            {user?.firstName} {user?.lastName}
          </span>
        </h1>
      </div>
      <div className="flex justify-center text-center absolute transform -translate-y-2/4 left-5 right-5">
        <div className="p-4 max-w-lg max-md:max-w-md max-sm:max-w-sm bg-white shadow-xl rounded-lg border border-gray-200 flex justify-center gap-8">
          <div className="flex flex-col justify-center  mx-4">
            <h1 className="text-xl text-black ">Quotes</h1>
            <p className="flex flex-col justify-center text-4xl text-primary">
              {quoteNo}
            </p>
          </div>
          <div className="flex flex-col justify-center  mx-4">
            <h1 className="text-xl text-black ">Quotastic Karma</h1>
            <p className="flex flex-col justify-center text-4xl text-black">
              {karma}
            </p>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 mt-16 text-xl mx-6 justify-center">
        <div>
          <h1>Most Liked quote</h1>
          {quoteLiked.map((quote: Quotes) => (
            <Quote
              key={quote.id}
              id={quote.id}
              content={quote.content}
              date_time={quote.date_time}
              karma={quote.karma}
              author_id={quote.author_id}
              vote={quote.vote}
              user_name={quote.author.first_name}
              user_lastname={quote.author.last_name}
              user_check={user?.id}
            />
          ))}
        </div>
        <div>
          <h1>Most recent</h1>
          {quoteDate.map((quote: Quotes) => (
            <Quote
              key={quote.id}
              id={quote.id}
              content={quote.content}
              date_time={quote.date_time}
              karma={quote.karma}
              author_id={quote.author_id}
              vote={quote.vote}
              user_name={quote.author.first_name}
              user_lastname={quote.author.last_name}
              user_check={user?.id}
            />
          ))}
        </div>
        <div>
          <h1>Liked</h1>
          {quoteLikedOther.map((quote: Quotes) => (
            <Quote
              key={quote.id}
              id={quote.id}
              content={quote.content}
              date_time={quote.date_time}
              karma={quote.karma}
              author_id={quote.author.id}
              vote={quote.vote}
              user_name={quote.author.first_name}
              user_lastname={quote.author.last_name}
              user_check={user?.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
