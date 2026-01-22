"use client";

import React, { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import CharacterCounter from "./CharacterCounter";
import Publish from "./Publish";

interface ReplyBoxProps {
  replyingTo?: string;
}

export default function ReplyBox({ replyingTo = "karim13" }: ReplyBoxProps) {
  const [text, setText] = useState("");
  const MAX_CHARS = 280;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }, [text]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit reply logic
    console.log("Reply submitted:", text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-b-[1px] border-borderGray py-2"
    >
      {/* Replying to indicator */}
      <div className="ml-14 mb-2">
        <span className="text-textGray text-sm">
          Replying to <span className="text-iconBlue">@{replyingTo}</span>
        </span>
      </div>

    <Publish textPlaceholder="post your replay" />
    </form>
  );
}
