"use client";

import React, { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import ImageKitMedia from "./ImageKitMedia";
import { sharePost } from "@/actions";
import MediaEditor from "./MediaEditor";
import { useMediaEditor } from "@/hooks/useMediaEditor";
import PublishMedia from "./PublishMedia";
import CharacterCounter from "./CharacterCounter";
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  Theme,
} from "emoji-picker-react";
import { MediaFile } from "@/types";

interface PublishProps {
  id?: string;
  onStateChange?: (_hasContent: boolean, _text: string, _media: MediaFile[]) => void;
  initialText?: string;
  initialMedia?: MediaFile[];
  textPlaceholder?: string
}

export default function Publish({
  id = "default",
  onStateChange,
  initialText = "",
  initialMedia = [],
  textPlaceholder
}: PublishProps) {
  const inputId = `image-input-${id}`;
  const [text, setText] = useState(initialText);
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
    setInitialMedia,
  } = useMediaEditor(4);

  // Set initial media on mount if provided
  useEffect(() => {
    if (initialMedia && initialMedia.length > 0) {
      setInitialMedia(initialMedia);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  //console.log(media)
  const MAX_CHARS = 280;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    onStateChange?.(text.trim().length > 0 || media.length > 0, text, media);
  }, [text, media, onStateChange]);

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

    const fileDetails = await sharePost(formData, media); // Server Action
    // console.log(fileDetails); // Remove in production
    setText(""); // reset states
    reset();
  };

  function handleEmoji(e: EmojiClickData) {
    setText((v) => v + e.emoji);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className=" flex p-4 gap-4"
    >
      <Avatar />

      <div className="flex flex-1 flex-col gap-4">
        <textarea
          value={text}
          rows={1}
          maxLength={MAX_CHARS}
          onChange={(e) => setText(e.target.value)}
          placeholder= { textPlaceholder||"What is happening?!" }
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

        
        <div className="flex justify-between gap-3">
          <div className="flex gap-4 items-center">
            {media.length != 4 && (
              <input
                hidden
                type="file"
                accept="image/*,video/*"
                id={inputId}
                multiple // to make the browser send multiple files
                onChange={(e) => addMedia(e.target.files)}
              />
            )}
            <label
              htmlFor={inputId}
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
              className={`absolute top-full left-1/2 translate-x-[-50%] mb-2 z-20 ${
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

          <div className=" flex items-center  gap-4">

             {/* Character counter */}
          {text.length > 0 && (
            <CharacterCounter current={text.length} max={MAX_CHARS} />
          )}
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
      </div>
    </form>
  );
}
