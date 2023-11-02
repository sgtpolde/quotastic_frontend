import React, { useState } from "react";

const QuoteCreate = (props: any) => {
  const [content, setContent] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Call onSubmit prop with form data
    props.onSubmit(content);
  };
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-[10]">
      <div className="py-2 px-2 flex justify-center ">
        <div className="p-6 max-w-xl max-md:max-w-sm max-sm:max-w-xs bg-white shadow-xl rounded-lg border border-gray-200 flex">
          <div className="flex flex-col gap-5">
            <div className="px-3 py-2">
              <div className="font-normal text-black text-3xl sm:text-3xl flex">
                Are you feeling <p className="text-primary pl-2">inspired?</p>
              </div>
              <div className="text-md sm:text-lg">
                You can post quotes. You can delete them on your profile
              </div>
            </div>
            <div className=" ">
              <form onSubmit={handleSubmit}>
                <textarea
                  id="content"
                  rows={4}
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
                    className="rounded-3x  px-8 py-1  mt-4"
                    onClick={props.onClose}
                  >
                    Cancel
                  </button>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCreate;
