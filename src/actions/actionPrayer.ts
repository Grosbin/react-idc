import { useAppDispatch } from "../hooks/useRedux";
import {
  addPrayer,
  removePrayer,
  loadPrayer,
  updatePrayer,
  onPrayerActive,
  onCreatePrayer,
  onUpdatePrayer,
} from "../store/prayerSlice";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../database/firebase";

export const actionPrayer = () => {
  const dispatch = useAppDispatch();

  const startAddPrayer = async (prayer: { type: string; names: string[] }) => {
    try {
      const docRef = await addDoc(collection(db, "prayers"), prayer);
      dispatch(addPrayer({ id: docRef.id, ...prayer }));
    } catch (error) {
      console.error(error);
    }
  };

  const startRemovePrayer = async (prayerType: string) => {
    try {
      await deleteDoc(doc(db, "prayers", prayerType));
      dispatch(removePrayer(prayerType));
    } catch (error) {
      console.error(error);
    }
  };

  const startUpdatePrayer = async (prayer: {
    id: string;
    type: string;
    names: string[];
  }) => {
    try {
      await updateDoc(doc(db, "prayers", prayer.id), prayer);
      dispatch(updatePrayer(prayer));
    } catch (error) {
      console.error(error);
    }
  };

  const startLoadingPrayer = async () => {
    try {
      const collectionRef = collection(db, `prayers`);
      const docs = await getDocs(collectionRef);
      const prayer: Object[] = [];
      docs.forEach((doc) => {
        prayer.push({ id: doc.id, ...doc.data() });
      });

      console.log("prayers", prayer);
      dispatch(loadPrayer(prayer));
    } catch (error) {
      console.error(error);
    }
  };

  const startOnPrayerActive = (prayer: {
    id: string;
    type: string;
    names: string[];
  }) => {
    dispatch(onPrayerActive(prayer));
  };

  const startOnCreatePrayer = () => {
    dispatch(onCreatePrayer());
  };

  const startOnUpdatePrayer = () => {
    dispatch(onUpdatePrayer());
  };

  return {
    startAddPrayer,
    startRemovePrayer,
    startUpdatePrayer,
    startLoadingPrayer,
    startOnPrayerActive,
    startOnCreatePrayer,
    startOnUpdatePrayer,
  };
};
