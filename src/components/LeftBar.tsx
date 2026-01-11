
import Link from "next/link";
import ImageKitMedia  from "./ImageKitMedia";

const menuList = [
  {
    id: 1,
    name: "Homepage",
    link: "/",
    icon: "home.svg",
  },
  {
    id: 2,
    name: "Explore",
    link: "/",
    icon: "explore.svg",
  },
  {
    id: 3,
    name: "Notification",
    link: "/",
    icon: "notification.svg",
  },
  {
    id: 4,
    name: "Messages",
    link: "/",
    icon: "message.svg",
  },
  {
    id: 5,
    name: "Bookmarks",
    link: "/",
    icon: "bookmark.svg",
  },
  {
    id: 6,
    name: "Jobs",
    link: "/",
    icon: "job.svg",
  },
  {
    id: 7,
    name: "Communities",
    link: "/",
    icon: "community.svg",
  },
  {
    id: 8,
    name: "Premium",
    link: "/",
    icon: "logo.svg",
  },
  {
    id: 9,
    name: "Profile",
    link: "/",
    icon: "profile.svg",
  },
  {
    id: 10,
    name: "More",
    link: "/",
    icon: "more.svg",
  },
];


export default function LeftBar() {
  return (
    <nav aria-label="primary" className="flex  sticky top-0 h-screen flex-col justify-between   py-2">
       <div className="flex flex-col gap-2  text-md items-center xxl:items-start ">
           <Link className="p-3 rounded-full  hover:bg-bgHover" href='/' aria-label="Go to homepage">
              <ImageKitMedia type='image' src='icons/logo.svg'  alt="X" width={24} height={24}/>
           </Link>
           <ul className="flex flex-col gap-2 " role="list">
                {menuList.map((item)=>(
                  <li key={item.id}>

                   <Link aria-label={item.name} className="flex items-center gap-4 p-2 rounded-full hover:bg-bgHover "  href={item.link}>
                      <ImageKitMedia type='image' src={`icons/${item.icon}`} width={24} height={24}  alt='' aria-hidden="true" />
                      <span className="hidden xxl:inline">{item.name}</span>
                  </Link>
                  </li>
               ))}

       
           </ul>
        
        <Link className="bg-white rounded-full  p-2  xxl:hidden  " href='/'>
        <ImageKitMedia type='image' src='icons/post.svg' alt="post-icon" width={24} height={24}/>
        </Link>
        <Link href='modal/compose/publish' className="hidden xxl:inline bg-white text-lg font-bold rounded-full py-2 px-20  text-black text-center" >
          Post</Link>
        </div>
        
        
        <div aria-haspopup="menu"  className="flex items-center p-2  justify-between cursor-pointer hover:bg-bgHover rounded-full " role="button" aria-label="Open profile menu">
             <div className="flex items-center  gap-2">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ">
                <ImageKitMedia type='image' src='/general/me.png' alt="user-logo" fill/>
              </div>
              <div className="hidden xxl:flex flex-col   text-sm ">
                <span className="font-bold">Hassan Said</span>
                <span className="text-textGray">@hassansaid21</span>
              </div>
             </div>
              <div className="text-2xl  hidden xxl:block " aria-hidden="true">...</div>
     </div>
    </nav>
  )
}
