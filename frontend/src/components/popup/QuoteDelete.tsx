import React, { useState } from "react";

const QuoteDelete = (props: any) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    // Call onSubmit prop with form data
    props.onSubmit();
    setIsSuccess(true);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
      <div className="py-2 px-2 flex justify-center ">
        <div className="p-6 max-w-xl max-md:max-w-md max-sm:max-w-xs bg-white shadow-xl rounded-lg border border-gray-200 flex">
          {isSuccess ? (
            <div className="flex flex-col gap-5">
              <div className="px-3 py-2">
                <div className="font-normal text-black text-3xl flex py-4">
                  Your <p className="text-primary pl-2 pr-2">quote</p> was deleted
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
                <div className="font-normal text-black text-3xl flex py-4">
                  Are you sure?
                </div>
                <div className="font-normal text-black text-xl">
                  This post will be deleted. There is no undo of this action.
                </div>
              </div>
              <div className="text-xl">
                <span className="flex gap-4 pl-1">
                  <button
                    type="submit"
                    className="rounded-3xl border border-primary text-white bg-primary px-8 py-1 mt-4"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button
                    onClick={props.onClose}
                    className="rounded-3x  px-8 py-1  mt-4"
                  >
                    Cancel
                  </button>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteDelete;
