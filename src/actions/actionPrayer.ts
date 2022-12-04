import { useAppDispatch } from "../hooks/useRedux";
import { addPrayer, removePrayer, loadPrayer } from "../store/prayerSlice";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../database/firebase";

export const actionPrayer = () => {
  const dispatch = useAppDispatch();

  const startAddPrayer = async (prayer: { type: string; names: string[] }) => {
    // try {
    //   const docRef = await addDoc(collection(db, "prayers"), prayer);
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    // 	console.error("Error adding document: ", e);
    // }
    dispatch(addPrayer(prayer));
  };

  const startRemovePrayer = (prayerType: string) => {
    dispatch(removePrayer(prayerType));
  };

  const startLoadingPrayer = async () => {
    const collectionRef = collection(db, `prayers`);
    const docs = await getDocs(collectionRef);

    const prayer: Object[] = [];
    docs.forEach((doc) => {
      prayer.push({ id: doc.id, ...doc.data() });
    });
    console.log(prayer, "prayer");
    dispatch(loadPrayer(prayer));
    return prayer;
  };

  return {
    startAddPrayer,
    startRemovePrayer,
    startLoadingPrayer,
  };
};
