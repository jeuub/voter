import { useEffect, useState } from "react";
import { createPoll, pollsSlice } from "@store";
import { useAppDispatch, useAppSelector } from "@hooks";
import { useSnackbar } from "notistack";

export function CreatePoll() {
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { createPollLoading, createPollError, createPollSuccess } =
    useAppSelector((state) => state.pollsReducer);
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuestion(e.target.value);

  const handleAnswerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newOptions = [...options];
    newOptions[id] = e.target.value;
    console.log(newOptions);
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createPoll({ options, question }));
  };

  const optionsLayout = options?.map((options, idx) => (
    <label key={idx}>
      Вариант №{idx + 1}:
      <input
        type="text"
        required
        value={options}
        onChange={(e) => handleAnswerChange(e, idx)}
      />
    </label>
  ));

  useEffect(() => {
    if (createPollError) {
      enqueueSnackbar(createPollError);
      dispatch(pollsSlice.actions.hideCreatePollError());
    }
  }, [createPollError]);

  useEffect(() => {
    if (createPollSuccess) {
      enqueueSnackbar("Опрос успешно создан", { variant: "success" });
      setQuestion("");
      setOptions([]);
      dispatch(pollsSlice.actions.removeCreatePollSuccess());
    }
  }, [createPollSuccess]);

  return (
    <form className="create_poll" onSubmit={handleSubmit}>
      <h2>Задайте вопрос</h2>
      <label>
        Вопрос:
        <input
          type="text"
          required
          name="question"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Введите вопрос"
        />
      </label>
      <h2>Введите варианты ответов</h2>
      {optionsLayout}
      <button
        type="button"
        onClick={() => setOptions(options && options.slice(0, -1))}
      >
        Убрать вариант
      </button>
      <button
        type="button"
        onClick={() => setOptions(options && [...options, ""])}
      >
        Добавить вариант
      </button>
      <button
        disabled={
          !question ||
          !options.every((el) => el.length) ||
          createPollLoading ||
          options.length < 2
        }
        type="submit"
      >
        {createPollLoading ? "Загрузка..." : "Создать"}
      </button>
    </form>
  );
}
