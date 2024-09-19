import Modal from "react-modal"
import { useForm } from 'react-hook-form'
import { useEffect, useImperativeHandle } from 'react'

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#0f172a",
        width: "50%"
    }
}

/**
 * Component for render film list elements
 * @modalIsOpen {boolean} - control the modal visibility
 * @closeModal {function} - close the modal
 * @onSubmitCreate {function} - submit the form for create - (film object: { title, age, descprition })
 * @createModalRef {ref} - this component ref
 * @isCreate {boolean} - control the which submit function should call (create / edit)
 * @onSubmitEdit {function} - submit the form for edit - (film object: { title, age, descprition })
 * @filmToEdit {object} - load the film informations to the form if the modal is in edit mode
 */

const CreateModal = ({ modalIsOpen, closeModal, onSubmitCreate, createModalRef, isCreate, onSubmitEdit, filmToEdit }) => {
    const defaultValues = {
        title: '',
        age: 0,
        description: '',
        _id: ""
    }
    const { register, handleSubmit, formState: { errors, isValid, touchedFields }, reset, setValue } = useForm({
        defaultValues,
        mode: "onBlur"
    });

    // set the input values if the modal is in edit mode
    useEffect(() => {
        if (filmToEdit) {
            setValue("title", filmToEdit.title)
            setValue("age", filmToEdit.age)
            setValue("description", filmToEdit.description)
            setValue("_id", filmToEdit._id)
        }
    }, [filmToEdit])

    // reset the input if the modal is closed
    const onModalClose = () => {
        reset(defaultValues)
        closeModal()
    }

    // submit the form - call the create or the edit function
    const onSubmit = (data) => {
        if (isCreate) {
            onSubmitCreate(data)
        } else {
            onSubmitEdit(data)
        }
    }

    // after success API call set the input fields to default value
    useImperativeHandle(createModalRef, () => ({
        resetForm() {
            reset(defaultValues)
        }
    }));

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={onModalClose}
                contentLabel={"Add movie"}
                style={customStyles}
                ariaHideApp={false}
            >
                <h1 className="text-2xl md:text-3xl lg:text-4xl mb-2 text-slate-50">
                    Add movie
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col">
                        <label className="text-slate-50 text-left mb-1" htmlFor="title">
                            Title
                        </label>
                        <input id="title" type="text" name="title" placeholder="Title" className={`p-4 border-solid rounded-lg focus:border-white ${touchedFields["title"]
                            ? errors["title"]
                                ? 'bg-red-100'
                                : 'bg-green-100'
                            : `bg-slate-800 text-slate-100 placeholder:text-slate-400`
                            }`} {...register("title", { required: true, maxLength: { value: 100, message: "This field can be a maximum of 100 characters!" } })} />
                        {errors.title && errors.title.message &&
                            <label className="text-red-500 mt-1">
                                {errors.title.message}
                            </label>}

                        <label className="text-slate-50 text-left mb-1 mt-4" htmlFor="age">
                            Age limit classification
                        </label>
                        <select className="p-4 border-solid rounded-lg focus:border-white bg-slate-800 text-slate-100 placeholder:text-slate-400" {...register("age", { required: true })}>
                            <option value="1">No age restriction</option>
                            <option value="12">Suitable for viewers of 12 and over</option>
                            <option value="16">Suitable for viewers of 16 and over</option>
                            <option value="18">Suitable for viewers of 18 and over</option>
                        </select>

                        <label className="text-slate-50 text-left mb-1 mt-4" htmlFor="description">
                            Description
                        </label>
                        <textarea rows={10} id="description" placeholder="Description" className={`p-4 border-solid rounded-lg focus:border-white ${touchedFields["description"]
                            ? errors["description"]
                                ? 'bg-red-100'
                                : 'bg-green-100'
                            : `bg-slate-800 text-slate-100 placeholder:text-slate-400`
                            }`} {...register("description", { required: true, maxLength: { value: 2000, message: "This field can be a maximum of 2000 characters!" } })} />
                        {errors.description && errors.description.message &&
                            <label className="text-red-500 mt-1">
                                {errors.description.message}
                            </label>}

                        <button disabled={!isValid} type="submit" className="bg-green-600 disabled:bg-green-300 text-white font-bold py-2 px-4 rounded-full mb-4 mt-4">
                            {isCreate ? "Create" : "Edit"}
                        </button>
                        <button onClick={onModalClose} className="bg-red-400 text-white font-bold py-2 px-4 rounded-full">
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default CreateModal;