import { useAppDispatch } from "../hooks/useRedux";
import { addMember, removeMember, loadMember } from "../store/memberSlice";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../database/firebase";

export const actionMember = () => {
  const dispatch = useAppDispatch();

  const startAddMember = async (member: { type: string; names: string[] }) => {
    try {
      const docRef = await addDoc(collection(db, "members"), member);
      dispatch(addMember({ id: docRef.id, ...member }));
    } catch (error) {
      console.error(error);
    }
  };

  const startRemoveMember = async (memberType: string) => {
    try {
      await deleteDoc(doc(db, "members", memberType));
      dispatch(removeMember(memberType));
    } catch (error) {
      console.error(error);
    }
  };

  const startLoadingMember = async () => {
    try {
      const collectionRef = collection(db, `members`);
      const docs = await getDocs(collectionRef);
      const member: Object[] = [];
      docs.forEach(doc => {
        member.push({ id: doc.id, ...doc.data() });
      });

      dispatch(loadMember(member));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    startAddMember,
    startRemoveMember,
    startLoadingMember,
  };
};
