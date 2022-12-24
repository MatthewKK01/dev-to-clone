import React from 'react'

export default function Buttons({handlePrev,setPage,page}) {
  return (
    <article className="border-t border-b border-slate-300 my-10">
              <ul className="flex items-center justify-between px-2 py-2">
                <li>
                  <button
                    className="hover:text-indigo-700"
                    onClick={handlePrev}
                  >
                    &larr; Previous
                  </button>
                </li>
                <li>
                  <button
                    className="hover:text-indigo-700"
                    onClick={() => setPage(page + 1)}
                  >
                    Next &rarr;
                  </button>
                </li>
              </ul>
            </article>
  )
}
