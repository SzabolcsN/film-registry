import { ReactComponent as ArrowRight } from '../images/arrow-right.svg'
import { ReactComponent as ArrowLeft } from '../images/arrow-left.svg'

/**
 * @currentPageIndex {number} - current page index
 * @numberOfPages {number} - number of pages
 * @changePage {function} - change the current page - (pageNumber)
 */

export default function Pagination({ numberOfPages, currentPageIndex, changePage }) {
    return (
        <nav className="flex items-center justify-between px-4 sm:px-0">
            <div className="flex w-0 flex-1">
                <button
                    disabled={currentPageIndex === 1}
                    onClick={() => changePage(currentPageIndex - 1)}
                    className="inline-flex items-center pt-4 pr-1 text-sm text-gray-500 hover:text-gray-700"
                >
                    <ArrowLeft className="h-7 w-auto dark:stroke-slate-400 stroke-slate-600" />
                </button>
            </div>
            <div className="md:flex">
                {Array.apply(null, { length: numberOfPages}).map((e,i) => (
                    <button
                        key={i}
                        disabled={i + 1 === currentPageIndex}
                        onClick={() => changePage(i + 1)}
                        className={`${i + 1 === currentPageIndex ? "" : "text-gray-500 hover:text-gray-700" } inline-flex items-center px-4 pt-4 text-sm`}
                    >
                        <b>{i + 1}</b>
                    </button>
                ))}
            </div>
            <div className="flex w-0 flex-1 justify-end">
                <button
                    disabled={currentPageIndex === numberOfPages}
                    onClick={() => changePage(currentPageIndex + 1)}
                    className="inline-flex items-center pt-4 pl-1 text-sm text-gray-500 hover:text-gray-700"
                >
                    <ArrowRight className="h-7 w-auto dark:stroke-slate-400 stroke-slate-600" />
                </button>
            </div>
        </nav>
    )
}