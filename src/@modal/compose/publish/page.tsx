import Link from "next/link";


export default function Page() {
  return (
    <Link href='/' className=" fixed flex justify-center inset-0 z-10 bg-white/50">
        <div className="bg-black rounded-lg">
            <div className="flex items-center justify-between">
                <Link href='/' className="">X</Link>
                <span className="text-iconBlue font-semibold">drafts</span>
            </div>
        </div>
    </Link>
  )
}
