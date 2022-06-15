import BooksList from "components/app/DiscoverBooksScreen/BooksList";
import SearchBooks from "components/app/DiscoverBooksScreen/SearchBooks";
import Header from "components/lib/Header";
import { Container, Stack } from "components/lib/Layout";
import Logo from "components/logo";
import * as React from "react";
import { SearchResult } from "types/DiscoverBooksScreenTypes";
import { BaseComponentStatuses } from "types/types";

type dicoverBooksReducerAction = {
  type: "RESOLVE" | "REJECT" | "SET_PENDING";
  payload?: {
    error?: Error;
    data?: SearchResult;
  };
};

type DiscoverBooksState = {
  status: BaseComponentStatuses;
  error?: Error;
  data?: SearchResult;
};

function discoverBooksReducer(
  state: DiscoverBooksState,
  action: dicoverBooksReducerAction
): DiscoverBooksState {
  switch (action.type) {
    case "SET_PENDING": {
      return { status: "PENDING", data: undefined, error: undefined };
    }
    case "RESOLVE": {
      return {
        status: "RESOLVED",
        data: action.payload?.data,
        error: undefined,
      };
    }
    case "REJECT": {
      return {
        status: "REJECTED",
        error: action.payload?.error,
        data: undefined,
      };
    }
    default:
      return state;
  }
}

const discoverBooksDefaultState: DiscoverBooksState = {
  status: "IDLE",
};
function DiscoverBooksScreen() {
  const [state, dispatch] = React.useReducer<typeof discoverBooksReducer>(
    discoverBooksReducer,
    discoverBooksDefaultState
  );

  const setResolved = React.useCallback((data: SearchResult) => {
    dispatch({ type: "RESOLVE", payload: { data } });
  }, []);

  const setRejected = React.useCallback((error: Error) => {
    dispatch({ type: "REJECT", payload: { error } });
  }, []);

  const setPending = React.useCallback(() => {
    dispatch({ type: "SET_PENDING" });
  }, []);

  // TODO: Add pagination
  // TODO: Add result count

  return (
    <div className="w-full h-full relative px-2 text-sm">
      <Header
        Logo={<Logo className="max-h-8 md:max-h-12" />}
        userName="Habibullah"
        userProfileIMG="profile.jpg"
      />
      <Container className={`p1 pt-3 mt-14`}>
        <Stack
          direction="horizontal"
          gap={12}
          className="grid-cols-4 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12"
        >
          <main
            className="col-span-4 col-start-1 sm:col-span-6 sm:col-start-2 md:col-span-8 md:col-start-2 lg:col-span-10 lg:col-start-2"
            id="discover"
          >
            <Stack direction="vertical" gap={6} className="max-w-full">
              <h2 className="text-center">Discover Books Here</h2>
              <SearchBooks
                status={state.status}
                setPending={setPending}
                setRejected={setRejected}
                setResolved={setResolved}
              />
              <BooksList result={state.data} status={state.status} />
            </Stack>
          </main>
        </Stack>
      </Container>
    </div>
  );
}

export default DiscoverBooksScreen;
