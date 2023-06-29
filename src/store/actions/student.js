import { url } from "..";
import { notificationActions } from "..";
import { studentActions } from "..";

export const addStudent = ({
  addedById,
  firstName,
  lastName,
  gender,
  age,
  district,
  region,
  token,
}) => {
  return async (dispatch) => {
    const response = await fetch(`${url}/api/students/add-student`, {
      method: "POST",
      body: JSON.stringify({
        addedById,
        firstName,
        lastName,
        gender,
        age,
        district,
        region,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
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

    await dispatch(studentActions.addStudent({ student: data.data }));
    await dispatch(
      notificationActions.showCardNotification({
        type: "success",
        message: data.message,
      })
    );
    setTimeout(() => {
      dispatch(notificationActions.hideCardNotification());
    }, [5000]);
    saveDataToStorage(data);
  };
};
