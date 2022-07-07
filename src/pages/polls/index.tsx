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
  const MAX_POLLS = 6;
  const { error, loading, polls } = useAppSelector(
    (state) => state.pollsReducer
  );
  useEffect(() => {
    !polls && dispatch(getPolls());
  }, []);
  const handleSelect = (id: string) => {
    navigate(`polls/${id}`);
  };

  const filtration = (el: Poll) => {
    return search
      ? el.created.includes(search as string) ||
          el.question.includes(search as string) ||
          el.user.username.includes(search as string)
      : el;
  };

  const pages =
    polls?.filter(filtration)?.length &&
    Math.ceil(polls?.filter(filtration)?.length / MAX_POLLS);

  let pageButtons = [];

  for (let i = 0; i < Number(pages); i++) {
    pageButtons.push(i);
  }

  return (
    <main>
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
        }}
      >
        <label
          style={{
            width: search === undefined ? 0 : "170px",
            overflow: "hidden",
            transition: ".3s",
          }}
        >
          <input
            className="search-input"
            type="text"
            placeholder="Найти"
            style={{ maxWidth: "170px" }}
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
      <section className="polls">
        <ul className="polls__container">
          {polls
            ?.filter(filtration)
            .filter(
              (_, idx) =>
                idx < MAX_POLLS * activePage &&
                idx > (activePage - 1) * MAX_POLLS - 1
            )
            ?.map((poll) => (
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
          {activePage !== 1 && (
            <button onClick={() => setActivePage(activePage - 1)}>
              {"<"}{" "}
            </button>
          )}
          {pageButtons.map((el) => (
            <button
              disabled={el + 1 === activePage}
              onClick={() => setActivePage(el + 1)}
            >
              {el + 1}
            </button>
          ))}
          {activePage !== pages && (
            <button onClick={() => setActivePage(activePage + 1)}>
              {">"}{" "}
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
