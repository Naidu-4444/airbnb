import Link from "next/link";

function Nothing({ title, des, link = "/" }) {
  return (
    <div className="modal__content p-5 fixed bg-white w-[200px] md:w-3/5 min-h-[100px] border-gray-300 border-2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg">
      <div className="flex">
        <div>
          <h1 className="font-semibold text-gray-600 mb-3">{title}</h1>
          <Link href={link}>
            <p className="text-gray-600 underline">{des}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Nothing;
