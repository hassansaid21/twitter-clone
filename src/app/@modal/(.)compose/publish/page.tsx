"use client";

import Publish from "@/components/Publish";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";

export default function PublishModal() {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  const handleStateChange = useCallback((hasContent: boolean) => {
    setHasContent(hasContent);
  }, []);

  const handleOverlayClick = () => {
    if (hasContent) {
      setShowConfirm(true);
    } else {
      router.back();
    }
  };

  const handleDiscard = () => {
    setShowConfirm(false);
    router.back();
  };

  const handleSave = () => {
    // TODO: Save draft logic here
    setShowConfirm(false);
    router.back();
  };
  const handleDrafts= ()=>{
    if(hasContent){
      setShowConfirm(true)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-start overflow-auto bg-white/50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-black border border-borderGray py-4 px-8 rounded-lg w-[90%] md:max-w-[600px] h-max mt-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleOverlayClick}
            className="text-white text-xl hover:bg-gray-800 rounded-full p-1.5 px-3"
          >
            ✕
          </button>
          <span onClick={handleDrafts} className="text-iconBlue font-bold cursor-pointer hover:bg-iconBlue/20 px-4 py-2 rounded-full">Drafts</span>
        </div>
        <Publish id="modal" onStateChange={handleStateChange} />
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-60 flex justify-center items-center bg-black/70"
          onClick={(e) => {
            e.stopPropagation();
           setShowConfirm(false)
          }}
        >
          <div className="bg-black border border-borderGray p-6 rounded-2xl w-[320px]">
            <h2 className="text-xl font-bold text-white mb-2">Save post?</h2>
            <p className="text-textGray text-sm mb-6">
              You can save this to send later from your drafts.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleSave}
                className="w-full py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200"
              >
                Save
              </button>
              <button
                onClick={handleDiscard}
                className="w-full py-3 border border-borderGray text-white font-bold rounded-full hover:bg-gray-900"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
