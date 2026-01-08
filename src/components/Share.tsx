"use client";

import React, { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import ImageKit from "./ImageKit";
import { sharePost } from "@/actions";
import PostImages from "./PostImages";
// import { MediaFile, Settings } from "@/types";
import ImageEditor from "./ImageEditor";
import { useMediaEditor } from "@/hooks/useMediaEditor";


export default function Share() {
  const [text, setText] = useState("");
  const {
    media,
    editingMedia,
    addMedia,
    removeMedia,
    editMedia,
    updateMediaSettings,
    closeEditor,
    setMedia ,
  } = useMediaEditor(4);

  const MAX_CHARS = 280;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto"; //this is important to allow textarea to shrink on deleteting
    textarea.style.height = textarea.scrollHeight + "px"; // to give the height that is needed in order to make the content fit without scrolling
  }, [text]);

 


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent default form submission
    const formData = new FormData();
    formData.append("desc", text);
    media.forEach((m) => {
      formData.append("media", m.file); // send all selected files
    });

    await sharePost(formData , media); // Server Action
    setText(""); // reset states
    setMedia([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-borderGray flex p-4 gap-4"
    >
      <Avatar />

      <div className="flex flex-1 flex-col gap-4">
        <textarea
          value={text}
          rows={1}
          maxLength={MAX_CHARS}
          onChange={(e) => setText(e.target.value)}
          placeholder="What is happening?!"
          ref={textareaRef}
          className="
              bg-transparent
              outline-none
              resize-none
              placeholder:text-textGray
              text-[18px]
            "
        />

        {media.length > 0 && (
          <PostImages  media={media} onRemove={removeMedia} onEdit={editMedia} />
        )}

{editingMedia && (
  <ImageEditor
    media={editingMedia}
    onClose={closeEditor}
    onSave={(settings) =>
      updateMediaSettings(editingMedia.id, settings)
    }
  />
)}


        <hr className="border-borderGray" />
        <div className="flex justify-between">
          <div className="flex gap-4 items-center">
            {media.length != 4 && (
              <input
                hidden
                type="file"
                accept="image/*"
                id="image-input"
                multiple // to make the browser send multiple files 
                onChange={(e) => addMedia(e.target.files)}
              />
            )}
            <label
              htmlFor="image-input"
              className={`${
                media.length === 4 ? "opacity-40 pointer-events-none" : ""
              } p-2 text-center rounded-full hover:bg-blue-500/20 `}
            >
              <ImageKit
                src="icons/image.svg"
                alt=""
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </label>
            <ImageKit
              src="icons/gif.svg"
              alt=""
              className="cursor-pointer"
              width={20}
              height={20}
            />{" "}
            <ImageKit
              src="icons/poll.svg"
              alt=""
              className="cursor-pointer"
              width={20}
              height={20}
            />{" "}
            <ImageKit
              src="icons/emoji.svg"
              alt=""
              className="cursor-pointer"
              width={20}
              height={20}
            />{" "}
            <ImageKit
              src="icons/schedule.svg"
              alt=""
              className="cursor-pointer"
              width={20}
              height={20}
            />{" "}
            <ImageKit
              src="icons/location.svg"
              alt=""
              className="cursor-pointer"
              width={20}
              height={20}
            />
          </div>

          <button
          type="submit"
            disabled={!text.trim() && media.length === 0}
            className="bg-white rounded-full font-bold text-black py-2 px-4 disabled:opacity-50
                    disabled:cursor-not-allowed">                           
                  Post
          </button>
        </div>
      </div>
    </form>
  );
}
