import { createSlice } from 'react-redux/redux-toolkit'

const initialState = ({
    isAuhthenticated : false,
    userData: null
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducer: {
        logIn:  (state, action) => {
            state.isAuhthenticated = true;
            state.userData = userData.action.payload;
        },
        logOut: (state) => {
            state.isAuhthenticated = false;
            state.userData = null;
        }
    }
})

export const { logIn, logOut } = authSlice.action;

export default authSlice.reducer