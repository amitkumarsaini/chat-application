import { createSlice } from "@reduxjs/toolkit";
import { dummyChatMessages, dummyProfile, dummyUserList } from "../../utils/constant";

/**USER DETAILS SLICE */
export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        myProfile: dummyProfile,
        userList: dummyUserList,
        activeChat: dummyUserList[0],
        chatMessages: dummyChatMessages
    },

    reducers: {
        setUserList: (state, param) => {
            const { payload } = param;
            state.userList = payload;
        },
        setActiveChat: (state, param) => {
            const { payload } = param;
            state.activeChat = payload;
        },
        setChatMessages: (state, param) => {
            const { payload } = param;
            state.chatMessages = payload;
        },
    }
})

/**ACTIONS FOR SLICE*/
export const { setUserList, setActiveChat, setChatMessages } = UserSlice.actions

