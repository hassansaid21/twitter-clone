"use client";

import React, { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import ImageKitMedia from "./ImageKitMedia";
import { sharePost } from "@/actions";
import MediaEditor from "./MediaEditor";
import { useMediaEditor } from "@/hooks/useMediaEditor";
import PublishMedia from "./PublishMedia";
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  Theme,
} from "emoji-picker-react";
export default function Publish() {
  const [text, setText] = useState("");
  const [openPicker, setOpenPicker] = useState(false);

  const {
    media,
    editingMedia,
    addMedia,
    removeMedia,
    editMedia,
    updateMediaSettings,
    closeEditor,
    reset,
  } = useMediaEditor(4);
  //console.log(media)
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

    const fileDetials = await sharePost(formData, media); // Server Action
    console.log(fileDetials);
    setText(""); // reset states
    reset();
  };

  function handleEmoji(e: EmojiClickData) {
    setText((v) => v + e.emoji);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="border-b-[1px] border-borderGray flex p-4 gap-4"
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
        {/* preview image or ideoURL */}
        {media.length > 0 && (
          <PublishMedia
            media={media}
            onRemove={removeMedia}
            onEdit={editMedia}
          />
        )}

        {editingMedia && (
          <MediaEditor
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
                accept="image/*,video/*"
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
              <ImageKitMedia
                type="image"
                src="icons/image.svg"
                alt=""
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </label>
            <ImageKitMedia
              type="image"
              src="icons/gif.svg"
              alt=""
              className="cursor-pointer"
              width={20}
              height={20}
            />{" "}
            <ImageKitMedia
              type="image"
              src="icons/poll.svg"
              alt=""
              className="cursor-pointer"
              width={20}
              height={20}
            />{" "}
            <div className="relative">
              {/* Trigger */}
              <button
                type="button"
                aria-label="Open emoji picker"
                onClick={() => setOpenPicker((v) => !v)}
                className="rounded-full p-2 hover:bg-blue-500/20"
              >
                <ImageKitMedia
                  type="image"
                  src="icons/emoji.svg"
                  alt="emoji icon"
                  width={20}
                  height={20}
                />
              </button>

              {/* Picker */}
              <div
              className={`absolute top-full left-[50%] translate-x-[-50%] mb-2 z-20 ${
                  openPicker ? "block" : "hidden"
                }`}
              >
                <EmojiPicker
                  onEmojiClick={handleEmoji}
                  lazyLoadEmojis={true}
                  emojiStyle={EmojiStyle.TWITTER}
                  theme={Theme.DARK}
                  
                />
              </div>

              {/* Click outside */}
              {openPicker && (
                <div
                  className="fixed inset-0 z-10 bg-transparent"
                  onClick={() => setOpenPicker(false)}
                />
              )}
            </div>
            <ImageKitMedia
              type="image"
              src="icons/schedule.svg"
              alt=""
              className="cursor-pointer"
              width={20}
              height={20}
            />{" "}
            <ImageKitMedia
              type="image"
              src="icons/location.svg"
              alt=""
              className="cursor-pointer"
              width={20}
              height={20}
            />
          </div>
             {/* save and publish */}
          <button
            type="submit"
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
