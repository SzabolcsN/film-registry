import { useState, useEffect, useRef } from "react"
import Select from 'react-select'
import { connect, useDispatch } from "react-redux"

import { ReactComponent as ArrowUp } from '../images/arrow-up.svg'
import { ReactComponent as ArrowDown } from '../images/arrow-down.svg'
import { ReactComponent as Delete } from '../images/delete.svg'
import { ReactComponent as Plus } from '../images/plus.svg'
import { ReactComponent as Edit } from '../images/edit.svg'
import Pagination from "./Pagination"
import DeleteModal from "./DeleteModal"
import CreateModal from "./CreateEditModal"

import { fetchFilms, createFilm, removeFilm, updateFilm } from "../actions/film"

// Page title component
const Head = () => {
    return (
        <div className="flex flex-col items-center mx-auto mb-10 md:mb-12 lg:mb-14">
            <h1 className="text-3xl md:text-4xl lg:text-5xl mb-1 md:mb-2">
                Pop Corn
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl">
                Discover the world of movies!
            </h2>
        </div>
    )
}

/**
 * Component for render film list elements
 * @itemList {array} - current page and filtered film elements
 * @deleteItem {function} - delete item - (id)
 */
const FilmList = ({ itemList, deleteItem, openCreateModal }) => {
    return (
        <div>
            {itemList.length > 0 &&
                <div>
                    {itemList.map((item) => {
                        return (
                            <FilmContent
                                item={item}
                                key={item._id}
                                deleteItem={deleteItem}
                                openCreateModal={openCreateModal}
                            />
                        )
                    })}
                </div>
            }
        </div>
    )
}

/**
 * Component for render a film list element
 * @item {object} - one list element
 * @deleteItem {function} - delete item - (id)
 * @detailsOpen {boolean} - control the "long" (>200char) description visibility
 * @modalIsOpen {boolean} - control the modal visibility
 */

const FilmContent = ({ item, deleteItem, openCreateModal }) => {
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false)
    const hasDetails = item.description.length > 200

    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }

    function confirmedDelete(id) {
        deleteItem(id)
        closeModal()
    }
    return (
        <div className="mb-6 last:mb-0">
            <DeleteModal
                modalIsOpen={modalIsOpen}
                title={item.title} id={item._id}
                openModal={openModal}
                closeModal={closeModal}
                confirmedDelete={confirmedDelete}
            />
            {detailsOpen &&
                <div className="text-center mb-6">
                    <hr />
                </div>
            }
            {hasDetails &&
                <button onClick={() => setDetailsOpen(!detailsOpen)} className="float-right md:mt-4">
                    {!detailsOpen &&
                        <ArrowDown className="h-7 w-auto dark:stroke-slate-400 stroke-slate-600" />
                    }
                    {detailsOpen &&
                        <ArrowUp className="h-7 w-auto dark:stroke-slate-400 stroke-slate-600" />
                    }
                </button>
            }
            <div className="flex flex-row">
                <h1 className="text-2xl md:text-3xl lg:text-4xl mb-2">
                    {item.title} <span className={`text-xl ${item.age === "12" ? "text-yellow-500 dark:text-yellow-200" : item.age === "16" ? "text-red-500" : item.age === "18" ? "text-red-600" : ""}`}>
                        {item.age !== "0" && item.age !== "1" ? `(${item.age}+)` : ""}
                    </span>
                </h1>
                <button onClick={() => openCreateModal(item)} className="ml-4 mt-2 md:mt-3 bg-blue-400 h-6 w-6 group inline-flex items-center justify-center rounded-full">
                    <Edit className="h-6" />
                </button>
                <button onClick={openModal} className="ml-4 mt-2 md:mt-3 bg-red-400 h-6 w-6 group inline-flex items-center justify-center rounded-full">
                    <Delete className="h-6" />
                </button>
            </div>

            {!detailsOpen &&
                <p className="text-xl lg:text-2xl">
                    {hasDetails ? `${item.description.substring(0, 200)}...` : item.description}
                </p>
            }
            {detailsOpen &&
                <>
                    <p className="text-xl lg:text-2xl text-slate-800 dark:text-slate-200">
                        {item.description}
                    </p>
                    <div className="text-center mt-6">
                        <hr />
                    </div>
                </>
            }
        </div>
    )
}

/**
 * Age filter component
 * @ageFilter {object} - selected age filter option
 * @ageFilterOptions {array} - dynamic age filter options from filmList
 * @changeAgeFilter {function} - change age filter
 */

const AgeClassSelect = ({ ageFilterOptions, changeAgeFilter, ageFilter }) => {
    return (
        <div className="w-1/3 md:w-1/6 float-right">
            Age limit:
            <Select
                className="text-slate-800"
                options={ageFilterOptions}
                onChange={changeAgeFilter}
                value={ageFilter}
            />
        </div>
    )
}

