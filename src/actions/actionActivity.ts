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
  addActivity,
  loadActivity,
  removeActivity,
  updateActivity,
  onActivityActive,
  onCreateActivity,
  onUpdateActivity,
} from "../store/activitySlice";

export const actionActivity = () => {
  const dispatch = useAppDispatch();

  const startAddActivity = async (activity: {
    day: string;
    hour: string;
    title: string;
    description: string;
    date: string | undefined;
  }) => {
    // if (activity.description === undefined) {
    //   activity.description = "";
    // }

    try {
      const docRef = await addDoc(collection(db, "activities"), activity);
      // const docDate = activity.date?.toString();
      dispatch(addActivity({ id: docRef.id, ...activity }));
    } catch (error) {
      console.error(error);
    }

    // dispatch(addActivity(activity));
  };

  const startRemoveActivity = async (activityId: string) => {
    try {
      await deleteDoc(doc(db, "activities", activityId));
      dispatch(removeActivity(activityId));
    } catch (error) {
      console.error(error);
    }
  };

  const startUpdateActivity = async (activity: {
    id: string;
    day: string;
    hour: string;
    title: string;
    description: string;
  }) => {
    try {
      await updateDoc(doc(db, "activities", activity.id), activity);
      dispatch(updateActivity(activity));
    } catch (error) {
      console.error(error);
    }
  };

  const startLoadingActivity = async () => {
    try {
      const collectionRef = collection(db, `activities`);
      const docs = await getDocs(collectionRef);

      const activity: Object[] = [];
      docs.forEach((doc) => {
        activity.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      dispatch(loadActivity(activity));
    } catch (error) {
      console.error(error);
    }
  };

  const startOnActivityActive = (activity: {
    id: string;
    day: string;
    hour: string;
    title: string;
    description: string;
  }) => {
    dispatch(onActivityActive(activity));
  };

  const startOnCreateActivity = () => {
    dispatch(onCreateActivity());
  };

  const startOnUpdateActivity = () => {
    dispatch(onUpdateActivity());
  };

  return {
    startAddActivity,
    startRemoveActivity,
    startUpdateActivity,
    startLoadingActivity,
    startOnActivityActive,
    startOnCreateActivity,
    startOnUpdateActivity,
  };
};
