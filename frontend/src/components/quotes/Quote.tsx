import { useState } from "react";
import api from "../../api/api";
import QuoteEdit from "../popup/QuoteEdit";
import QuoteDelete from "../popup/QuoteDelete";
import { Vote } from "../../models/vote";

interface QuoteProps {
  id: number;
  voteType?: string;
  date_time: any;
  karma: any;
  content?: string;
  vote?: Vote;
  user_name?: string;
  user_lastname?: string;
  user_check?: any;
  author_id?: any;
}

const Quote: React.FC<QuoteProps> = ({
  id,
  voteType,
  karma,
  content,
  date_time,
  user_name,
  vote,
  user_lastname,
  user_check,
  author_id,
}: QuoteProps) => {
  const [isQuoteEditVisible, setIsQuoteEditVisible] = useState(false);
  const [isQuoteDeleteVisible, setIsQuoteDeleteVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const toggleQuoteEdit = () => {
    setIsQuoteEditVisible((prevIsQuoteEditVisible) => !prevIsQuoteEditVisible);
  };

  const toggleQuoteDelete = () => {
    setIsQuoteDeleteVisible(
      (prevIsQuoteDeleteVisible) => !prevIsQuoteDeleteVisible
    );
  };

  const upvote = async (id: number) => {
    await api
      .post(`quotes/${id}/upvote`, {})
      .then(() => {
        // Refresh after successful upvote
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error upvoting:", error);
      });
  };

  const downvote = async (id: number) => {
    await api
      .post(`quotes/${id}/downvote`, {})
      .then(() => {
        // Refresh after successful upvote
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error upvoting:", error);
      });
  };

  const editQuote = async (content: string) => {
    if (content.trim() === "") {
      setErrors({ content: "Please enter a quote" });
      return;
    }
    // Make API request to post data
    // Handle response appropriately
    // ...
    const res = await api.put(`me/myquote/${id}`, {
      content,
    });
    //window.location.reload();
    console.log(res);
    // Update state to hide modal
    setIsQuoteEditVisible(false);
  };

  const deleteQuote = async () => {
    // Make API request to post data
    // Handle response appropriately
    // ...
    const res = await api.delete(`me/myquote/${id}`, {});
    //window.location.reload();
    console.log(res);
    // Update state to hide modal
    setIsQuoteEditVisible(false);
  };

  return (
    <div className="py-2 px-2 ">
      {isQuoteEditVisible && (
        <QuoteEdit onClose={toggleQuoteEdit} onSubmit={editQuote} />
      )}
      {isQuoteDeleteVisible && (
        <QuoteDelete onClose={toggleQuoteDelete} onSubmit={deleteQuote} />
      )}
      <div className="p-4 max-w-md flex justify-between max-md:max-w-sm max-sm:max-w-xs bg-white shadow-xl rounded-lg border border-gray-200">
        <div className="justify-center text-center pr-4 flex flex-col gap-2">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={voteType === "upvote" ? "#DE8667" : "currentColor"}
              className="w-6 h-6 cursor-pointer"
              onClick={() => upvote(id)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </div>
          <div>{karma}</div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={voteType === "downvote" ? `#DE8667` : `currentColor`}
              className="w-6 h-6 cursor-pointer"
              onClick={() => downvote(id)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="font-normal text-black ">{content}</div>
          <div className="flex">
            <img
              className="h-6 w-6 object-cover rounded-full "
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
              alt="Current profile"
            />
            <span className="cursor-pointer">
              {user_name} {user_lastname}
            </span>
           
          </div>
          <span>{date_time}</span>
        </div>
        {/*settings for quote (edit/delelte) */}
        <div
          className={`${
            user_check === author_id
              ? "flex flex-col justify-center gap-8"
              : "hidden"
          }`}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              onClick={toggleQuoteEdit}
              className="w-6 h-6 cursor-pointer text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              onClick={toggleQuoteDelete}
              className="w-6 h-6 cursor-pointer text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
