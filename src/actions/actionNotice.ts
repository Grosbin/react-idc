import { useAppDispatch } from "../hooks/useRedux";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../database/firebase";
import {
  addNotice,
  loadNotice,
  removeNotice,
  updateNotice,
  onNoticeActive,
  onCreateNotice,
  onUpdateNotice,
} from "../store/noticeSlice";

export const actionNotice = () => {
  const dispatch = useAppDispatch();

  const startAddNotice = async (notice: {
    title: string;
    description: string;
    date: string | undefined;
  }) => {
    try {
      const docRef = await addDoc(collection(db, "notices"), notice);
      dispatch(addNotice({ id: docRef.id, ...notice }));
    } catch (error) {
      console.error(error);
    }

    // dispatch(addNotice({ ...notice }));
  };

  const startRemoveNotice = async (noticeId: string) => {
    try {
      await deleteDoc(doc(db, "notices", noticeId));
      dispatch(removeNotice(noticeId));
    } catch (error) {
      console.error(error);
    }
  };

  const startUpdateNotice = async (notice: {
    id: string;
    title: string;
    description: string;
    date: string | undefined;
  }) => {
    try {
      await updateDoc(doc(db, "notices", notice.id), notice);
      dispatch(updateNotice(notice));
    } catch (error) {
      console.error(error);
    }
  };

  const startLoadingNotice = async () => {
    try {
      const collectionRef = collection(db, `notices`);
      const docs = await getDocs(collectionRef);

      const notice: Object[] = [];
      docs.forEach((doc) => {
        notice.push({ id: doc.id, ...doc.data() });
      });

      dispatch(loadNotice(notice));
    } catch (error) {
      console.error(error);
    }
  };

  const startOnNoticeActive = (notice: {
    id: string;
    title: string;
    description: string;
    date?: string;
  }) => {
    dispatch(onNoticeActive(notice));
  };

  const startOnCreateNotice = () => {
    dispatch(onCreateNotice());
  };

  const startOnUpdateNotice = () => {
    dispatch(onUpdateNotice());
  };

  return {
    startAddNotice,
    startRemoveNotice,
    startUpdateNotice,
    startLoadingNotice,
    startOnNoticeActive,
    startOnCreateNotice,
    startOnUpdateNotice,
  };
};
