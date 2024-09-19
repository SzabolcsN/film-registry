import { UPDATE_THEME } from "../actions/themeTypes"
  
  function themeReducer(theme = "dark", action) {
    const { type } = action

    switch (type) {
      case UPDATE_THEME:
        return theme === "dark" ? "light" : "dark"
    
      default:
        return "dark"
    }
  }
  
  export default themeReducer