import React, { forwardRef, useCallback, useMemo } from "react";
import { FixedSizeList as List, areEqual } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import { useStore } from "../../Store/store";
import TrackResult from "../TrackResult/TrackResult";
import { StyledOuterTop } from "../InfiniteLoader/InfiniteLoaderStyle";
import { useHeight } from "../InfiniteLoader/useHeight";
import InnerElement from "../InfiniteLoader/InnerElement";

const OuterElement = forwardRef(({ children, style, onScroll }, ref) => {
  const open = useStore((state) => state.searchTracksOpen);
  return (
    <StyledOuterTop onScroll={onScroll} open={open} height={style.height}>
      {children.props.children.length ? children : <>No Results Found</>}
    </StyledOuterTop>
  );
});

const Row = React.memo(function Row(props) {
  const setSearchSong = useStore((state) => state.setSearchSong);
  const { data, index, style } = props;
  const item = data.items[index];
  if (!item) return null;
  const key = item.id;
  return (
    <TrackResult
      key={key}
      track={item}
      top={style.top}
      selectSong={setSearchSong}
    />
  );
}, areEqual);

export default function SearchTracks() {
  const searchTracks = useStore((state) => state.searchTracks);

  const hasNextPage = useStore((state) => !state.searchFinised);
  const loadMoreItems = useStore((state) => state.searchLoadNextPage);

  const isItemLoaded = useCallback(
    (index) => !hasNextPage || index < searchTracks.length,
    [hasNextPage, searchTracks]
  );

  const itemCount = useMemo(() => {
    return hasNextPage ? searchTracks.length + 1 : searchTracks.length;
  }, [hasNextPage, searchTracks]);

  const height = useHeight();

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
      threshold={5}
    >
      {({ onItemsRendered, ref }) => (
        <List
          ref={ref}
          height={height}
          itemCount={itemCount}
          itemSize={67}
          onItemsRendered={onItemsRendered}
          outerElementType={OuterElement}
          innerElementType={InnerElement}
          itemData={{
            items: searchTracks,
          }}
        >
          {Row}
        </List>
      )}
    </InfiniteLoader>
  );
}
