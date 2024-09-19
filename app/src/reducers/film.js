import {
  FETCH_FILMS,
  UPDATE_FILM,
  REMOVE_FILM,
  CREATE_FILM,
} from "../actions/filmTypes"

function filmReducer(filmList = [], action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_FILMS:
      return payload

    case UPDATE_FILM:
      return filmList.map((film) => {
        if (film._id !== payload._id) {
          return film
        }
        return {
          ...film,
          ...payload,
        }
      })

    case CREATE_FILM:
      return [...filmList, payload]

    case REMOVE_FILM:
      return filmList.filter(({ _id }) => _id !== payload.id)

    default:
      return filmList
  }
}

export default filmReducer