import React from "react";
import { Link } from "react-router-dom";
import AvatarCard from "../components/AvatarCard";
import Layout from "../components/Layout";
import { Heading } from "../components/common";
import DisplayModeToggle, {
  DISPLAY_MODE_TREE,
  DISPLAY_MODE_LIST
} from "../components/DisplayModeToggle";
import { List, ListFlat, ListItem, ListItemContent } from "../components/List";

const BASE_ENDPOINT =
  "https://additivasia-api.glitch.me/api/v1/assignment/employees";

function getAllSubordinates(personnel, personnelMap) {
  const meta = personnelMap[personnel];
  const loaded = typeof meta !== "undefined";
  const subordinates = loaded ? personnelMap[personnel].subordinates : [];
  return loaded
    ? [].concat(
        ...subordinates.map(x => [x, ...getAllSubordinates(x, personnelMap)])
      )
    : [];
}

function getUniqueSubordinates(personnel, personnelMap) {
  return [...new Set(getAllSubordinates(personnel, personnelMap))];
}

function PersonnelListItem(props) {
  const { name, depth = 0, personnelMap, isLastItem } = props;
  const [isExpanded, setIsExpanded] = React.useState(true);
  const meta = personnelMap[name];
  const loaded = typeof meta !== "undefined";
  const subordinates = loaded ? personnelMap[name].subordinates : [];
  const hasSubordinates = subordinates.length > 0;
  let description = loaded ? meta.role : "loading...";
  if (depth === 0 && loaded) {
    const uniqueSubordinates = getUniqueSubordinates(name, personnelMap);
    description = `${description} - Subordinates: ${uniqueSubordinates.length}`;
  }

  const ItemWrapper = depth === 0 ? "div" : ListItem;
  const wrapperProps = depth === 0 ? {} : { isLastItem };

  return (
    <>
      <ItemWrapper {...wrapperProps}>
        <AvatarCard
          name={name}
          description={description}
          url={`/${encodeURIComponent(name)}`}
          isExpanded={isExpanded}
          expandable={hasSubordinates}
          onToggle={() => setIsExpanded(expanded => !expanded)}
        />
      </ItemWrapper>
      {hasSubordinates ? (
        <List isExpanded={isExpanded} showTreeBranch={depth < 1 || isLastItem}>
          {subordinates.map((x, idx) => {
            const isLastItem = idx === subordinates.length - 1;
            return (
              <ListItemContent key={x}>
                <PersonnelListItem
                  name={x}
                  personnelMap={personnelMap}
                  depth={depth + 1}
                  isLastItem={isLastItem}
                />
              </ListItemContent>
            );
          })}
        </List>
      ) : null}
    </>
  );
}

function PersonnelOverviewTreeView(props) {
  const { name, personnelMap } = props;
  const heading = `${name}'s Subordinates Tree`;

  return (
    <>
      <Heading>{heading}</Heading>
      <PersonnelListItem name={name} personnelMap={personnelMap} />
    </>
  );
}

function PersonnelOverviewListView(props) {
  const { name, personnelMap } = props;
  const uniqueSubordinates = getUniqueSubordinates(name, personnelMap);
  const heading = `${name}'s Subordinates (${uniqueSubordinates.length})`;

  return (
    <>
      <Heading>{heading}</Heading>
      <ListFlat>
        {uniqueSubordinates.map(x => (
          <ListItemContent key={x}>
            <AvatarCard
              key={x}
              name={x}
              description={
                personnelMap[x] ? personnelMap[x].role : "loading..."
              }
            />
          </ListItemContent>
        ))}
      </ListFlat>
    </>
  );
}

function PersonnelOverview(props) {
  const {
    match: {
      params: { personnelName }
    }
  } = props;

  const [loadingState, setLoadingState] = React.useState({
    isInitialLoading: true,
    loadingError: null
  });
  const [personnelMap, setPersonnelMap] = React.useState({});
  const [displayMode, setDisplayMode] = React.useState(DISPLAY_MODE_TREE);

  React.useEffect(() => {
    let mounted = true;

    async function doFetch(personnel) {
      const endpoint = `${BASE_ENDPOINT}/${encodeURIComponent(personnel)}`;
      let loadingError = null;
      try {
        const response = await fetch(endpoint);
        if (response.status >= 200 && response.status < 300) {
          const results = await response.json();
          const [role, meta] = results;
          const subordinates = meta ? meta["direct-subordinates"] || [] : [];
          if (mounted) {
            setPersonnelMap(map => ({
              ...map,
              [personnel]: {
                role,
                subordinates
              }
            }));
          }
          subordinates.forEach(doFetch);
        } else {
          var error = new Error(response.statusText || response.status);
          error.response = response;
          throw error;
        }
      } catch (e) {
        loadingError = e;
      } finally {
        if (mounted) {
          // Only update for first loading
          setLoadingState(prevState => {
            if (prevState.isInitialLoading) {
              return {
                isInitialLoading: false,
                loadingError
              };
            } else {
              // Do not update status and prevent rerender
              return prevState;
            }
          });
        }
      }
    }

    // Set initial loading state when effect is rerun
    if (mounted) {
      setLoadingState(prevState => {
        if (prevState.isInitialLoading && prevState.loadingError === null) {
          return prevState;
        } else {
          return {
            isInitialLoading: true,
            loadingError: null
          };
        }
      });
    }

    doFetch(personnelName);

    return () => {
      mounted = false;
    };
  }, [personnelName]);

  let view = null;
  const displayModeProps = { displayMode, setDisplayMode };

  if (loadingState.isInitialLoading) {
    view = <AvatarCard description="loading..." />;
  } else if (loadingState.loadingError !== null) {
    view = (
      <>
        <Heading>Error</Heading>
        <p>Unable to fetch subordinates of "{personnelName}"</p>
        <p>
          <Link to={`/${encodeURIComponent("John Hartman")}`}>
            Try "John Hartman"?
          </Link>
        </p>
      </>
    );
  } else if (displayMode === DISPLAY_MODE_TREE) {
    view = (
      <>
        <DisplayModeToggle {...displayModeProps} />
        <PersonnelOverviewTreeView
          name={personnelName}
          personnelMap={personnelMap}
        />
      </>
    );
  } else if (displayMode === DISPLAY_MODE_LIST) {
    view = (
      <>
        <DisplayModeToggle {...displayModeProps} />
        <PersonnelOverviewListView
          name={personnelName}
          personnelMap={personnelMap}
        />
      </>
    );
  }

  return <Layout contentSize="sm">{view}</Layout>;
}

export default PersonnelOverview;
