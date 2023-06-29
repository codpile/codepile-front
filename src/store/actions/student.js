import { url } from "..";
import { notificationActions } from "..";
import { studentActions } from "..";

export const addStudent = ({
  addById,
  firstName,
  lastName,
  gender,
  age,
  district,
  region,
}) => {
  return async (dispatch) => {
    const response = await fetch(`${url}/api/students/add-student`, {
      method: "POST",
      body: JSON.stringify({
        addById,
        firstName,
        lastName,
        gender,
        age,
        district,
        region,
      }),
      headers: {
        "Content-type": "application/json",
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
      authActions.authenticate({
        token: data.token,
        user: data.user,
      })
    );
    saveDataToStorage(data);
  };
};
