import { url } from "..";
import { notificationActions } from "..";
import { predictionActions } from "..";

export const makePrediction = ({
  subjectId,
  predictedById,
  previousExamMark,
  attendance,
  token,
}) => {
  return async (dispatch) => {
    const response = await fetch(`${url}/api/predictions/make-prediction`, {
      method: "POST",
      body: JSON.stringify({
        subjectId,
        predictedById,
        previousExamMark,
        attendance,
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
      notificationActions.showCardNotification({
        type: "success",
        message: "Prediction made successfully",
      })
    );
    setTimeout(() => {
      dispatch(notificationActions.hideCardNotification());
    }, [5000]);
    // update prediction in store
    await dispatch(
      predictionActions.updatePrediction({
        predictionResults: data.results,
      })
    );
  };
};
