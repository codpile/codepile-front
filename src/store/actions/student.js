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

export const updateStudent = (studentObj) => {
  localStorage.setItem("student", JSON.stringify(studentObj));

  return async (dispatch) => {
    await dispatch(studentActions.updateStudent(studentObj));
  };
};

export const getAllStudentsByUser = (addedById, token) => {
  return async (dispatch) => {
    const response = await fetch(
      `${url}/api/students/get-students-by-user/${addedById}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
    console.log("All students data");
    console.log(data);
    await dispatch(studentActions.update({ students: data.data }));
    return data;
  };
};

export const getStudent = (studentId, token) => {
  return async (dispatch) => {
    const response = await fetch(
      `${url}/api/students/get-student/${studentId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
    await dispatch(studentActions.updateStudent(data.data));
  };
};
