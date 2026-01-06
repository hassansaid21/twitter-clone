"use client";

import React, { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import ImageKit from "./ImageKit";
import { sharePost } from "@/actions";
import PostImages from "./PostImages";
import { MediaFile } from "@/types";

export default function Share() {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [text, setText] = useState("");
  const MAX_CHARS = 280;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto"; //this is important to allow textarea to shrink on deleteting
    textarea.style.height = textarea.scrollHeight + "px"; // to give the height that is needed in order to make the content fit without scrolling
  }, [text]);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newMedia = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file),
    }));

    // Limit max 4 files
    setMedia((prev) => [...prev, ...newMedia].slice(0, 4));
  };

  // Remove file by id
  const handleRemove = (id: string) => {
    setMedia((prev) => {
      const removed = prev.filter((m) => m.id !== id);
      return removed;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent default form submission

    const formData = new FormData();
    formData.append("desc", text);

    media.forEach((m) => {
      formData.append("media", m.file); // send all selected files
    });

    try {
      await sharePost(formData); // Server Action
      setText("");
      setMedia([]);
    } catch (error) {
      console.error(error);
    }
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
          name="desc"
          placeholder="What is happening?!"
          ref={textareaRef}
          className="
              bg-transparent
              outline-none
              resize-none
              placeholder:text-textGray
              text-[18px]
              w-full
              overflow-hidden
              
            "
        />

        {media.length > 0 && (
          <PostImages media={media} onRemove={handleRemove} />
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
                multiple // tomake the browser send all files
                name="media"
                onChange={handleMediaChange}
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
            disabled={!text.trim() && media.length === 0}
            className="bg-white rounded-full font-bold text-black py-2 px-4 disabled:opacity-50
    disabled:cursor-not-allowed"
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
