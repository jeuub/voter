import { Poll } from "@consts";
import { useAppDispatch, useAppSelector } from "@hooks";
import { getPolls } from "@store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Polls() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [search, setSearch] = useState<string | null | undefined>(undefined);
  const [onlyUsersPollsMode, setOnlyUsersPollsMode] = useState<boolean>(false);
  const MAX_POLLS = 6;
  const { polls } = useAppSelector((state) => state.pollsReducer);
  const { user } = useAppSelector((state) => state.userReducer);
  useEffect(() => {
    !polls && dispatch(getPolls());
  }, []);
  const handleSelect = (id: string) => {
    navigate(`${id}`);
  };

  const filtration = (el: Poll) => {
    return search
      ? el.created.includes(search as string) ||
          el.question.includes(search as string) ||
          el.user.username.includes(search as string)
      : el;
  };

  const userPollsFiltration = (el: Poll) => {
    console.log(el.user._id);
    if (!onlyUsersPollsMode) return true;
    return el.user._id === user?.id;
  };

  const pages =
    polls?.filter(userPollsFiltration)?.filter(filtration)?.length &&
    Math.ceil(
      polls?.filter(filtration)?.filter(userPollsFiltration)?.length / MAX_POLLS
    );

  let pageButtons = [];

  for (let i = 0; i < Number(pages); i++) {
    pageButtons.push(i);
  }

  const filteredPolls = polls
    ?.filter(filtration)
    ?.filter(userPollsFiltration)
    .filter(
      (_, idx) =>
        idx < MAX_POLLS * activePage && idx > (activePage - 1) * MAX_POLLS - 1
    );

  return (
    <main>
      <div className="polls__filtration">
        <div className="polls__options">
          <input
            id="pollsOwner_all"
            defaultChecked
            type="radio"
            name="pollsOwner"
          />
          <label
            htmlFor="pollsOwner_all"
            onClick={() => setOnlyUsersPollsMode(false)}
          >
            Все голосования
          </label>

          <input id="pollsOwner_my" type="radio" name="pollsOwner" />
          <label
            htmlFor="pollsOwner_my"
            onClick={() => setOnlyUsersPollsMode(true)}
          >
            Мои голосования
          </label>
        </div>
        <div className="searchbox">
          <label
            style={{
              width: search === undefined ? 0 : "200px",
              overflow: "hidden",
              transition: ".3s",
            }}
          >
            <input
              className="search-input"
              type="text"
              placeholder="Найти"
              style={{ maxWidth: "100%" }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
          </label>

          <button
            onClick={() => setSearch(search === undefined ? "" : undefined)}
          >
            Поиск
          </button>
        </div>
      </div>

      <section className="polls">
        {!filteredPolls?.length && search && (
          <h2>Опросов по данному запросу не найдено</h2>
        )}
        <ul className="polls__container">
          {filteredPolls?.map((poll) => (
            <li
              className="polls__container__poll"
              onClick={() => handleSelect(poll._id)}
              key={poll._id}
            >
              Название: {poll.question}
              <br />
              {poll.user.username ? (
                <span>Автор: {poll.user.username}</span>
              ) : null}
              <br />
              Участников опроса: {poll.voted.length}
              <div>{new Date(poll.created).toLocaleDateString()}</div>
            </li>
          ))}
        </ul>
        <div className="paginate-buttons">
          <button
            disabled={activePage === 1}
            onClick={() => setActivePage(activePage - 1)}
          >
            {"<"}{" "}
          </button>
          {pageButtons.map((el) => (
            <button
              disabled={el + 1 === activePage}
              onClick={() => setActivePage(el + 1)}
            >
              {el + 1}
            </button>
          ))}
          <button
            disabled={activePage === pages}
            onClick={() => setActivePage(activePage + 1)}
          >
            {">"}
          </button>
        </div>
      </section>
    </main>
  );
}