/**
 * State variables
 * @filmList {array} - contains all films
 * @itemList {array} - current page and filtered film elements
 * @ageFilter {object} - selected age filter option
 * @ageFilterOptions {array} - dynamic age filter options from filmList
 * @currentPageIndex {number} - current page index
 * @numberOfPages {number} - number of pages
 * @modalIsOpen {boolean} - control the modal visibility
 */
function HomePage(props) {
    // eslint-disable-next-line no-undef
    const itemsPerPage = process.env.REACT_APP_ITEMS_PER_PAGE
    const filmList = props.filmList
    const [itemList, setItemList] = useState([])
    const [ageFilter, setAgeFilter] = useState({ label: "All", value: "0" })
    const [ageFilterOptions, setAgeFilterOptions] = useState([])
    const [currentPageIndex, setCurrentPageIndex] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState(Math.ceil(filmList.length / itemsPerPage))
    const [isCreate, setIsCreate] = useState(false)
    const [modalIsOpen, setIsOpen] = useState(false)
    const [filmToEdit, setFilmToEdit] = useState({})
    const createModalRef = useRef()
    const dispatch = useDispatch()

    // update page index and set the new page elements
    const changePage = (pageIndex) => {
        setCurrentPageIndex(pageIndex)
        let newList
        if (ageFilter.value === "0") {
            newList = filmList
        } else {
            newList = filmList.filter((item) => ageFilter.value === item.age)
        }
        const limitedItems = newList.slice((pageIndex - 1) * itemsPerPage, pageIndex * itemsPerPage)
        setItemList([...limitedItems])
    }

    // on page load call fetchFilms function
    useEffect(() => {
        dispatch(fetchFilms())
    }, [])

    // run if the age filter / film list changed
    useEffect(() => {
        // filter elements by age to show - "0": show all elements
        let newList
        if (ageFilter.value === "0") {
            newList = filmList
        } else {
            newList = filmList.filter((item) => ageFilter.value === item.age)
        }
        // create dynamic age filter option with labels for AgeClassSelect component
        const ageOptionsCheck = ["0"]
        const ageOptions = [{ label: "All", value: "0" }]
        const values = {
            "1": "No rating",
            "12": "12+",
            "16": "16+",
            "18": "18+"
        }
        filmList.map((item) => {
            if (!ageOptionsCheck.includes(item.age)) {
                ageOptionsCheck.push(item.age)
                ageOptions.push({ label: values[item.age], value: item.age })
            }
        })
        const sortedAgeOptions = ageOptions.sort((a, b) => a.value - b.value)
        // update state
        setAgeFilterOptions(sortedAgeOptions)
        setNumberOfPages(Math.ceil(newList.length / itemsPerPage))
        const limitedItems = newList.slice(0, itemsPerPage)
        setItemList([...limitedItems])
        setCurrentPageIndex(1)
    }, [ageFilter, filmList])

    // update age filter state variable and trigger film list rerender
    const changeAgeFilter = (id) => {
        setAgeFilter(id)
    }

    // delete element
    const deleteItem = (id) => {
        dispatch(removeFilm({ id }))
    }

    // create new film
    const onSubmitCreate = (data) => {
        dispatch(createFilm(data))
        createModalRef.current.resetForm()
        closeModal()
    }

    // edit a film
    const onSubmitEdit = (data) => {
        dispatch(updateFilm(data))
        createModalRef.current.resetForm()
        closeModal()
    }

    // @item {object} - if film object then set the modal to edit mode
    // decide the modal mode (create / edit) - if edit mode, set the film info to edit
    function openModal(item) {
        if (item && item._id) {
            setFilmToEdit(item)
            setIsCreate(false)
        } else {
            setIsCreate(true)
        }
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
        setFilmToEdit({})
    }

    return (
        <div className="mt-8 md:mt-12 pb-20">
            <div className="grid grid-cols-1">
                <div>
                    <Head />
                </div>
                <div className="mb-6">
                    <CreateModal
                        modalIsOpen={modalIsOpen}
                        closeModal={closeModal}
                        onSubmitCreate={onSubmitCreate}
                        onSubmitEdit={onSubmitEdit}
                        isCreate={isCreate}
                        filmToEdit={filmToEdit}
                        createModalRef={createModalRef}
                    />
                    <button onClick={openModal} className="md:mt-3 bg-green-500 group inline-flex items-center justify-center rounded-full">
                        <Plus className="h-10 w-10" />
                    </button>
                    <AgeClassSelect
                        ageFilter={ageFilter}
                        ageFilterOptions={ageFilterOptions}
                        changeAgeFilter={changeAgeFilter}
                    />
                </div>
                <div>
                    <FilmList itemList={itemList} deleteItem={deleteItem} openCreateModal={openModal} />
                </div>
                {filmList.length > itemsPerPage &&
                    <div>
                        <Pagination
                            numberOfPages={numberOfPages}
                            currentPageIndex={currentPageIndex}
                            changePage={changePage}
                        />
                    </div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        filmList: state.filmList,
    }
}

export default connect(mapStateToProps, {
    fetchFilms,
    createFilm,
    removeFilm,
    updateFilm,
})(HomePage)