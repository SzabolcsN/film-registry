import { UPDATE_THEME } from "./themeTypes"

export const updateTheme = () => async dispatch => {
    try {
        return dispatch({
            type: UPDATE_THEME
        })
    } catch (err) {
        console.log(err)
    }
}