import ImageKitMedia from "./ImageKitMedia";

export default function Search() {
  return (
    <div className="flex items-center bg-inputGray  gap-4 rounded-full border-[1px] border-borderGray  px-4 py-2">
      <label htmlFor="search" className="cursor-pointer">
        <ImageKitMedia
          src="icons/explore.svg"
          alt="search"
          type="image"
          width={16}
          height={16}
        />
      </label>
      <input
        type="text"
        id="search"
        placeholder="search"
        name="search"
        className="bg-transparent flex-1   text-white outline-none"
      />
    </div>
  );
}
