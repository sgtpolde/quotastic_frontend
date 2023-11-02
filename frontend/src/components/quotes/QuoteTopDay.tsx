import { useEffect, useState } from "react";
import api from "../../api/api";
import { Quotes } from "../../models/quote";
import Quote from "./Quote";
import { useUser } from "../../stores/userContext";

const QuoteTopDay = () => {
  const [quoteTop, setQuoteTop] = useState<Quotes | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const getQuoteDay = async () => {
      try {
        const response = await api.get("random-quote");
        const { data } = response;
        if (data === null || data.data === "no quote for today") {
          setQuoteTop(null);
        } else {
          setQuoteTop(data);
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
        // Handle error as needed (e.g., show error message to the user)
      } finally {
        setIsLoading(false);
      }
    };

    getQuoteDay();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen pt-6 justify-center sm:pt-6">
      <div>
        <h1 className="text-4xl text-black text-center">
          <span className="text-primary">Quote of the day</span>
        </h1>
        <h2 className="text-center text-black">
          Quote of the day is a randomly chosen quote
        </h2>
      </div>
      {!isLoading && quoteTop && quoteTop.author && quoteTop.content ? (
        <Quote
          key={quoteTop.id}
          id={quoteTop.id}
          content={quoteTop.content}
          date_time={quoteTop.date_time}
          karma={quoteTop.karma}
          author_id={quoteTop.author.id}
          user_name={quoteTop.author.first_name}
          user_lastname={quoteTop.author.last_name}
          user_check={user?.id}
        />
      ) : (
        !isLoading && <p>No quote available for today.</p>
      )}
    </div>
  );
};

export default QuoteTopDay;
