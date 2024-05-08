import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  members: { id: string; name: string }[];
  onCreateMember: boolean;
}

const initialState: initialStateType = {
  members: [],
  onCreateMember: true,
};

export const memberReducer = createSlice({
  name: "member",
  initialState,
  reducers: {
    addMember: (state, action) => {
      state.members = [...state.members, action.payload];
    },
    removeMember: (state, action) => {
      state.members = state.members.filter(
        member => member.id !== action.payload
      );
    },
    updateMember: (state, action) => {
      state.members = state.members.map(member =>
        member.id === action.payload.id ? action.payload : member
      );
    },
    loadMember: (state, action) => {
      state.members = action.payload;
    },
  },
});

export const { addMember, removeMember, loadMember, updateMember } =
  memberReducer.actions;
