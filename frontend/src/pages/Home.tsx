import QuoteLiked from "../components/quotes/QuoteLiked";
import QuoteRecent from "../components/quotes/QuoteRecent";
import QuoteTopDay from "../components/quotes/QuoteTopDay";
import { useUser } from "../stores/userContext";

const Home = () => {
  const { user, loading } = useUser();

  return (
    <div>
      {loading ? (
        <div className="text-center mt-32">
          <h1 className="text-4xl mb-4">Loading...</h1>
          {/* You can add a loading spinner or other loading indicators here */}
        </div>
      ) : user ? (
        // User is logged in
        <div>
          <QuoteTopDay />
          <QuoteRecent />
          <QuoteLiked />
        </div>
      ) : (
        <div className="mt-32 mx-5">
        <div className="lg:grid lg:grid-cols-2 place-items-center">
          <div className="lg:mx-12 ">
            <h1 className="text-4xl md:text-8xl">
              {" "}
              Welcome
              <div className="flex">
                to <p className="text-primary mx-2">Quotastic</p>
              </div>
            </h1>{" "}
            <h2 className="text-start">
              Quotastic is free onilne platform for you to explore the quips,
              <br />
              quotes, and proverbs. Sign up and express yourself.
            </h2>
            <button className="w-32 px-8 py-2  tracking-wide text-white bg-primary rounded-3xl ">
              <a href="/register">Sign up</a>
            </button>
          </div>
          <div className="flex justify-center">
            <QuoteTopDay />
          </div>
        </div>
        <div className="text-4xl text-center mx-5 my-10 ">
          <h1> Explore the world of </h1>
          <p className="text-primary">fantastic quotes</p>
        </div>
        <div>
         
        </div>
      </div>
      )}
    </div>
  );
};

export default Home;
