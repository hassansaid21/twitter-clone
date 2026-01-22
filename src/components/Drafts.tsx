"use client";

import { Draft } from "@/types";
import { useState } from "react";
import Image from "next/image";

interface DraftsProps {
  drafts: Draft[];
  onClose: () => void;
  onDeleteDrafts: (_ids: string[]) => void;
  onSelectDraft: (_id: string) => void;
}

export default function Drafts({
  drafts,
  onClose,
  onDeleteDrafts,
  onSelectDraft,
}: DraftsProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };


   

  const handleEditToggle = () => {
    if (isEditMode) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(drafts.map((d) => d.id)));
    }
    setIsEditMode(!isEditMode);
  };

  const handleDelete = () => {
    onDeleteDrafts(Array.from(selectedIds));
    setSelectedIds(new Set());
    if (selectedIds.size === drafts.length) {
      setIsEditMode(false);
    }
  };

  const handleSelection = () => {
    if (!selectedIds.size ) {
      setSelectedIds(new Set(drafts.map((d) => d.id)));
    } else {
      setSelectedIds(new Set());
    }

    

  };

  const handleDraftClick = (draft: Draft) => {
    if (isEditMode) {
      toggleSelect(draft.id);
    } else {
      onSelectDraft(draft.id);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex justify-center items-start overflow-auto bg-blue-200/20"
      onClick={onClose}
    >
      <div
        className="bg-black border border-borderGray rounded-2xl w-[90%] max-w-[600px] mt-12  h-[90vh] flex flex-col overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="text-white hover:bg-gray-800 rounded-full p-2"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current"
              >
                <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" />
              </svg>
            </button>
            <h2 className="text-xl font-bold text-white">Drafts</h2>
          </div>
          <button
            onClick={handleEditToggle}
            className={`font-bold px-4 py-1.5 rounded-full transition-colors text-black bg-white
             
                hover:bg-gray-200
                
            `}
          >
            {isEditMode ? "Done" : "Edit"}
          </button>
        </div>

        {/* Drafts List */}
        <div className="flex-1 overflow-y-auto">
          {drafts.length === 0 ? (
            <div className="p-8 text-center text-textGray">
              <p className="text-lg">No unsent posts</p>
              <p className="text-sm mt-2">
                When you save a post as a draft, it will appear here.
              </p>
            </div>
          ) : (
            <>
              <div className="px-4 py-3 border-b border-borderGray">
                <h3 className="text-white font-bold">
                  Unsent posts
                </h3>
              </div>
              {drafts.map((draft) => (
                <div
                  key={draft.id}
                  onClick={() => handleDraftClick(draft)}
                  className={`p-4 border-b border-borderGray cursor-pointer hover:bg-gray-500/20 transition-colors 
                   `}
                >
                  <div className="flex gap-3">
                    {isEditMode && (
                      <div className="flex items-center pt-1">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            selectedIds.has(draft.id)
                              ? "bg-iconBlue border-iconBlue"
                              : "border-gray-500"
                          }`}
                        >
                          {selectedIds.has(draft.id) && (
                            <svg
                              viewBox="0 0 24 24"
                              className="w-3 h-3 fill-white"
                            >
                              <path d="M9 20.42l-6.21-6.21 2.83-2.83L9 14.77l9.88-9.89 2.83 2.83L9 20.42z" />
                            </svg>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="flex-1 flex gap-1 items-center min-w-0">
                    
                      {draft.media.length > 0 && (
                        <div className="flex gap-1 w-32  flex-wrap "> 
                           
                          {draft.media.slice(0, 4).map((m) => (
                            <div
                              key={m.id}
                              className="w-12 h-10 rounded-lg overflow-hidden bg-gray-800 relative"
                            >
                              {m.type === "image" ? (
                                <Image
                                  src={m.dataUrl}
                                  alt=""
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="w-6 h-6 fill-gray-400"
                                  >
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                        {draft.text && (
                        <p className="text-white text-sm line-clamp-2 mb-2">
                          {draft.text}
                        </p>
                      )}
                    </div>
                      <p className="text-textGray text-xs">
                        {formatDate(draft.createdAt)}
                      </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer Actions (only in edit mode with selections) */}
        {isEditMode && drafts.length > 0 && (
          <div className="flex items-center justify-between p-4 border-t border-borderGray">
            <button
              onClick={handleSelection}
              // disabled={selectedIds.size === 0}
              className="px-4 py-2 text-white font-bold rounded-full border border-borderGray hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            { selectedIds.size ?'Deselect all': 'Select All'}
            </button>
            <button
              onClick={handleDelete}
              disabled={selectedIds.size === 0}
              className="px-4 py-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete ({selectedIds.size})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
