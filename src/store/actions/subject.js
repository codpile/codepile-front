import { url } from "..";
import { notificationActions } from "..";
import { subjectActions } from "..";

export const getAllSubjects = (token) => {
  return async (dispatch) => {
    const response = await fetch(`${url}/api/subjects/get-all-subjects`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      await dispatch(
        notificationActions.showCardNotification({
          type: "error",
          message: error.message,
        })
      );
      setTimeout(() => {
        dispatch(notificationActions.hideCardNotification());
      }, [5000]);
      throw new Error(error.message);
    }

    const data = await response.json();

    // update subjects in store
    await dispatch(
      subjectActions.updateSubjects({
        subjects: data.data,
      })
    );
  };
};

export const addSubject = (subjectName, token) => {
  return async (dispatch) => {
    const response = await fetch(`${url}/api/subjects/add-subject`, {
      method: "POST",
      body: JSON.stringify({
        subjectName,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      await dispatch(
        notificationActions.showCardNotification({
          type: "error",
          message: error.message,
        })
      );
      setTimeout(() => {
        dispatch(notificationActions.hideCardNotification());
      }, [5000]);
      throw new Error(error.message);
    }

    const data = await response.json();
    await dispatch(
      subjectActions.addOne({
        subjects: data.data,
      })
    );
  };
};
