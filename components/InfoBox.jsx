import Link from "next/link";
export default function InfoBox({title, content, buttonBg, bg, buttonText, href}) {
  return (
    <div className={`${bg} m-4 p-4 w-100 shadow shadow-slate-400`}>
      <h3 className="font-bold text-2xl">{title}</h3>
      <p>{content}</p>
      <Link href={href}>
        <button className={`${buttonBg} rounded-sm p-2 text-white mt-4`}>{buttonText}</button>
      </Link>
    </div>
  )
}