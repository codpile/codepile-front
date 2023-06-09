import { url } from "..";
import { authActions } from "..";
import { notificationActions } from "..";

export const logOut = () => {
  localStorage.clear();
  return async (dispatch) => {
    await dispatch(authActions.logout());
  };
};

const saveDataToStorage = (auth) => {
  localStorage.setItem("auth", JSON.stringify(auth));
};

export const authenticate = (user, token) => {
  return async (dispatch) => {
    await dispatch(authActions.authenticate({ token: token, user: user }));
    //  TODO: dispatch action to update expiry time to the logout timer
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(`${url}/api/users/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
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
      notificationActions.showCardNotification({
        type: "success",
        message: "Log in successful",
      })
    );
    setTimeout(() => {
      dispatch(notificationActions.hideCardNotification());
    }, [5000]);

    await dispatch(
      authActions.authenticate({
        token: data.token,
        user: data.user,
      })
    );
    saveDataToStorage(data);
  };
};

export const signup = (userName, email, password) => {
  return async (dispatch) => {
    const response = await fetch(`${url}/api/users/signup`, {
      method: "POST",
      body: JSON.stringify({
        userName: userName,
        email,
        password,
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
      notificationActions.showCardNotification({
        type: "success",
        message: "Sign up successful",
      })
    );
    setTimeout(() => {
      dispatch(notificationActions.hideCardNotification());
    }, [5000]);

    await dispatch(
      authActions.authenticate({
        token: data.token,
        user: data.user,
      })
    );
    saveDataToStorage(data);
  };
};

export const forgotPassword = (email) => {
  return async (dispatch) => {
    const response = await fetch(`${url}/api/users/forgot-password`, {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch(
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
    dispatch(
      notificationActions.showCardNotification({
        type: "success",
        message: data.message,
      })
    );
    setTimeout(() => {
      dispatch(notificationActions.hideCardNotification());
    }, [5000]);
  };
};

export const resetPassword = (password, passwordResetToken) => {
  return async (dispatch) => {
    const response = await fetch(
      `${url}/api/users/reset-password/${passwordResetToken}`,
      {
        method: "POST",
        body: JSON.stringify({
          password,
        }),
        headers: {
          "Content-type": "application/json",
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
    await dispatch(
      authActions.authenticate({
        token: data.token,
        user: data.user,
      })
    );
    saveDataToStorage(data);
  };
};

export const updatePassword = (userId, currentPassword, newPassword, token) => {
  return async (dispatch) => {
    const response = await fetch(`${url}/api/users/update-password`, {
      method: "POST",
      body: JSON.stringify({ userId, currentPassword, newPassword }),
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

    await dispatch(
      notificationActions.showCardNotification({
        type: "success",
        message: "password update successful",
      })
    );
    setTimeout(() => {
      dispatch(notificationActions.hideCardNotification());
    }, [5000]);
  };
};

export const updateProfile = (userId, userName, email, token) => {
  return async (dispatch) => {
    const response = await fetch(`${url}/api/users/update-profile`, {
      method: "POST",
      body: JSON.stringify({ userId, userName, email }),
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
    await dispatch(
      notificationActions.showCardNotification({
        type: "success",
        message: "Profile update successful",
      })
    );
    setTimeout(() => {
      dispatch(notificationActions.hideCardNotification());
    }, [5000]);
    const data = await response.json();
    localStorage.removeItem("userData");
    // update user data in the store
    await dispatch(
      authActions.authenticate({
        token: token,
        user: data.user,
      })
    );
    saveDataToStorage(data.user, data.token);
  };
};

export const uploadPhoto = (userId, photo, token) => {
  return async (dispatch) => {
    let formData = new FormData();
    formData.append("photo", photo);

    const response = await fetch(`${url}/api/users/upload-photo/${userId}`, {
      method: "POST",
      body: formData,
      headers: {
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
    await dispatch(
      notificationActions.showCardNotification({
        type: "success",
        message: "Image upload successful",
      })
    );
    setTimeout(() => {
      dispatch(notificationActions.hideCardNotification());
    }, [5000]);
    const data = await response.json();

    await dispatch(
      authActions.authenticate({
        token: token,
        user: data.user,
      })
    );
    saveDataToStorage(data.user, data.token);
  };
};
