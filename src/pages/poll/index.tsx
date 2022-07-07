import React, { useMemo, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@hooks";
import { getPoll, pollsSlice, vote } from "@store";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const color = () => {
  return `#${Math.random().toString(16).slice(2, 8)}`;
};

const CustomDoughnut = React.memo(Doughnut, (prev, next) => {
  return prev.data.labels === next.data.labels;
});

export function Poll() {
  const { enqueueSnackbar } = useSnackbar();
  let answers = null;
  const { id } = useParams<{ id: string }>();
  const { currentPoll, voatingError } = useAppSelector(
    (state) => state.pollsReducer
  );
  const dispatch = useAppDispatch();
  const colors = useRef<string[]>();
  let data: any = null;
  let leader = {
    votes: 0,
    option: "",
  };

  useEffect(() => {
    dispatch(getPoll({ id: id as string }));
  }, []);

  useEffect(() => {
    if (voatingError) {
      enqueueSnackbar(voatingError, { variant: "error" });
      dispatch(pollsSlice.actions.hideVotingError());
    }
  }, [voatingError]);

  if (currentPoll?.options !== undefined) {
    colors.current = currentPoll.options.map(() => color());
    data = {
      labels: currentPoll.options.map((option) => option.option),
      datasets: [
        {
          label: currentPoll.question,
          backgroundColor: colors.current,
          borderColor: "transparent",
          data: currentPoll.options.map((option) => option.votes),
        },
      ],
    };

    currentPoll.options.map(function (option) {
      if (option.votes > leader.votes) {
        leader.votes = option.votes;
        leader.option = option.option;
      }
    });

    answers = currentPoll.options.map((option) => (
      <button
        key={option._id}
        onClick={() =>
          dispatch(
            vote({
              answer: [option.option],
              id: id as string,
              question: currentPoll.question,
              options: currentPoll.options.map((el) => el.option),
            })
          )
        }
      >
        {option.option} : {option.votes}
      </button>
    ));
  }

  console.log(data);

  if (!currentPoll || currentPoll._id !== id) return <div>загрузка...</div>;

  return (
    <div className="poll">
      <h1 className="poll__title">{currentPoll?.question}</h1>
      {currentPoll?.user ? (
        <h3 className="poll__title__author">
          Автор: <b>{currentPoll.user.username} </b>{" "}
        </h3>
      ) : null}
      <div className="poll__content">
        <div className="poll__content__main">
          <div className="poll__content__answers">{answers}</div>
          {leader.option ? (
            <h2 className="poll__title">Побеждает вариант {leader.option}</h2>
          ) : null}
        </div>
        <div className="poll__content__graph">
          <CustomDoughnut data={data} />
        </div>
      </div>
    </div>
  );
}
export default Poll;
