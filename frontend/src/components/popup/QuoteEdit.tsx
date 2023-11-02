import React, { useState } from "react";

const QuoteEdit = (props: any) => {
  const [content, setContent] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Call onSubmit prop with form data
    props.onSubmit(content);
    setIsSuccess(true);
  };
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
      <div className="py-2 px-2 flex justify-center ">
        <div className="p-6 max-w-md max-md:max-w-md max-sm:max-w-xs bg-white shadow-xl rounded-lg border border-gray-200 flex">
          {isSuccess ? (
            <div className="flex flex-col gap-5">
              <div className="px-3 py-2">
                <div className="font-normal text-black text-3xl flex py-4">
                  Your <p className="text-primary pl-2 pr-2">quote</p> was
                  edited
                </div>
              </div>
              <div className="text-xl">
                <span className="flex gap-4 pl-1 justify-center">
                  <button
                    onClick={props.onClose}
                    className="rounded-3xl border border-primary text-white bg-primary px-8 py-1 mt-4"
                  >
                    Close
                  </button>
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="px-3 py-2">
                <div className="font-normal text-black text-3xl sm:text-3xl flex">
                  Edit your <p className="text-primary pl-2">quote.</p>
                </div>
                <div className="text-md sm:text-lg">
                  This quote will be updated. Check your spelling
                </div>
              </div>
              <div className="">
                <form onSubmit={handleSubmit}>
                  <textarea
                    id="message"
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-primary focus:border-primary"
                    placeholder="Write your thoughts here..."
                  ></textarea>
                  <span className="flex gap-4 pl-1">
                    <button
                      type="submit"
                      className="rounded-3xl border border-primary text-white bg-primary px-8 py-1 mt-4"
                    >
                      Submit
                    </button>
                    <button
                      onClick={props.onClose}
                      className="rounded-3x  px-8 py-1  mt-4"
                    >
                      Cancel
                    </button>
                  </span>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteEdit;
